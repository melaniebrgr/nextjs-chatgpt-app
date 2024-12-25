'use server'

import { LoginFormSchema, LoginFormState } from '@/lib/auth/definitions'
 
export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  if (!validatedFields.success) {
    console.log('>>> Validation errors...', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Call the provider or db to create a user...
  console.log('>>> Verifying user...', validatedFields.data);
}