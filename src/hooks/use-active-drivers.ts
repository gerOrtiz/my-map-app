import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { calculateDistance, estimateArrivalTime } from "../utils/distance";
import { useLocation } from "./use-location";

interface DriversI {
	id: string;
	location: Coords;
	isActive: boolean;
	timestamp: Timestamp;
	distance?: number;
	eta?: string;
}

type Coords = {
	latitude: number; longitude: number;
}


export function useActiveDrivers(refresh: boolean) {
	const { userLocation, errorMsg } = useLocation(refresh);
	const [drivers, setDrivers] = useState<DriversI[]>([]);
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		if (errorMsg || !userLocation) return;
		const customerLocation = userLocation.coords;
		setLoading(true);
		const q = query(
			collection(db, 'drivers'),
			where('isActive', '==', true)
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const activeDrivers = snapshot.docs.map(doc => {
				const driverData = doc.data();
				const distance = customerLocation ?
					calculateDistance(customerLocation.latitude, customerLocation.longitude, driverData.location.latitude, driverData.location.longitude) :
					null;
				return { id: doc.id, ...driverData, distance, eta: distance ? estimateArrivalTime(distance) : undefined };
			});
			activeDrivers.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
			setDrivers(activeDrivers as DriversI[]);
			setLoading(false);
		});
		return () => unsubscribe();
	}, [errorMsg, userLocation]);

	return { drivers, loading, errorMsg, userLocation };
}