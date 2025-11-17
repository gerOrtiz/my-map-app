import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/src/components/haptic-tab';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { userRole, loading } = useAuth();

	const options: BottomTabNavigationOptions = {
		tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
		tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].inactiveTint,
		headerShown: false,
		tabBarStyle: {
			marginBottom: 12,
			width: '50%',
			position: 'absolute',
			transform: [{ translateX: 90 }],
			elevation: 0,
			borderColor: 'rgba(255, 200, 250, 0.75)',
			borderWidth: 1,
			backgroundColor: 'rgba(255, 255, 255, 0.51)',
			borderRadius: 15,
			shadowColor: 'rgba(0, 0, 0, 1)',
			shadowOffset: { width: 5, height: 10 },
			shadowOpacity: 0.3,
			shadowRadius: 3.5,
		},
		tabBarLabelStyle: {
			fontSize: 10,
			fontWeight: 100,
			lineHeight: 8
		},
		tabBarButton: HapticTab,
		headerTintColor: '#141414ff',
		headerStyle: {
			backgroundColor: '#fff',
		},
		headerShadowVisible: false,
	};

	if (loading) return (<>
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
			<ActivityIndicator size="large" color="red" />
		</View>
	</>);

	if (userRole === 'customer') {
		return (
			<Tabs
				screenOptions={options}>
				<Tabs.Screen
					name="index"
					options={{
						title: 'Home',
						tabBarIcon: ({ color }) => <IconSymbol size={25} name="house.fill" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="maps"
					options={{
						title: 'Maps',
						tabBarIcon: ({ color }) => <Ionicons size={25} name="map" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="location"
					options={{
						title: 'Location',
						href: null
					}}
				/>
			</Tabs>
		);
	}
	return (
		<Tabs
			screenOptions={options}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => <IconSymbol size={25} name="house.fill" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="location"
				options={{
					title: 'Location',
					tabBarIcon: ({ color }) => <Ionicons size={25} name="pin" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="maps"
				options={{
					title: 'Maps',
					href: null
				}}
			/>
		</Tabs>
	);

}
