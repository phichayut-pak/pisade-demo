"use client"

import { useRouter } from "next/navigation"
import { login } from '@/lib/auth'
import { createClient } from '@/utils/supabase/client'
import { useFetchProfile } from "@/hooks/useFetchProfile"

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const { data: profile, isLoading: loading } = useFetchProfile();

    // If already logged in, redirect to home
    if (profile && profile.email) {
        if (typeof window !== "undefined") {
            router.push('/');
        }
        return null;
    }

    // Google login handler
    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `/`,
            },
        });
        if (error) {
            console.error('OAuth error:', error.message)
        }
    };

    if (loading) {
        return <div className="text-center mt-16 text-lg text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded shadow space-y-4">
        <form className="space-y-4">
            <div className="flex flex-col space-y-1">
            <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
            >
                Email:
            </label>
            <input
                id="email"
                name="email"
                type="email"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            </div>
            <div className="flex flex-col space-y-1">
            <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
            >
                Password:
            </label>
            <input
                id="password"
                name="password"
                type="password"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            </div>
            <div className="flex space-x-2">
            <button
                formAction={login}
                className="cursor-pointer flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Log in 
            </button>
            
            </div>
        </form>
        <div className="pt-2">
            <button
                onClick={handleGoogleLogin}
                className="cursor-pointer w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
                <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <g>
                    <path
                    d="M44.5 20H24V28.5H36.9C35.6 32.1 32.1 34.5 28 34.5C22.8 34.5 18.5 30.2 18.5 25C18.5 19.8 22.8 15.5 28 15.5C30.2 15.5 32.2 16.3 33.7 17.6L39.1 12.2C36.2 9.7 32.3 8 28 8C17.5 8 9 16.5 9 27C9 37.5 17.5 46 28 46C38.5 46 47 37.5 47 27C47 25.3 46.8 23.7 46.4 22.2L44.5 20Z"
                    fill="#4285F4"
                    />
                    <path
                    d="M6.3 14.7L13.1 19.8C14.8 16.2 18.1 13.5 22 13.5C24.2 13.5 26.2 14.3 27.7 15.6L33.1 10.2C30.2 7.7 26.3 6 22 6C13.5 6 6 13.5 6 22C6 23.7 6.2 25.3 6.6 26.8L6.3 14.7Z"
                    fill="#34A853"
                    />
                    <path
                    d="M24 44C29.2 44 33.5 39.7 33.5 34.5C33.5 29.3 29.2 25 24 25C18.8 25 14.5 29.3 14.5 34.5C14.5 39.7 18.8 44 24 44Z"
                    fill="#FBBC05"
                    />
                    <path
                    d="M44.5 20H24V28.5H36.9C35.6 32.1 32.1 34.5 28 34.5C22.8 34.5 18.5 30.2 18.5 25C18.5 19.8 22.8 15.5 28 15.5C30.2 15.5 32.2 16.3 33.7 17.6L39.1 12.2C36.2 9.7 32.3 8 28 8C17.5 8 9 16.5 9 27C9 37.5 17.5 46 28 46C38.5 46 47 37.5 47 27C47 25.3 46.8 23.7 46.4 22.2L44.5 20Z"
                    fill="#EA4335"
                    />
                </g>
                </svg>
                Continue with Google
            </button>
        </div>
        <div className="pt-4 text-center">
            <span className="text-sm text-gray-700">
                If you haven't registered, <a href="/signup" className="text-blue-600 hover:underline">Register here</a>
            </span>
        </div>
        </div>
    );
}
