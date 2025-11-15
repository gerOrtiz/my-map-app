import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { PropsWithChildren } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { IconButton } from "react-native-paper";

type OnboardingViewI = PropsWithChildren<{
	image: 'image1' | 'image2' | 'image3',
	showNavigation?: boolean
}>;

const localImages = {
	image1: require('@/src/assets/images/icecream-truck1.png'),
	image2: require('@/src/assets/images/icecream-truck2.jpg'),
	image3: require('@/src/assets/images/icecream-truck3.jpg'),
};

export default function OnboardingView({ image, showNavigation, children }: OnboardingViewI) {
	const router = useRouter();


	const goBack = () => {
		router.back();
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.imageSection}>
							<ImageBackground source={localImages[image]} style={styles.image} contentFit="cover" priority="high">
								{showNavigation && (
									<IconButton mode="contained-tonal" icon="arrow-left" size={18} onPress={goBack} />
								)}
								{/* <Button icon="arrow-left" mode="text" textColor="#7e0069ff" style={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }}><Text variant="labelSmall">Go back</Text></Button> */}
							</ImageBackground>
							<LinearGradient colors={['transparent', 'rgba(255,255,255,0.9)']} />
						</View>
						<View style={styles.bodySection}>
							{children}
						</View>
					</ScrollView>
				</View>

			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(252, 182, 223, 0.9)',
		paddingTop: StatusBar.currentHeight,
	},
	imageSection: {
		flex: 2,
		position: 'relative',
		top: 10,
		overflow: 'visible'
	},
	bodySection: {
		flex: 1,
		backgroundColor: '#fff',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		overflow: 'visible'
	},
	image: {
		flex: 1, borderRadius: 8
	},

});