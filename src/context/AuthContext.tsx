import { AuthError, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";

type UserRole = 'driver' | 'customer' | null;

interface AuthContextType {
	user: User | null;
	loading: boolean;
	userRole: UserRole;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string, role: string) => Promise<void>;
	logOut: () => Promise<void>;
	error: AuthError | null; // To handle auth specific errors
}

const AuhtContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<AuthError | null>(null);
	const [userRole, setUserRole] = useState<UserRole>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				setUser(firebaseUser);
				const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
				if (userDoc.exists()) {
					setUserRole(userDoc.data().role);
				}
			} else {
				setUser(null);
				setUserRole(null);
			}

			setLoading(false);
		});
		return () => unsubscribe();
	}, []);


	const signIn = async (email: string, password: string) => {
		setLoading(true);
		setError(null);
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
		} catch (e: any) {
			if (e.code) {
				setError(e);
			} else {
				console.error("An unexpected error occurred during sign in:", e);
				// Set a generic error if not a Firebase AuthError
				setError({ code: 'auth/unknown-error', message: 'An unexpected error occurred.' } as AuthError);
			}
		} finally {
			setLoading(false); // setLoading to false here too to update UI after attempt
		}
	};

	const signUp = async (email: string, password: string, role: string) => {
		setLoading(true);
		setError(null);
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			await setDoc(doc(db, 'users', userCredential.user.uid), {
				email: email,
				role: role,
				createdAt: new Date().toISOString(),
			});

		} catch (e: any) {
			if (e.code) {
				setError(e);
			} else {
				console.error("An unexpected error occurred during sign up:", e);
				setError({ code: 'auth/unknown-error', message: 'An unexpected error occurred.' } as AuthError);
			}
		} finally {
			setLoading(false);
		}
	};

	const logOut = async () => {
		setLoading(true);
		setError(null);
		try {
			await signOut(auth);
		} catch (e: any) {
			if (e.code) {
				setError(e);
			} else {
				console.error("An unexpected error occurred during sign out:", e);
				setError({ code: 'auth/unknown-error', message: 'An unexpected error occurred.' } as AuthError);
			}
		} finally {
			setLoading(false);
		}
	};

	const contextValue = {
		user,
		loading,
		signIn,
		signUp,
		logOut,
		error,
		userRole
	};

	return (
		<AuhtContext.Provider value={contextValue}>
			{children}
		</AuhtContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuhtContext);
	if (context === undefined) {
		throw new Error('useAuth myst be used within an AuthProvider');
	}
	return context;
}

