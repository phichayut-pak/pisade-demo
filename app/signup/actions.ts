'use server'

import { signup, assignRole } from "@/lib/auth"
import { Role } from "@/types/role"

export async function signupAsStudent(formData: FormData) {
  const data = await signup(formData)
  if (data.user) {
    await assignRole(Role.STUDENT, data.user.id)
  }

  return data
}

export async function signupAsTutor(formData: FormData) {
  const data = await signup(formData)
  if (data.user) {
    await assignRole(Role.TUTOR, data.user.id)
  }

  return data

}