import { Image } from 'expo-image';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import { useAuth } from '@/src/context/AuthContext';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
	const { logOut, user, loading } = useAuth();

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1 }}>
				{loading && (<Text>Loading...</Text>)}
				<View style={styles.avatarSection}>
					<Image source={require('@/src/assets/images/avatar.jpg')} contentPosition="center" contentFit="cover" style={{ borderRadius: 50, width: 50, height: 50 }} />
					<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
						<Text style={styles.avatarText} variant="titleMedium">Welcome,</Text>
						<Text style={styles.avatarText} variant="titleSmall">{user?.email}</Text>
					</View>


				</View>
				<View style={{ flex: 5 }}>
					<Text>Banners / cards</Text>
					<Text>Call to action</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, paddingTop: StatusBar.currentHeight
	}, scroll: {
		flex: 1, padding: 12, overflow: 'visible'
	}, avatarSection: {
		minHeight: 80, width: '100%', flexDirection: 'row', alignItems: 'center',
		marginBottom: 20
	},
	avatarText: {
		textAlign: 'center',
	}
});
