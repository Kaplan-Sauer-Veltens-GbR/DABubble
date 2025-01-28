export interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
  lastLogin: Date;
  status: string;
  lastActivity: Date;
//   isYou?: boolean;
}
