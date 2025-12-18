import type {Murmur, User} from "../types";


export const users: User[] = [
    { id: 1, name: 'Tareq', profileImage: 'https://i.pravatar.cc/100?img=1' },
    { id: 2, name: 'John Doe', profileImage: 'https://i.pravatar.cc/100?img=2' },
];


export const murmurs: Murmur[] = [
    {
        id: 1,
        content: 'Just finished my NestJS backend! 🚀',
        user: users[0],
        likes: 5,
        createdAt: '2 min ago',
    },
    {
        id: 2,
        content: 'Building a Twitter-like app with Prisma 💙',
        user: users[1],
        likes: 2,
        createdAt: '10 min ago',
    },
];