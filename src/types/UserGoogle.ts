export type UserGoogle = {
    id: string;
    name: string;
    email: string;
    picture: string;
    type: 'user' | 'admin'; 
    create_at: string;
}