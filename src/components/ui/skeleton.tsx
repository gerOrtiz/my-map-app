import React, { useEffect, useRef } from 'react';
import { Animated, DimensionValue, StyleSheet, View } from "react-native";


interface SkeletonPropsI {
	width: DimensionValue;
	height: DimensionValue;
	borderRadius?: number;
}


export default function Skeleton({ width, height, borderRadius = 0 }: SkeletonPropsI) {
	// const animatedValue = useSharedValue(0);
	const fadeAnim = useRef(new Animated.Value(0.4)).current;

	useEffect(() => {
		// animatedValue.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.linear }), -1, false);
		Animated.loop(
			Animated.sequence([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true
				}),
				Animated.timing(fadeAnim, {
					toValue: 0.4,
					duration: 800,
					useNativeDriver: true
				}),
			])
		).start();
	}, []);

	// const animatedGradientStyle = useAnimatedStyle(() => {
	// 	const translateX = interpolate(animatedValue.value, [0, 1], [0, 100]);
	// 	return {
	// 		transform: [{ translateX }]
	// 	};
	// });

	return (
		// <View style={[styles.skeleton, { width, height, borderRadius }]} >
		// 	<Animated.View style={[StyleSheet.absoluteFill, animatedGradientStyle]}>
		// 		<LinearGradient
		// 			colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
		// 			start={{ x: 0, y: 0.5 }}
		// 			end={{ x: 1, y: 0.5 }}
		// 			style={StyleSheet.absoluteFill}
		// 		/>
		// 	</Animated.View>
		// </View>
		<View style={[styles.skeleton, { width, height, }]}>
			<Animated.View style={[styles.box, { opacity: fadeAnim, borderRadius: borderRadius }]} />
		</View>
	);
}

const styles = StyleSheet.create({
	skeleton: {
		//backgroundColor: '#e0e0e0',
		padding: 10,
		marginBottom: 8,
		overflow: 'hidden'
	}, box: {
		width: '100%',
		height: '100%',
		backgroundColor: '#e0e0e0'
	}
});