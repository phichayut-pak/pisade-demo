import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
    id: string;
    username?: string;
    email?: string;
    full_name?: string;
    avatar_url?: string;
    role?: string;
    bio?: string;
    subscribed_channels?: string[];
    preferences?: Record<string, any>;
    created_at?: string;
    updated_at?: string;
}

interface ProfileState {
    profile: Profile | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profile: null,
    isLoading: false,
    error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.isLoading = false;
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.role = action.payload || undefined;
      }
    },
    setEmail: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.email = action.payload || undefined;
      }
    },
    setUsername: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.username = action.payload || undefined;
      }
    },
    setFullName: (state, action: PayloadAction<string | null>) => { 
      if (state.profile) {
        state.profile.full_name = action.payload || undefined;
      }
    },
    setAvatarUrl: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.avatar_url = action.payload || undefined;
      }
    },
    setBio: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.bio = action.payload || undefined;
      }
    },
    setSubscribedChannels: (state, action: PayloadAction<string[] | null>) => {
      if (state.profile) {
        state.profile.subscribed_channels = action.payload || undefined;
      }
    },
    setPreferences: (state, action: PayloadAction<Record<string, any> | null>) => {
      if (state.profile) {
        state.profile.preferences = action.payload || undefined;
      }
    },
    setCreatedAt: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.created_at = action.payload || undefined;
      }
    },
    setUpdatedAt: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.updated_at = action.payload || undefined;
      }
    },
  },
});

export const { setProfile, setLoading, setError, clearProfile, setRole, setEmail, setUsername, setFullName, setAvatarUrl, setBio, setSubscribedChannels, setPreferences, setCreatedAt, setUpdatedAt } = profileSlice.actions;
export default profileSlice.reducer;
