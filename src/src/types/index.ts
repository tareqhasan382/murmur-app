export interface User {
    id: number;
    name: string;
    profileImage: string | null;
}


export interface Murmur {
    id: number;
    content: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    likesCount: number;
    isLiked: boolean;
    likedUsers: number[]; // list of user IDs who liked
    user: User;
}
