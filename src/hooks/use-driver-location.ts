// hooks/useDriverLocation.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { db } from '../config/firebaseConfig';
import { BACKGROUND_LOCATION_TASK, DRIVER_ID_KEY } from '../services/backgroundLocationTask';

interface Coords {
	latitude: number;
	longitude: number;
}

export function useDriverLocation(driverId: string, isActive: boolean) {
	const [location, setLocation] = useState<Coords | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [backgroundPermissionGranted, setBackgroundPermissionGranted] = useState(false);
	const foregroundSubscriptionRef = useRef<Location.LocationSubscription | null>(null);

	const stopBackgroundTask = useCallback(async () => {
		try {
			const isTaskRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
			if (isTaskRegistered) {
				await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
			}
		} catch (err) {
			// Silently ignore - task might not exist in Expo Go or if background permission wasn't granted
			console.log('Background task stop skipped (task may not be running)');
		} finally {
			return;
		}
	}, []);

	const endShift = useCallback(async () => {
		try {
			if (foregroundSubscriptionRef.current) {
				foregroundSubscriptionRef.current.remove();
				foregroundSubscriptionRef.current = null;
			}
			const driverRef = doc(db, 'drivers', driverId);
			await setDoc(driverRef, {
				isActive: false,
				timestamp: serverTimestamp()
			}, { merge: true });

			// Stop background location tracking
			await stopBackgroundTask();

			await AsyncStorage.removeItem(DRIVER_ID_KEY);
		} catch (err) {
			console.error('Error ending shift:', err);
			setError(`Failed to end shift: ${err}`);
		}
	}, [driverId, stopBackgroundTask]);

	useEffect(() => {
		if (!isActive) {
			// If isActive becomes false, cleanup everything
			const cleanup = async () => {
				if (foregroundSubscriptionRef.current) {
					foregroundSubscriptionRef.current.remove();
					foregroundSubscriptionRef.current = null;
				}
				await stopBackgroundTask();
			};
			cleanup();
			return;
		}


		const startTracking = async () => {
			try {

				// Request foreground permissions
				const foregroundResult = await Location.requestForegroundPermissionsAsync();

				if (foregroundResult.status !== 'granted') {
					setError('Location permission is required to track your location. Please enable location access in your device settings.');
					return;
				}
				let hasBackgroundPermission = false;

				if (Platform.OS === 'android') {
					const backgroundResult = await Location.requestBackgroundPermissionsAsync();
					hasBackgroundPermission = backgroundResult.status === 'granted';
					setBackgroundPermissionGranted(hasBackgroundPermission);

					if (!hasBackgroundPermission) {
						console.warn('Background permission not granted');
						setError('Background location not enabled. The app will only track while open. For continuous tracking, go to Settings > Apps > Frost Find > Permissions > Location and select "Allow all the time".');

					}
				}

				//Store driverId for background task
				await AsyncStorage.setItem(DRIVER_ID_KEY, driverId);

				// Only start background task if we have permission
				if (hasBackgroundPermission) {

					if (Platform.OS === 'android') {
						const { status: notificationStatus } = await Notifications.requestPermissionsAsync();

						if (notificationStatus !== 'granted') {
							console.warn('Notification permission not granted - foreground service notification may not appear');
						}
					}

					try {
						await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
							accuracy: Location.Accuracy.High,
							timeInterval: 5000,
							distanceInterval: 10,
							foregroundService: {
								notificationTitle: 'Frost Find Active',
								notificationBody: 'Tracking your location for customers',
								notificationColor: 'rgba(252, 182, 223, 0.9)',
							},
							showsBackgroundLocationIndicator: true,
						});
					} catch (bgError) {
						console.error('Failed to start background tracking:', bgError);
						setError('Background tracking failed to start. Tracking will only work while app is open.');
					}
				} else {
					// console.log('Skipping background task - no permission');
				}

				// Always start foreground tracking
				foregroundSubscriptionRef.current = await Location.watchPositionAsync(
					{
						accuracy: Location.Accuracy.High,
						timeInterval: 5000,
						distanceInterval: 10,
					},
					async (newLocation) => {
						const coords = {
							latitude: newLocation.coords.latitude,
							longitude: newLocation.coords.longitude,
						};

						setLocation(coords);

						await setDoc(
							doc(db, 'drivers', driverId),
							{
								location: coords,
								isActive: true,
								timestamp: serverTimestamp(),
							},
							{ merge: true }
						);
					}
				);

				if (!hasBackgroundPermission) {
					//
				} else {
					setError(null)
				}

			} catch (err) {
				console.error('Error starting tracking:', err);
				setError(`Failed to start location tracking: ${err}`);
			}
		};


		startTracking();

		return () => {
			// Cleanup on unmount
			const cleanup = async () => {
				if (foregroundSubscriptionRef.current) {
					foregroundSubscriptionRef.current.remove();
					foregroundSubscriptionRef.current = null;
				}
				await stopBackgroundTask();
			};
			cleanup();
		};
	}, [driverId, isActive, stopBackgroundTask]);

	return { location, error, endShift, setError, backgroundPermissionGranted };
}