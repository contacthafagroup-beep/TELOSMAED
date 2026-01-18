'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function SearchButton() {
  const handleSearch = () => {
    // TODO: Implement search modal
    console.log('Search functionality to be implemented')
  }

  return (
    <button
      onClick={handleSearch}
      className="p-2 text-wisdom dark:text-dark-secondary hover:text-primary-600 dark:hover:text-dark-primary transition-colors duration-200"
      aria-label="Search"
    >
      <MagnifyingGlassIcon className="h-5 w-5" />
    </button>
  )
}