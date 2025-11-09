import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Button, DefaultTheme, TextInput as Input, Provider as PaperProvider } from "react-native-paper";

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

	const theme = useMemo(() => {
		return {
			...DefaultTheme,
			colors: {
				...DefaultTheme.colors,
				onSurfaceVariant: 'rgba(150, 150, 150, 1)',
			},
		};
	}, []);

	return (<>
		<View style={{ flex: 1, gap: 10 }}>
			<View style={{ flexDirection: 'column', gap: 8 }}>
				<Text style={{ color: 'rgba(255, 2, 129, 1)', marginLeft: 2 }}>Email</Text>
				{/* <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" inputMode="email" autoComplete="email" /> */}
				<PaperProvider theme={theme}>
					<Input
						mode="outlined"
						aria-label="Email"
						value={email} onChangeText={setEmail}
						placeholder="example@mail.com" inputMode="email" autoComplete="email"
						outlineStyle={{ borderRadius: 15, }} style={{ height: 40, fontSize: 15, }}
						outlineColor="pink" activeOutlineColor="rgba(255, 0, 119, 1)" textColor="gray"
					/>
				</PaperProvider>
			</View>
			<View style={{ flexDirection: 'column', gap: 8 }}>
				<Text style={{ color: 'rgba(255, 2, 129, 1)', marginLeft: 2 }}>Password</Text>
				{/* <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry /> */}
				<PaperProvider theme={theme}>
					<Input
						mode="outlined"
						aria-label="Email"
						value={password} onChangeText={setPassword}
						placeholder="Password" inputMode="text" secureTextEntry
						outlineStyle={{ borderRadius: 15, }} style={{ height: 40, fontSize: 15, }}
						outlineColor="pink" activeOutlineColor="rgba(255, 0, 119, 1)" textColor="gray"
					/>
				</PaperProvider>
			</View>

			{/* <Pressable style={[styles.button, { backgroundColor: isLoading ? 'rgba(165, 165, 165, 1)' : 'blue' }]} onPress={handlePress} disabled={isLoading}>
				{!isLoading ? (<Text style={styles.buttonText}>{buttonTitle}</Text>) : (
					<ActivityIndicator size="small" color="gray" />
				)}
			</Pressable> */}
			<View style={{ width: '50%', justifyContent: 'center', alignSelf: 'center' }}>
				<Button mode={isLoading || !email || !password ? 'contained' : 'elevated'}
					buttonColor="#FF69B4"
					textColor="white" disabled={isLoading || !email || !password}
					loading={isLoading}
					onPress={handlePress}
				>
					{isLoading ? '' : buttonTitle}
				</Button>
			</View>
		</View>

	</>);
}

