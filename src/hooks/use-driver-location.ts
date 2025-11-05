// hooks/useDriverLocation.ts
import * as Location from 'expo-location';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';

interface Coords {
	latitude: number;
	longitude: number;
}

export function useDriverLocation(driverId: string, isActive: boolean) {
	const [location, setLocation] = useState<Coords | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isActive) return; // Only track when driver is active

		let locationSubscription: Location.LocationSubscription;

		const startTracking = async () => {
			// Request permissions
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setError('Location permission denied');
				return;
			}

			// Watch location and update Firestore
			locationSubscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 5000, // Update every 5 seconds
					distanceInterval: 10, // Or when moved 10 meters
				},
				async (newLocation) => {
					const coords = {
						latitude: newLocation.coords.latitude,
						longitude: newLocation.coords.longitude,
					};

					setLocation(coords);

					// Update Firestore
					await setDoc(doc(db, 'drivers', driverId), {
						location: coords,
						isActive: true,
						timestamp: serverTimestamp(),
					}, { merge: true });
				}
			);
		};

		startTracking();

		return () => {
			if (locationSubscription) {
				locationSubscription.remove();
			}
		};
	}, [driverId, isActive]);

	return { location, error };
}