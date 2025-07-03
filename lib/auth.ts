'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Role } from '@/types/role'

export async function login(formData: FormData) {
    const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const extractedData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { data, error } = await supabase.auth.signUp(extractedData)

    if (error) {
        // You can customize this error handling as needed
        throw new Error(error.message || "Signup failed")
    }

    return data

}

export async function assignRole(role: Role, id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.from('profiles').update({ role: role }).eq('id', id)

    return data

}

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

export async function getUserRole() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        const { data, error } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (error) {
            throw new Error(error.message || "Failed to fetch user")
        }
        return data.role
    }
    return null
}

export async function getUser() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
}