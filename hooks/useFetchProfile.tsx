"use client"

import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"

export interface Profile {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    role: string;
    bio: string;
    subcribed_channels: string[];
    preferences: {};
    created_at: string;
    updated_at: string;
    email: string;
}

export function useFetchProfile(opts: { enabled?: boolean } = {}): UseQueryResult<Profile, Error> {
    const supabase = createClient()

    return useQuery<Profile, Error>({
        queryKey: ["profile"],
        queryFn: async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser()
            if (userError) throw userError
            if (!user) throw new Error("Not authenticated")

            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single()

            if (profileError) throw profileError
            if (!profile) throw new Error("Profile not found")
            return ( {
                ...profile,
                email: user.email
        
            })
        },
        staleTime: 5 * 60 * 1000, // cache for 5 minutes,
        enabled: opts.enabled,
    })
}