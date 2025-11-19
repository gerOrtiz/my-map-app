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
		<OnboardingView image="image1" showNavigation={true}>
			<View style={styles.container}>
				<View style={styles.form}>
					<Text variant="titleLarge" style={{ color: colors.title, textAlign: 'center', fontFamily: 'Sweet-Affogato' }}>Register</Text>
					<AuthenticationForm onSubmit={handleSignUp} buttonTitle="Sign up" isLoading={loading} />
				</View>
				<View style={styles.check}>
					<Text variant="bodyLarge" style={{ textAlign: 'center', color: colors.title }}>Sign up as driver?</Text>
					<Checkbox color={colors.buttonPrimary} status={isDriver ? 'checked' : 'unchecked'} onPress={() => setIsDriver(prev => !prev)} />
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