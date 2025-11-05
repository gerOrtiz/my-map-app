import { useAuth } from "@/src/context/AuthContext";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function LoginScreen() {
	const { user, loading, signIn } = useAuth();


	const handleSignIn = async (email: string, password: string) => {
		await signIn(email, password);

	};

	// return (
	// 	<ParallaxScrollView
	// 		headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
	// 		headerImage={
	// 			<Image
	// 				source={require('@/src/assets/images/android-icon-foreground.png')}
	// 				style={styles.reactLogo}
	// 			/>
	// 		}>
	// 		<ThemedView style={styles.titleContainer}>
	// 			<ThemedText type="title">Map tracker app</ThemedText>
	// 		</ThemedView>
	// 		<ThemedView style={styles.titleContainer}>
	// 			<ThemedText type="subtitle">Login</ThemedText>
	// 		</ThemedView>
	// 		<ThemedView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
	// 			<ThemedText type="default" >Don't have an account?</ThemedText>
	// 			<ThemedText type="link" >
	// 				<Link href="/(auth)/signup" >Sign up</Link>
	// 			</ThemedText>

	// 		</ThemedView>
	// 		<ThemedView >
	// 			<AuthenticationForm onSubmit={handleSignIn} buttonTitle="Log in" isLoading={loading} />
	// 		</ThemedView>
	// 	</ParallaxScrollView>
	// );
	return (
		<View style={{ flex: 1, flexDirection: 'column' }}>
			<View style={{ flex: 1 }}>
				<Image source={require('@/src/assets/images/icecream-truck2.jpg')} style={{ width: '100%', height: '100%' }} />
			</View>
			<View style={{ flex: 2, flexDirection: 'column' }}>
				<View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
					<Text variant="headlineMedium">Find the nearest ice cream truck to you</Text>
					<Text variant="titleLarge">Explore the map to find the nearest truck based on your location</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', gap: 4, }}>
					<View style={{ height: '100%', justifyContent: 'center' }}><Button mode="elevated" buttonColor="blue" textColor="white" >Login</Button></View>
					<View style={{ height: '100%', justifyContent: 'center' }}><Button mode="elevated" >Register</Button></View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	reactLogo: {
		height: 178,
		width: 290,
		alignSelf: 'center',
		justifyContent: 'flex-end',
		// bottom: 0,
		// left: 0,
		// right: 0,
		// position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	button: {
		borderRadius: 18,
		padding: 10,
		marginTop: 15,
		width: '100%',
		alignItems: 'center',
		alignSelf: 'center',
		elevation: 2,
		shadowColor: 'rgba(0, 0, 0, 1)',
		shadowOffset: { width: 5, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 3.5,
	}, buttonText: {
		color: '#fff',
		fontSize: 14
	}
});