import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from "react";

export function useLocation() {
	// const [driverLocation, setDriversLocation] = useState<Location.LocationObject | null>(null);
	const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const getUserLocation = useCallback(async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location denied');
			return { coords: { latitude: 0, longitude: 0 }, timestamp: new Date().getTime() } as Location.LocationObject;
		}
		let currentLocation = await Location.getCurrentPositionAsync({});
		return currentLocation;
	}, []);

	useEffect(() => {
		getUserLocation().then(setUserLocation)
	}, []);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setDriversLocation(prev => (prev ? {
	// 			...prev,
	// 			coords: { ...prev.coords, longitude: prev.coords.longitude + Math.random() * 0.0002 - 0.0001, latitude: prev.coords.latitude + Math.random() * 0.0002 - 0.0001 }
	// 		}
	// 			: userLocation));
	// 	}, 3000);
	// 	return () => clearInterval(interval);
	// }, [userLocation]);


	return { userLocation, errorMsg };

}