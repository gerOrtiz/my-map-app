import OnboardingView from "@/src/components/onboarding-view";
import { Colors } from "@/src/constants/theme";
import { Link, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function IndexScreen() {
	const router = useRouter();
	const colors = Colors.light;

	const goTo = (route: 'login' | 'signup') => {
		router.navigate(`/${route}`);
	};

	return (
		// <View style={styles.container}>
		// 	<View style={styles.imageSection}>
		// 		<Image source={require('@/src/assets/images/icecream-truck2.jpg')} style={styles.image} />
		// 		<LinearGradient colors={['transparent', 'rgba(255,255,255,0.9)']} />
		// 	</View>
		// 	<View style={styles.bodySection}>
		// 		
		// 	</View>
		// </View>
		<OnboardingView image="image2">
			<View style={{ flex: 1, flexDirection: 'column', paddingVertical: 8 }}>
				<View style={styles.textSection}>
					<Text variant="headlineLarge" style={[styles.title, { color: colors.title }]}>Frost Find</Text>
					<Text variant="headlineSmall" style={[styles.subtitle, { color: colors.text, fontFamily: 'Sweet-Affogato' }]} >Find Ice Cream Trucks Near You</Text>
					<Text variant="titleMedium" style={{ color: colors.subtitle, textAlign: 'center' }}>Track real-time locations and never miss your favorite treat</Text>
				</View>
				<View style={styles.buttonSection}>
					<View style={{ height: '100%', justifyContent: 'center' }}>
						<Button mode="elevated" buttonColor={colors.buttonPrimary} textColor="white" ><Link href="/(auth)/login" prefetch>Login</Link></Button>
					</View>
					<View style={{ height: '100%', justifyContent: 'center' }}>
						<Button mode="elevated" buttonColor={colors.buttonSecondary} onPress={() => goTo('signup')}>Register</Button></View>
				</View>
			</View>
		</OnboardingView>
	);
}

const styles = StyleSheet.create({
	title: {
		textShadowColor: 'rgba(202, 202, 0, 0.6)', // Black with 75% opacity
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		textAlign: 'center',
		marginBottom: 1,
		fontFamily: 'Sweet-Affogato'
	},
	subtitle: {
		textDecorationLine: 'none',
		textDecorationStyle: 'solid',
		textDecorationColor: 'pink',
		textAlign: 'center'
	},
	textSection: {
		height: '80%',
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 8,
		paddingHorizontal: 12
	},
	buttonSection: {
		height: '20%',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignContent: 'center',
		alignItems: 'flex-start'
	}
});