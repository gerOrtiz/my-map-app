import { useAuth } from "@/src/context/AuthContext";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function LoginScreen() {
	const { user, loading, signIn } = useAuth();


	const handleSignIn = async (email: string, password: string) => {
		await signIn(email, password);

	};

	return (
		<View style={styles.container}>
			<View style={{ flex: 2 }}>
				<Image source={require('@/src/assets/images/icecream-truck2.jpg')} style={styles.image} />
				<LinearGradient colors={['transparent', 'rgba(255,255,255,0.9)']} />
			</View>
			<View style={styles.textSection}>
				<Text variant="headlineMedium" style={{ color: 'blue', textAlign: 'center' }} >Find Ice Cream Trucks Near You</Text>
				<Text variant="titleLarge" style={{ color: 'pink', textAlign: 'center' }}>Track real-time locations and never miss your favorite treat</Text>
			</View>
			<View style={styles.buttonSection}>
				<View style={{ height: '100%', justifyContent: 'center' }}><Button mode="elevated" buttonColor="#FF69B4" textColor="white" >Login</Button></View>
				<View style={{ height: '100%', justifyContent: 'center' }}><Button mode="elevated" buttonColor="#FFB6C1" >Register</Button></View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingVertical: 20,
		paddingHorizontal: 12,
	},
	imageSection: {
		flex: 1
	},
	image: {
		width: '100%', height: '100%', borderRadius: 8
	},
	textSection: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 8,
	},
	buttonSection: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignContent: 'center',
	}
});