import { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { RegistrationForm } from '@/components/submit/registration-form'

export const metadata: Metadata = {
  title: 'Register - TELOS MAED',
  description: 'Create an account to join our community and access exclusive content.',
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Register"
        description="Create an account to join our community"
      />
      
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <RegistrationForm />
      </div>
    </div>
  )
}