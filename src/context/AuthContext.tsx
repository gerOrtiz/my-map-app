import { auth, db } from "@/src/config/firebaseConfig";
import { AuthError, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { UserI } from "../interfaces/user";

type UserRole = 'driver' | 'customer' | null;

interface UserDocI {
	createdAt: string;
	email: string;
	role: Exclude<UserRole, null>
}

interface AuthContextType {
	authUser: User | null;
	user: UserI | null;
	loading: boolean;
	userRole: UserRole;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string, role: string) => Promise<void>;
	logOut: () => Promise<void>;
	error: AuthError | null; // To handle auth specific errors
}

const AuhtContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [authUser, setAuthUser] = useState<User | null>(null);
	const [user, setUser] = useState<UserI | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<AuthError | null>(null);
	const [userRole, setUserRole] = useState<UserRole>(null);

	const getUserInfo = useCallback(async (firebaseUser: User): Promise<UserDocI | null> => {
		const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
		if (userDoc.exists()) return userDoc.data() as UserDocI;
		return null;
	}, []);

	const getDriverInfo = useCallback(async (user: UserI) => {
		const driverDoc = await getDoc(doc(db, 'drivers', user.uid));
		if (driverDoc.exists()) {
			user.isActive = driverDoc.data().isActive || false;
		}
		return;
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				setAuthUser(firebaseUser);
				const userDoc = await getUserInfo(firebaseUser);
				if (userDoc) {
					setUserRole(userDoc.role);
					const newUser: UserI = {
						displayName: firebaseUser.displayName,
						email: firebaseUser.email,
						phoneNumber: firebaseUser.phoneNumber,
						photoURL: firebaseUser.phoneNumber,
						uid: firebaseUser.uid,
						role: userDoc.role,
					};
					if (userDoc.role === 'driver') await getDriverInfo(newUser);
					setUser(newUser);
				}
			} else {
				setUser(null);
				setAuthUser(null);
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
			await signInWithEmailAndPassword(auth, email, password);
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
		authUser,
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

