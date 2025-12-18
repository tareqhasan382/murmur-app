export interface User {
    id: number;
    name: string;
    profileImage: string;
}


export interface Murmur {
    id: number;
    content: string;
    user: User;
    likes: number;
    createdAt: string;
}