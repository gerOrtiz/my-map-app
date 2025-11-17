export interface UserI {
	email: string | null;
	displayName: string | null;
	phoneNumber: string | null;
	photoURL: string | null;
	uid: string;
	role: string;
	isActive?: boolean;
}