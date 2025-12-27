export interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export interface UserScore {
    uid: string;
    score: number;
    email?: string | null;
    displayName?: string | null;
    status?: 'completed' | 'abandoned';
}
