import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, KeyboardEvent, Platform, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
	const insets = useSafeAreaInsets();
	const scrollViewRef = useRef<ScrollView>(null);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	const goBack = () => {
		router.back();
	};

	useEffect(() => {
		const keyboardDidShow = Keyboard.addListener(
			'keyboardDidShow',
			(e: KeyboardEvent) => {
				setIsKeyboardVisible(true);
				// Scroll to show the input above the keyboard
				scrollViewRef.current?.scrollTo({
					y: 200,
					animated: true
				});
			}
		);

		const keyboardDidHide = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setIsKeyboardVisible(false);
				// Return to top when keyboard closes
				scrollViewRef.current?.scrollTo({
					y: 0,
					animated: true
				});
			}
		);

		return () => {
			keyboardDidShow.remove();
			keyboardDidHide.remove();
		};
	}, []);

	const content = (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} >
			<View style={{ flex: 1 }}>
				<ScrollView style={styles.container}
					ref={scrollViewRef}
					contentContainerStyle={{
						minHeight: isKeyboardVisible ? '120%' : '100%',
						flexDirection: 'column',
						paddingBottom: isKeyboardVisible ? 100 : insets.bottom + 20
					}}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					bounces={false}
				>

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
	);
	if (Platform.OS === 'ios') {
		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
			>
				{content}
			</KeyboardAvoidingView>
		);
	}
	return content;

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(252, 182, 223, 0.9)',
		paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight - 10 : 0,
		overflow: 'visible'
	},
	imageSection: {
		flex: 2,
		minHeight: 250,
		position: 'relative',
		top: 10,
		overflow: 'visible'
	},
	bodySection: {
		flex: 1,
		minHeight: 400,
		paddingBottom: 20,
		backgroundColor: '#fff',
		// borderTopRightRadius: 20,
		// borderTopLeftRadius: 20,
		borderRadius: 20,
		elevation: 2,
		overflow: 'visible'
	},
	image: {
		flex: 1, borderRadius: 8
	},

});