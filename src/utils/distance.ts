export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	// Haversine formula for distance between two coordinates
	const R = 6371; // Earth's radius in km
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;

	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = (R * c) * 1.4; //Add urban distance (estimate)
	const distanceStrirg = distance.toFixed(2);
	return parseFloat(distanceStrirg);
}

export function estimateArrivalTime(distanceKm: number): string {
	const avgSpeedKmh = 30;
	const timeHours = distanceKm / avgSpeedKmh;
	const timeMinutes = Math.round(timeHours * 60);
	if (timeMinutes < 1) return 'Less than 1 min';
	if (timeMinutes === 1) return '1 min';
	return `${timeMinutes} minutes`;
}