import { SplashScreen } from 'expo-router';
import { useAuth } from '../context/AuthContext';


SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
	const { loading } = useAuth();

	if (!loading) {
		SplashScreen.hide();
	}

	return null;
}
