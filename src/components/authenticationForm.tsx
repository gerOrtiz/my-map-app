import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
	onSubmit: (email: string, password: string) => Promise<void>;
	buttonTitle: string;
	isLoading?: boolean;
}

export default function AuthenticationForm({ onSubmit, buttonTitle, isLoading }: Props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handlePress = async () => {
		onSubmit(email, password);
	};

	return (<>
		<View style={{ flex: 1 }}>
			<View>
				<Text>Email</Text>
				<TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" inputMode="email" autoComplete="email" />
			</View>
			<View>
				<Text>Password</Text>
				<TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
			</View>
			{/* <Button title={buttonTitle} color="blue" disabled={!email || !password} onPress={handlePress} /> */}
			<Pressable style={[styles.button, { backgroundColor: isLoading ? 'rgba(165, 165, 165, 1)' : 'blue' }]} onPress={handlePress} disabled={isLoading}>
				{!isLoading ? (<Text style={styles.buttonText}>{buttonTitle}</Text>) : (
					<ActivityIndicator size="small" color="gray" />
				)}

			</Pressable>

		</View>

	</>);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		marginVertical: 8,
		borderWidth: .5,
		borderRadius: 10,
		borderColor: 'blue',
		padding: 10,
	},
	button: {
		borderRadius: 10,
		padding: 10,
		marginTop: 15,
		width: '80%',
		alignItems: 'center',
		alignSelf: 'center',
		elevation: 2,
		shadowColor: 'rgba(0, 0, 0, 1)',
		shadowOffset: { width: 5, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 3.5,
	}, buttonText: {
		color: '#fff',
		fontSize: 14
	}
});
