"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { signupWithRole } from "@/lib/auth"
import { createClient } from "@/utils/supabase/client"
import { Role } from "@/types/role"

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  // State for student
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentConfirmPassword, setStudentConfirmPassword] = useState("");
  const [studentError, setStudentError] = useState<string | null>(null);
  const [studentLoading, setStudentLoading] = useState(false);

  // State for tutor
  const [tutorEmail, setTutorEmail] = useState("");
  const [tutorPassword, setTutorPassword] = useState("");
  const [tutorConfirmPassword, setTutorConfirmPassword] = useState("");
  const [tutorError, setTutorError] = useState<string | null>(null);
  const [tutorLoading, setTutorLoading] = useState(false);

  // Student signup handler
  const handleStudentSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStudentError(null);

    if (studentPassword !== studentConfirmPassword) {
      setStudentError("Passwords do not match");
      return;
    }

    setStudentLoading(true);
    const formData = new FormData();
    formData.append("email", studentEmail);
    formData.append("password", studentPassword);

    try {
      await signupWithRole(formData, Role.STUDENT);
      router.push("/");
    } catch (err: any) {
      setStudentError("Sign up failed");
    } finally {
      setStudentLoading(false);
    }
  };

  // Tutor signup handler
  const handleTutorSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTutorError(null);

    if (tutorPassword !== tutorConfirmPassword) {
      setTutorError("Passwords do not match");
      return;
    }

    setTutorLoading(true);
    const formData = new FormData();
    formData.append("email", tutorEmail);
    formData.append("password", tutorPassword);

    try {
      await signupWithRole(formData, Role.TUTOR);
      router.push("/");
    } catch (err: any) {
      setTutorError("Sign up failed");
    } finally {
      setTutorLoading(false);
    }
  };

  // Google signup for student
  const handleStudentGoogleSignup = async () => {
    setStudentError(null);
    setStudentLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `/`,
      },
    });
    if (error) {
      setStudentError(error.message);
    }
    setStudentLoading(false);
  };

  // Google signup for tutor
  const handleTutorGoogleSignup = async () => {
    setTutorError(null);
    setTutorLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `/`,
      },
    });
    if (error) {
      setTutorError(error.message);
    }
    setTutorLoading(false);
  };

  // Google SVG
  const GoogleIcon = (
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
  );

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch min-h-screen bg-gray-50">
      {/* Student Signup */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 shadow md:rounded-l-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Student Sign Up</h2>
        <form className="space-y-4 w-full max-w-xs">
          <div className="flex flex-col space-y-1">
            <label htmlFor="student-email" className="text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="student-email"
              name="student-email"
              type="email"
              required
              value={studentEmail}
              onChange={e => setStudentEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="student-password" className="text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="student-password"
              name="student-password"
              type="password"
              required
              value={studentPassword}
              onChange={e => setStudentPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="student-confirm-password" className="text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              id="student-confirm-password"
              name="student-confirm-password"
              type="password"
              required
              value={studentConfirmPassword}
              onChange={e => setStudentConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          {studentError && (
            <div className="text-red-600 text-sm">{studentError}</div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={handleStudentSignup}
              type="submit"
              disabled={studentLoading}
              className="cursor-pointer flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {studentLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="pt-4 w-full max-w-xs">
          <button
            onClick={handleStudentGoogleSignup}
            disabled={studentLoading}
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
          >
            {GoogleIcon}
            Continue with Google
          </button>
        </div>
      </div>

      {/* Tutor Signup */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-100 p-8 shadow md:rounded-r-lg">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Tutor Sign Up</h2>
        <form className="space-y-4 w-full max-w-xs">
          <div className="flex flex-col space-y-1">
            <label htmlFor="tutor-email" className="text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="tutor-email"
              name="tutor-email"
              type="email"
              required
              value={tutorEmail}
              onChange={e => setTutorEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="tutor-password" className="text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="tutor-password"
              name="tutor-password"
              type="password"
              required
              value={tutorPassword}
              onChange={e => setTutorPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="tutor-confirm-password" className="text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              id="tutor-confirm-password"
              name="tutor-confirm-password"
              type="password"
              required
              value={tutorConfirmPassword}
              onChange={e => setTutorConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>
          {tutorError && (
            <div className="text-red-600 text-sm">{tutorError}</div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={handleTutorSignup}
              type="submit"
              disabled={tutorLoading}
              className="cursor-pointer flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
            >
              {tutorLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="pt-4 w-full max-w-xs">
          <button
            onClick={handleTutorGoogleSignup}
            disabled={tutorLoading}
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
          >
            {GoogleIcon}
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );

}
