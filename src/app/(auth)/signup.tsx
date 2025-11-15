import AuthenticationForm from "@/src/components/authenticationForm";
import OnboardingView from "@/src/components/onboarding-view";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from 'react-native-paper';

export default function SignUpScreen() {
	const { signUp, loading } = useAuth();
	const [isDriver, setIsDriver] = useState(false);
	const colors = Colors.light;
	const router = useRouter();

	const handleSignUp = async (email: string, password: string) => {
		await signUp(email, password, isDriver ? 'driver' : 'customer');
	};

	const goTo = () => {
		router.replace('/login');
	};
	return (
		// <ParallaxScrollView
		// 	headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
		// 	headerImage={
		// 		<Image
		// 			source={require('@/src/assets/images/android-icon-foreground.png')}
		// 			style={styles.reactLogo}
		// 		/>
		// 	}>
		// 	<ThemedView style={styles.titleContainer}>
		// 		<ThemedText type="title">Map tracker app</ThemedText>
		// 	</ThemedView>
		// 	<ThemedView style={styles.titleContainer}>
		// 		<ThemedText type="subtitle">Register</ThemedText>
		// 	</ThemedView>
		// 	<ThemedView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
		// 		<ThemedText type="default" >Have an account already?</ThemedText>
		// 		<ThemedText type="link" >
		// 			<Link href="/(auth)/login" >Login</Link>
		// 		</ThemedText>

		// 	</ThemedView>
		// 	<ThemedView>
		// 		<AuthenticationForm onSubmit={handleSignUp} buttonTitle="Sign up" isLoading={loading} />
		// 		<View style={{ flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
		// 			<Text variant="bodyLarge">Sign up as driver?</Text>
		// 			<Checkbox status={isDriver ? 'checked' : 'unchecked'} onPress={() => setIsDriver(prev => !prev)} />
		// 		</View>

		// 	</ThemedView>
		// </ParallaxScrollView>
		<OnboardingView image="image1" showNavigation={true}>
			<View style={styles.container}>
				<View style={styles.form}>
					<View >
						<Text variant="titleLarge" style={{ color: colors.title, textAlign: 'center', fontFamily: 'Sweet-Affogat' }}>Register</Text>
						<AuthenticationForm onSubmit={handleSignUp} buttonTitle="Sign up" isLoading={loading} />
					</View>
					<View style={styles.check}>
						<Text variant="bodyLarge" style={{ textAlign: 'center', color: colors.subtitle }}>Sign up as driver?</Text>
						<Checkbox color={colors.buttonPrimary} status={isDriver ? 'checked' : 'unchecked'} onPress={() => setIsDriver(prev => !prev)} />
					</View>
				</View>

				<View style={{ flex: 1, flexDirection: 'row', gap: 5, justifyContent: 'center' }} >
					<Text variant="labelLarge">Have an account already?</Text>
					<Text variant="labelLarge" style={{ color: colors.title }} onPress={goTo}>Login</Text>
				</View>
			</View>
		</OnboardingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'column', padding: 18
	}, form: {
		flex: 3, flexDirection: 'column', gap: 0
	}, check: {
		flex: 1,
		flexDirection: 'row', alignSelf: 'center', alignContent: 'center', alignItems: 'center'
	}
});