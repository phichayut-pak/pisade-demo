import { Role } from "./role";

export interface Profile {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    role: Role;
    bio: string;
    subscribed_channels: string[];
    preferences: {};
    created_at: Date;
    updated_at: Date;
}