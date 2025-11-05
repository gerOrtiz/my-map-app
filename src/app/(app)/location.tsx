import Skeleton from "@/src/components/ui/skeleton";
import { useAuth } from "@/src/context/AuthContext";
import { useDriverLocation } from "@/src/hooks/use-driver-location";

import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function DriverLocationScreen() {
	const { user } = useAuth();
	if (!user) return <LoadingScreen />
	const [isActive, setIsActive] = useState(false);
	const { location } = useDriverLocation(user.uid, isActive);

	return (
		<View style={styles.container}>
			<View style={styles.card}>

				<View style={{ flex: 1, flexDirection: 'column', padding: 3, gap: 5, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
					<Text >Location</Text>
					{!isActive && (<Text style={[styles.fonts, { fontSize: 13 }]}>To start your shift press the button</Text>)}
					<Pressable style={styles.outlineButton} onPress={() => setIsActive(prev => !prev)}>
						<Text style={{ fontSize: 14, color: 'rgba(5, 2, 204, 1)' }}>{isActive ? 'End shift' : 'Start shift'}</Text>
					</Pressable>
				</View>
				{location && isActive && (<View style={{ flex: 10, padding: 12 }}>
					<MapView style={styles.map} region={{
						latitude: location.latitude,
						longitude: location.longitude,
						latitudeDelta: 0.03,
						longitudeDelta: 0.03
					}}>
						<Marker coordinate={location} title="Current location" />
					</MapView>

				</View>)}
				<View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}><Skeleton width="100%" height="100%" /></View>
				{isActive && !location && (
					<View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}><Skeleton width="100%" height="100%" /></View>
				)}
			</View>

		</View>

	);
}

const LoadingScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="blue" /></View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 8 },
	card: {
		flex: 1, flexDirection: 'column', backgroundColor: '#fff', padding: 5, marginVertical: 5, borderRadius: 20, elevation: 2,
	},
	fonts: { marginBottom: 8 },
	outlineButton: {
		borderWidth: 1, borderColor: 'rgba(0, 102, 255, 1)', borderRadius: 10, padding: 8, backgroundColor: '#fff', elevation: 1
	},
	map: {
		height: '100%',
		width: '100%',
		zIndex: 1,
		backgroundColor: '#fff'
	}
});