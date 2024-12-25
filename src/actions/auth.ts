import { SignupFormSchema, SignupFormState } from '@/lib/auth/definitions'
 
export async function signup(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  console.log('Creating user...', validatedFields);
  
  // Call the provider or db to create a user...
}