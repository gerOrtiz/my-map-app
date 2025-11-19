import { ImageBackground } from 'expo-image';
import { Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import HomeCards from '@/src/components/user/home-cards';
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useMemo } from 'react';
import { Icon, IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const colors = Colors.light;
export default function HomeScreen() {
	const { logOut, user, userRole, loading } = useAuth();
	const insets = useSafeAreaInsets();

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};


	const userCards = useMemo(() => {
		return [{ background: '#a0d8bd', title: 'Requests', headline: '5 request', subtitle: 'Keep it that way to earn points!', icon: 'ice-cream' },
		{ background: '#facaac', title: 'Total items bought', headline: '6', subtitle: '4 items left to gain one free popsicle', icon: 'ice-pop' }];
	}, []);

	const driverCards = useMemo(() => {
		return [{ background: '#75b8e6', title: 'Trips', headline: '10 trips', subtitle: 'In the last 10 days', icon: 'map-marker-distance' },
		{ background: '#b97ca0', title: 'Activity', headline: '11/11/25', subtitle: 'Last shift', icon: 'truck-outline' }];
	}, []);

	return (
		<View style={[styles.container, { paddingBottom: insets.bottom }]}>
			<ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1 }}>
				{loading && (<Text>Loading...</Text>)}
				<View>
					<Text variant="headlineSmall" style={[styles.title]}>Frost find</Text>
				</View>
				<View style={styles.avatarSection}>
					<View style={{ borderRadius: 50, minHeight: 50, padding: 0, backgroundColor: 'rgba(230, 230, 230, 0.8)' }}>
						<ImageBackground source={require('@/src/assets/images/avatar1.png')}
							contentPosition="center" contentFit="cover"
							style={styles.avatarImage} >
							<IconButton mode="contained-tonal" icon="pencil" size={12} contentStyle={{ padding: 1 }} style={styles.editButton} />
						</ImageBackground>
					</View>
					<View style={{ flex: 1, flexDirection: 'column' }}>
						<Text style={styles.avatarText} variant="titleLarge">Welcome,</Text>
						<Text style={styles.avatarText} variant="titleMedium">{user?.email}</Text>
					</View>

				</View>
				<View style={styles.userActionsSection}>
					<Pressable style={styles.userButtons} onPress={handleSignOut}>
						<Icon size={25} source="logout" color="black" />
					</Pressable>
					<Pressable style={styles.userButtons}>
						<Icon size={25} source="cog" color="black" />
					</Pressable>
				</View>
				<View style={{ flexDirection: 'column', gap: 15 }}>
					{userRole === 'customer' ? (<HomeCards user={user} role={userRole} cards={userCards} />) : (<>
						<HomeCards user={user} role={userRole} cards={driverCards} />
					</>)}

				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: colors.background
	}, scroll: {
		flex: 1, padding: 12, overflow: 'visible'
	},
	title: {
		textShadowColor: 'rgba(202, 202, 0, 0.6)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		textAlign: 'center',
		marginBottom: 1,
		fontFamily: 'Sweet-Affogato',
		color: colors.title
	},
	avatarSection: {
		minHeight: 80, width: '100%', flexDirection: 'row', alignItems: 'center',
		marginBottom: 0
	},
	avatarImage: {
		borderRadius: 50, width: 60, height: 60
	},
	editButton: {
		position: 'absolute', bottom: -10, right: -10, margin: 0
	},
	avatarText: {
		textAlign: 'center',
	},
	userActionsSection: {
		flexDirection: 'row', padding: 8, alignSelf: 'center', justifyContent: 'center', marginBottom: 20, gap: 15
	}, userButtons: {
		width: 50, height: 50, padding: 5, borderRadius: 50, backgroundColor: colors.buttonSecondary, alignItems: 'center', justifyContent: 'center'
	},
});
