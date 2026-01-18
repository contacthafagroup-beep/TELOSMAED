import { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'

export const metadata: Metadata = {
  title: 'Contact - TELOS MAED',
  description: 'Get in touch with the TELOS MAED editorial team. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Reach out with questions, feedback, or collaboration ideas."
      />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
          
          {/* Contact Form */}
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}