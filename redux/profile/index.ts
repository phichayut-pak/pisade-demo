import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/types/profile";
import { Role } from "@/types/role";

const initialState: Profile = {
    id: "",
    username: "",
    full_name: "",
    avatar_url: "",
    role: Role.STUDENT,
    bio: "",
    subscribed_channels: [],
    preferences: {},
    created_at: new Date(),
    updated_at: new Date(),
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.full_name = action.payload.full_name;
        state.avatar_url = action.payload.avatar_url;
        state.role = action.payload.role;
        state.bio = action.payload.bio;
        state.subscribed_channels = action.payload.subscribed_channels;
        state.preferences = action.payload.preferences;
        state.created_at = action.payload.created_at;
        state.updated_at = action.payload.updated_at;
    },
    updateUsername(state, action: PayloadAction<string>) {
        state.username = action.payload;
    },
    updateFullName(state, action: PayloadAction<string>) {
        state.full_name = action.payload;
    },
    updateAvatarUrl(state, action: PayloadAction<string>) {
        state.avatar_url = action.payload;
    },
    clearProfile(state) {
        state.id = "";
        state.username = "";
        state.full_name = "";
        state.avatar_url = "https://ujuefggrujmfavhjqxge.supabase.co/storage/v1/object/public/avatar/default-user-profile.jpg";
        state.role = Role.STUDENT;
        state.bio = "";
        state.subscribed_channels = [];
        state.preferences = {};
        state.created_at = new Date();
        state.updated_at = new Date();
    },
    updateBio(state, action: PayloadAction<string>) {
        state.bio = action.payload;
    },
    updateSubscribedChannels(state, action: PayloadAction<string[]>) {
        state.subscribed_channels = action.payload;
    },
    updatePreferences(state, action: PayloadAction<{}>) {
        state.preferences = action.payload;
    },
},
});

export const {
    setProfile,
    updateUsername,
    updateFullName,
    updateAvatarUrl,
    clearProfile,
    updateBio,
    updateSubscribedChannels,
    updatePreferences,
} = profileSlice.actions;

export default profileSlice.reducer;
