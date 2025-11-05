// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { useEffect, useRef, useState } from "react";
// import { Platform } from "react-native";

// Notifications.setNotificationHandler({
// 	handleNotification: async () => ({
// 		shouldShowBanner: true,
// 		shouldShowList: true,
// 		shouldPlaySound: true,
// 		shouldSetBadge: false
// 	}),
// });

// export function useNotifications() {
// 	const [expoPushToken, setExpoPushToken] = useState('');
// 	const [error, setError] = useState('');
// 	const notificationListener = useRef<Notifications.EventSubscription | null>(null);
// 	const responseListener = useRef<Notifications.EventSubscription | null>(null);

// 	useEffect(() => {
// 		registerPushNotificationsAsync().then(token => {
// 			console.log('Push token', token);
// 			setExpoPushToken(token);
// 		}).catch(err => setError(err.message));

// 		//Listen for nnotifications when app is in foreground
// 		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
// 			console.log('📬 Notification received:', notification);
// 		});

// 		//Listen for user tapping notification
// 		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
// 			console.log('👆 Notification tapped:', response);
// 		});

// 		return () => {
// 			if (notificationListener.current) {
// 				notificationListener.current.remove();
// 			}
// 			if (responseListener.current) {
// 				responseListener.current.remove();
// 			}
// 		};

// 	}, []);
// 	return { expoPushToken, error };
// }

// async function registerPushNotificationsAsync() {
// 	let token = '';

// 	if (Device.isDevice) {
// 		const { status: existingStatus } = await Notifications.getPermissionsAsync();
// 		let finalStatus = existingStatus;
// 		if (existingStatus !== 'granted') {
// 			const { status } = await Notifications.requestPermissionsAsync();
// 			finalStatus = status;
// 		}
// 		if (finalStatus !== 'granted') {
// 			throw new Error('Permission not granted for push notifications');
// 		}

// 		token = (await Notifications.getExpoPushTokenAsync()).data;
// 	} else {
// 		console.log('Must use physical device for Push Notifications');
// 	}

// 	if (Platform.OS === 'android') {
// 		Notifications.setNotificationChannelAsync('default', {
// 			name: 'default',
// 			importance: Notifications.AndroidImportance.MAX,
// 			vibrationPattern: [0, 250, 250, 250],
// 			lightColor: '#ff231f7c'
// 		});
// 	}
// 	return token;
// }