import { Colors } from '@/src/constants/theme';
import { useActiveDrivers } from '@/src/hooks/use-active-drivers';
import { Image } from 'expo-image';
import { StatusBar, StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Card, Text } from 'react-native-paper';

const colors = Colors.light;

export default function CustomerMapScreen() {
	const { drivers } = useActiveDrivers({ latitude: 19.024370626890853, longitude: -98.19173625706892 });
	//19.024370626890853, -98.19173625706892

	return (
		<View style={{ flex: 1, padding: 8, paddingTop: StatusBar.currentHeight, backgroundColor: colors.background }}>
			<Card style={{
				flex: 1, borderRadius: 15
			}} contentStyle={{ flex: 1, }} >
				<Card.Content style={{ flex: 1 }}>
					<Text variant="headlineSmall" style={styles.title}>Find nearest trucks</Text>
					<MapView
						style={{ flex: 1 }}
						initialRegion={{
							latitude: 19.0414,
							longitude: -98.2063,
							latitudeDelta: 0.1,
							longitudeDelta: 0.1,
						}}
					>
						{drivers.map(driver => (
							<Marker
								key={driver.id}
								coordinate={driver.location}
								title="Ice Cream Truck"
								description={`Distance: ${driver.distance} kms, ${driver.eta}`}
							>
								<Image source={require('@/src/assets/images/truck.png')} style={{ width: 32, height: 32 }} />
								{/* Image from FlatIcon https://www.flaticon.com/free-icons/delivery-truck */}
							</Marker>
						))}
						<Marker title="Default location" coordinate={{ latitude: 19.024370626890853, longitude: -98.19173625706892 }} />
					</MapView>
				</Card.Content>

			</Card>

		</View>
	);
}

/*export default function Maps() {
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	// const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const { userLocation, driverLocation, errorMsg } = useLocationTracking();

	const handleMarkerPress = () => {
		setModalVisible(true);
	};

	return (<>
		<View style={styles.container}>
			{!userLocation ? (<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
				<Text style={{ alignSelf: 'center' }}>
					{!userLocation && errorMsg ? errorMsg : 'Loading...'}
				</Text>
			</View>) : (<>
				<View style={{ width: '100%', height: '10%', justifyContent: 'center' }}>
					<Text style={{ alignSelf: 'center', fontSize: 16 }}>A map for your current location</Text>
				</View>
				<View style={{ width: '100%', height: '90%', justifyContent: 'center' }}>
					<MapView style={styles.map}
						initialRegion={{
							latitude: userLocation.coords.latitude,
							longitude: userLocation.coords.longitude,
							latitudeDelta: 0.03,
							longitudeDelta: 0.03
						}} >
						{userLocation && (
							<Marker coordinate={{
								latitude: userLocation.coords.latitude,
								longitude: userLocation.coords.longitude
							}}
								title='My location'
								description='This is your current location'
							// onPress={handleMarkerPress}
							/>
						)}

						{driverLocation && (
							<Marker coordinate={driverLocation.coords} title="Driver location" description="This is the drivers location" />
						)}
					</MapView>
				</View>

			</>)}
			<Modal transparent={true} visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Current location</Text>
						<Text style={styles.modalDesc}>This is your current location</Text>

						<TouchableOpacity
							style={[styles.button, { backgroundColor: "#ccc", marginTop: 10 }]}
							onPress={() => setModalVisible(false)}
						>
							<Text style={[styles.buttonText, { color: "#333" }]}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>

	</>);
}*/

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//marginTop: 20,
		paddingHorizontal: 10,
		paddingVertical: 20,
		backgroundColor: '#fff'
	},
	title: {
		textShadowColor: 'rgba(202, 202, 0, 0.6)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		textAlign: 'center',
		marginBottom: 10,
		fontFamily: 'Sweet-Affogato',
		color: colors.title
	},
	map: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		zIndex: 1
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		paddingHorizontal: 8
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		// borderTopRightRadius: 20,
		// borderTopLeftRadius: 20,
		borderRadius: 20,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalDesc: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
	},
	button: {
		backgroundColor: "#1e90ff",
		padding: 12,
		borderRadius: 10,
		width: "80%",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});