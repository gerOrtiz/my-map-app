import Skeleton from "@/src/components/ui/skeleton";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useDriverLocation } from "@/src/hooks/use-driver-location";
import { useRouter } from "expo-router";

import { useCallback, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button, IconButton, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const colors = Colors.light;

export default function DriverLocationScreen() {
	const { user } = useAuth();
	if (!user) return <LoadingScreen />
	const [isActive, setIsActive] = useState(user.isActive || false);
	const { location, endShift, error, setError } = useDriverLocation(user.uid, isActive);
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const handleShiftChange = useCallback(() => {
		if (isActive) endShift();
		setIsActive(prev => !prev);
	}, []);

	const handleReturn = useCallback(() => {
		router.back();
	}, []);

	const handleAskLocationPermissionAgain = () => {
		setError('');
		if (isActive) setIsActive(false);
	};

	const hasCriticalError = error && error.includes('Location permission is required');
	const hasBackgroundWarning = error && error.includes('Background location not enabled');

	return (
		<View style={[styles.container, { justifyContent: 'center', paddingBottom: insets.bottom }]}>

			<View style={[styles.card, !isActive ? { minHeight: 250, } : { flex: 1, position: 'relative' }]}>
				{isActive && (
					<View style={{ position: 'absolute', top: 5, left: 1, zIndex: 15 }}>
						<IconButton size={18} icon="arrow-left" mode="contained-tonal" onPress={handleReturn} />
					</View>
				)}
				<View style={{ flex: 1, flexDirection: 'column', padding: 4, gap: 5, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
					<Text variant="headlineSmall" style={styles.title} >Ice cream delivery</Text>
					{!isActive && (<Text variant="bodyLarge" style={[styles.fonts]}>To start your shift press the button</Text>)}
					{/* <Pressable style={styles.outlineButton} onPress={() => setIsActive(prev => !prev)}>
						<Text style={{ fontSize: 14, color: 'rgba(5, 2, 204, 1)' }}>{isActive ? 'End shift' : 'Start shift'}</Text>
					</Pressable> */}
					{!hasCriticalError && (
						<Button mode="outlined"
							textColor={colors.buttonPrimary}
							style={{ borderColor: colors.buttonPrimary }}
							onPress={handleShiftChange}>
							{isActive ? 'End shift' : 'Start shift'}
						</Button>
					)}
					{/* Show background warning if active and tracking works but no background permission */}


				</View>
				{isActive && hasBackgroundWarning && location && (
					<View style={{ padding: 12, marginTop: 8, maxHeight: 150 }}>
						<View style={{ backgroundColor: '#FFF3CD', padding: 8, borderRadius: 8 }}>
							<Text variant="bodySmall" style={{ color: '#856404', textAlign: 'center' }}>
								⚠️ Background tracking disabled. Location will only update while app is open.
							</Text>
						</View>

					</View>
				)}
				{location && isActive && (
					<View style={{ flex: 10, padding: 12 }}>
						<MapView style={styles.map} region={{
							latitude: location.latitude,
							longitude: location.longitude,
							latitudeDelta: 0.03,
							longitudeDelta: 0.03
						}}>
							<Marker coordinate={location} title="Current location" />
						</MapView>

					</View>)}
				{/* Loading state */}
				{isActive && !location && !hasCriticalError && (
					<View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
						<Skeleton width="100%" height="100%" />
					</View>
				)}
				{/* Critical error view (no location permission at all) */}
				{isActive && hasCriticalError && (
					<View style={{ flex: 10, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
						{/* <Text variant="titleLarge" style={{ color: 'red', textAlign: 'center' }}>Error: You must grant location permissions to get the map view</Text> */}
						<Text variant="titleLarge" style={{ color: 'red', textAlign: 'center' }}>
							{error}
						</Text>

						<Button
							mode="contained"
							style={{ justifyContent: 'center', alignSelf: 'center' }}
							buttonColor={colors.buttonPrimary
							} onPress={handleAskLocationPermissionAgain} >
							<Text variant="titleMedium" style={{ color: 'white' }}>Try again</Text>
						</Button>
					</View>
				)}
			</View>


		</View>


	);
}

const LoadingScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Skeleton height="100%" width="100%" borderRadius={15} /></View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 8, backgroundColor: colors.background, paddingTop: StatusBar.currentHeight },
	card: {
		flexDirection: 'column', backgroundColor: '#fff', padding: 5, marginVertical: 5, borderRadius: 20, elevation: 2, gap: 5
	},
	title: {
		textShadowColor: 'rgba(202, 202, 0, 0.6)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		textAlign: 'center',
		marginBottom: 10,
		fontFamily: 'Sweet-Affogato',
		color: colors.title,
		paddingTop: 5
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