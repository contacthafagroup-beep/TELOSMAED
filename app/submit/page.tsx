import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign Up - TELOS MAED',
  description: 'Create an account to join our community and access exclusive content.',
}

export default function SubmitPage() {
  redirect('/register')
}