interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, description, children }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/20 dark:via-gray-900 dark:to-secondary-900/20 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}