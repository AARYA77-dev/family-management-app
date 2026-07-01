export interface DepartmentMembers {
    id?: string;
    name: string,
    email: string,
    phonenumber: string,
    password: string,
    address: string,
    website: string,
    photoUrl: string,
    category: string,
    metadata?: UserMetadata
}

interface UserMetadata {
  creationTime?: string;
  lastSignInTime?: string;
}