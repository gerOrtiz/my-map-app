import AuthenticationForm from "@/src/components/authenticationForm";
import OnboardingView from "@/src/components/onboarding-view";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function LoginScreen() {
	const router = useRouter();
	const { loading, signIn } = useAuth();
	const colors = Colors.light;

	const handleSignIn = async (email: string, password: string) => {
		await signIn(email, password);
	};

	const goTo = () => {
		router.replace('/signup');
	};

	return (
		<OnboardingView image="image3" showNavigation={true}>
			<View style={styles.container}>
				<View style={styles.loginForm}>
					<Text variant="titleLarge" style={{ color: colors.title, textAlign: 'center', fontFamily: 'Sweet-Affogato' }}>Login</Text>
					<AuthenticationForm onSubmit={handleSignIn} buttonTitle="Login" isLoading={loading} />
				</View>

				<View style={{ flex: 1, flexDirection: 'row', gap: 5, justifyContent: 'center' }} >
					<Text variant="labelLarge">Don't have an account?</Text>
					<Text variant="labelLarge" style={{ color: colors.title }} onPress={goTo}>Signup</Text>
				</View>
			</View>
		</OnboardingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'column', padding: 18
	}, loginForm: {
		flex: 3, flexDirection: 'column'
	}
});