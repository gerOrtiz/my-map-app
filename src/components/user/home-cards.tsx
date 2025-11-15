import { useRouter } from "expo-router";
import { User } from "firebase/auth";
import { View } from "react-native";
import { Button, Card, Icon, Text } from "react-native-paper";
import Skeleton from "../ui/skeleton";

interface cardsInfoI {
	background: string;
	title: string;
	headline: string;
	subtitle: string;
	icon: string;
}

type CardProps = {
	user: User | null;
	role: 'customer' | 'driver' | null;
	cards: cardsInfoI[]

}
export default function HomeCards({ user, role, cards }: CardProps) {
	const router = useRouter();
	const goToMap = () => {
		if (role === 'customer') router.navigate('/(app)/maps');
		else router.navigate('/(app)/location');
	};

	if (!user || !role) return (
		<View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
			{cards.map((i, k) => (
				<Skeleton key={k} height={100} width="100%" borderRadius={30} />
			))}
		</View>
	);

	return (<>
		{cards.map((i, k) => (
			<Card key={k} mode="elevated" elevation={3} style={{ backgroundColor: i.background, minHeight: 100, borderRadius: 30 }}>
				<Card.Content>
					<View style={{ flexDirection: 'column', gap: 12, position: 'relative' }}>
						<View style={{ position: 'absolute', bottom: 0, right: 0 }}><Icon source={i.icon} size={60} color="rgba(133, 20, 123, 1)" /></View>
						<Text variant="titleMedium"
							style={{ color: 'rgba(31, 31, 31, 1)', textShadowColor: 'rgba(255, 15, 107, 0.7)', textShadowRadius: 1 }} >
							{i.title}
						</Text>
						<Text variant="headlineMedium"
							style={{
								color: 'rgba(0, 0, 0, 1)',
								textShadowColor: 'rgba(121, 121, 121, 0.5)',
								textShadowRadius: 1,
								textShadowOffset: { width: 1, height: 1 },
							}}>
							{i.headline}
						</Text>
						<Text variant="bodyLarge" style={{ color: 'black' }}>{i.subtitle}</Text>
						<Button mode="text" textColor="rgba(0, 2, 99, 1)" labelStyle={{ fontSize: 15, textDecorationLine: 'underline' }}
							style={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }} onPress={goToMap}
						>Go to map</Button>
					</View>
				</Card.Content>
			</Card>
		))}

	</>);
}