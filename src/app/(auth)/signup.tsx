import AuthenticationForm from "@/src/components/authenticationForm";
import ParallaxScrollView from "@/src/components/parallax-scroll-view";
import { ThemedText } from "@/src/components/themed-text";
import { ThemedView } from "@/src/components/themed-view";
import { useAuth } from "@/src/context/AuthContext";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from 'react-native-paper';

export default function SignUpScreen() {
	const { signUp, loading } = useAuth();
	const [isDriver, setIsDriver] = useState(false);

	const handleSignUp = async (email: string, password: string) => {
		await signUp(email, password, isDriver ? 'driver' : 'customer');
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/src/assets/images/android-icon-foreground.png')}
					style={styles.reactLogo}
				/>
			}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Map tracker app</ThemedText>
			</ThemedView>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="subtitle">Register</ThemedText>
			</ThemedView>
			<ThemedView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
				<ThemedText type="default" >Have an account already?</ThemedText>
				<ThemedText type="link" >
					<Link href="/(auth)/login" >Login</Link>
				</ThemedText>

			</ThemedView>
			<ThemedView>
				<AuthenticationForm onSubmit={handleSignUp} buttonTitle="Sign up" isLoading={loading} />
				<View style={{ flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
					<Text variant="bodyLarge">Sign up as driver?</Text>
					<Checkbox status={isDriver ? 'checked' : 'unchecked'} onPress={() => setIsDriver(prev => !prev)} />
				</View>

			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});