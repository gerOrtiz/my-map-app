import { useState } from "react";
import { Text, View } from "react-native";
import { Button, TextInput as Input } from "react-native-paper";
import { useAuth } from "../context/AuthContext";

interface Props {
	onSubmit: (email: string, password: string) => Promise<void>;
	buttonTitle: string;
	isLoading?: boolean;
}

export default function AuthenticationForm({ onSubmit, buttonTitle, isLoading }: Props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { error } = useAuth();

	const handlePress = async () => {
		onSubmit(email, password);
	};


	return (<>
		<View style={{ flex: 1, gap: 10 }}>
			<View style={{ flexDirection: 'column', gap: 8 }}>
				<Text style={{ color: 'rgba(255, 2, 129, 1)', marginLeft: 2 }}>Email</Text>
				<Input
					mode="outlined"
					aria-label="Email"
					value={email} onChangeText={setEmail}
					placeholder="example@mail.com" inputMode="email" autoComplete="email"
					outlineStyle={{ borderRadius: 15, }} style={{ height: 40, fontSize: 15, }}
					outlineColor="pink" activeOutlineColor="rgba(255, 0, 119, 1)" textColor="gray"
					placeholderTextColor="gray" selectionColor="blue"
				/>
			</View>
			<View style={{ flexDirection: 'column', gap: 8 }}>
				<Text style={{ color: 'rgba(255, 2, 129, 1)', marginLeft: 2 }}>Password</Text>
				{/* <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry /> */}

				<Input
					mode="outlined"
					aria-label="Password"
					value={password} onChangeText={setPassword}
					placeholder="Password" inputMode="text" secureTextEntry={!showPassword}
					outlineStyle={{ borderRadius: 15, }} style={{ height: 40, fontSize: 15, }}
					outlineColor="pink" activeOutlineColor="rgba(255, 0, 119, 1)" textColor="gray"
					placeholderTextColor="gray"
					right={<Input.Icon icon={!showPassword ? 'eye' : 'eye-closed'} color="gray" rippleColor="pink" onPress={() => setShowPassword(prev => !prev)} />}
				/>

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
			{error && (<View style={{ width: '100%' }}>
				<Text style={{ fontSize: 13, fontWeight: 600, color: 'red', textAlign: 'center' }}>Email or password invalid, try again.</Text>
			</View>)}
		</View>

	</>);
}

