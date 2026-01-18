'use client'

import { useState } from 'react'
import { 
  CalendarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  BookOpenIcon,
  NewspaperIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface CalendarEvent {
  id: number
  title: string
  date: string
  time?: string
  type: 'article' | 'poetry' | 'magazine' | 'event'
  status: 'scheduled' | 'published' | 'draft' | 'cancelled'
  author: string
  isPublic: boolean
  description: string
  color: string
}

interface EditorialCalendarProps {
  isPublicView?: boolean
  showPrivateEvents?: boolean
}

export default function EditorialCalendar({ isPublicView = false, showPrivateEvents = true }: EditorialCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month')
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'The Future of Christian Education',
      date: '2024-01-20',
      time: '10:00',
      type: 'article',
      status: 'scheduled',
      author: 'Dr. Sarah Johnson',
      isPublic: true,
      description: 'Exploring innovative approaches to Christian education in the digital age.',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Poetry Collection: Songs of Faith',
      date: '2024-01-25',
      time: '14:00',
      type: 'poetry',
      status: 'draft',
      author: 'Joshua Emmanuel',
      isPublic: false,
      description: 'A collection of contemporary Christian poetry.',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Magazine Issue #13 Release',
      date: '2024-02-01',
      time: '09:00',
      type: 'magazine',
      status: 'scheduled',
      author: 'Editorial Team',
      isPublic: true,
      description: 'February issue focusing on Christian leadership.',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Virtual Conference: Faith & Technology',
      date: '2024-02-15',
      time: '19:00',
      type: 'event',
      status: 'scheduled',
      author: 'Pastor Michael Chen',
      isPublic: true,
      description: 'Online conference exploring the intersection of faith and technology.',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'Internal Editorial Meeting',
      date: '2024-01-18',
      time: '15:00',
      type: 'event',
      status: 'scheduled',
      author: 'Editorial Team',
      isPublic: false,
      description: 'Monthly editorial planning meeting.',
      color: 'bg-gray-500'
    },
    {
      id: 6,
      title: 'የእምነት መንገድ - Faith Journey Series',
      date: '2024-01-30',
      time: '11:00',
      type: 'article',
      status: 'scheduled',
      author: 'Pastor Michael Chen',
      isPublic: true,
      description: 'Bilingual series on spiritual growth and discipleship.',
      color: 'bg-indigo-500'
    }
  ])

  const filteredEvents = events.filter(event => {
    if (isPublicView && !event.isPublic) return false
    if (!showPrivateEvents && !event.isPublic) return false
    return true
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return DocumentTextIcon
      case 'poetry': return BookOpenIcon
      case 'magazine': return NewspaperIcon
      case 'event': return UserGroupIcon
      default: return CalendarIcon
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: string) => {
    return filteredEvents.filter(event => event.date === date)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayEvents = getEventsForDate(dateString)
      const isToday = new Date().toDateString() === new Date(dateString).toDateString()

      days.push(
        <div key={day} className={`p-2 min-h-[100px] border border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
          <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => {
              const IconComponent = getTypeIcon(event.type)
              return (
                <div
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event)
                    setShowModal(true)
                  }}
                  className={`${event.color} text-white text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200`}
                >
                  <div className="flex items-center">
                    <IconComponent className="w-3 h-3 mr-1" />
                    <span className="truncate">{event.title}</span>
                  </div>
                </div>
              )
            })}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
            {day}
          </div>
        ))}
        {days}
      </div>
    )
  }

  const renderListView = () => (
    <div className="space-y-4">
      {filteredEvents
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((event) => {
          const IconComponent = getTypeIcon(event.type)
          return (
            <div key={event.id} className="bg-white rounded-lg p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`${event.color} p-2 rounded-lg`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {event.date}
                      </span>
                      {event.time && (
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {event.time}
                        </span>
                      )}
                      <span>by {event.author}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  {!event.isPublic && (
                    <EyeSlashIcon className="w-4 h-4 text-gray-400" title="Private Event" />
                  )}
                  {!isPublicView && (
                    <div className="flex space-x-1">
                      <button
                        onClick={() => {
                          setSelectedEvent(event)
                          setShowModal(true)
                        }}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )

  const renderModal = () => {
    if (!showModal || !selectedEvent) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{selectedEvent.title}</h4>
                <p className="text-gray-600 mt-1">{selectedEvent.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p className="text-gray-600">{selectedEvent.date}</p>
                </div>
                {selectedEvent.time && (
                  <div>
                    <span className="font-medium text-gray-700">Time:</span>
                    <p className="text-gray-600">{selectedEvent.time}</p>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <p className="text-gray-600 capitalize">{selectedEvent.type}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEvent.status)}`}>
                    {selectedEvent.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Author:</span>
                  <p className="text-gray-600">{selectedEvent.author}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Visibility:</span>
                  <p className="text-gray-600">{selectedEvent.isPublic ? 'Public' : 'Private'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {!isPublicView && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Edit Event
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isPublicView ? 'Editorial Calendar' : 'Editorial Calendar Management'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isPublicView 
              ? 'Upcoming articles, poetry, and events' 
              : 'Manage and schedule content publication'
            }
          </p>
        </div>
        {!isPublicView && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Event
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
            {formatDate(currentDate)}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              viewMode === 'month' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Calendar Content */}
      {viewMode === 'month' ? renderMonthView() : renderListView()}

      {/* Modal */}
      {renderModal()}
    </div>
  )
}