'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import HeroManagement from '@/components/admin/hero-management'
import { ArticlesManagement } from '@/components/admin/articles-management'
import { PoetryManagement } from '@/components/admin/poetry-management'
import { clearAuthToken } from '@/lib/auth'
import { 
  HomeIcon,
  DocumentTextIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  BellIcon,
  PhotoIcon,
  LanguageIcon,
  GlobeAltIcon,
  BookOpenIcon,
  NewspaperIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { 
  useAdminStats, 
  useAdminArticles, 
  useAdminPoems,
  useAdminUsers, 
  useAdminComments,
  useAdminAnalytics,
  useContentActions
} from '@/lib/hooks/use-admin-api'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const handleLogout = () => {
    clearAuthToken()
    router.push('/')
    router.refresh()
  }

  // Fetch real data from backend
  const { data: stats, loading: statsLoading } = useAdminStats()
  const { data: articles, loading: articlesLoading, refetch: refetchArticles } = useAdminArticles({ limit: 10 })
  const { data: poems, loading: poemsLoading } = useAdminPoems({ limit: 10 })
  const { data: users, loading: usersLoading } = useAdminUsers()
  const { data: comments, loading: commentsLoading, refetch: refetchComments } = useAdminComments()
  const { data: analytics } = useAdminAnalytics()
  const contentActions = useContentActions()

  // Format articles for display
  const recentArticles = articles?.slice(0, 4).map((article: any) => ({
    id: article.id,
    title: article.title,
    author: article.author.name,
    status: article.published ? 'published' : 'draft',
    views: article.views,
    date: new Date(article.publishedAt || article.createdAt).toLocaleDateString()
  })) || []

  // Format users for display
  const formattedUsers = users?.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'subscriber',
    joined: new Date(user.createdAt).toLocaleDateString(),
    status: user.status || 'active'
  })) || []

  // Format comments for display
  const formattedComments = comments?.map((comment: any) => ({
    id: comment.id,
    article: comment.article?.title || 'Unknown Article',
    author: comment.author?.name || 'Anonymous',
    content: comment.content,
    status: comment.status || 'pending',
    date: new Date(comment.createdAt).toLocaleDateString()
  })) || []

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'hero', label: 'Hero Management', icon: SparklesIcon },
    { id: 'articles', label: 'Articles', icon: DocumentTextIcon },
    { id: 'poetry', label: 'Poetry', icon: BookOpenIcon },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'comments', label: 'Comments', icon: ChatBubbleLeftRightIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'translations', label: 'Translations', icon: LanguageIcon },
    { id: 'media', label: 'Media Library', icon: PhotoIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': case 'approved': case 'active': return 'text-green-600 bg-green-100'
      case 'draft': case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'review': case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const renderDashboard = () => {
    if (statsLoading) {
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Articles</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.totalArticles || 0}</p>
            </div>
            <DocumentTextIcon className="w-12 h-12 text-blue-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">Real-time data</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.totalUsers?.toLocaleString() || 0}</p>
            </div>
            <UsersIcon className="w-12 h-12 text-green-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">Growing community</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Views</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.monthlyViews?.toLocaleString() || 0}</p>
            </div>
            <ChartBarIcon className="w-12 h-12 text-purple-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">Increasing engagement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.pendingReviews || 0}</p>
            </div>
            <ClockIcon className="w-12 h-12 text-orange-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            {stats?.pendingReviews && stats.pendingReviews > 0 ? (
              <>
                <ClockIcon className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-orange-600">Needs attention</span>
              </>
            ) : (
              <>
                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">All caught up!</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Articles</h3>
          </div>
          <div className="p-6">
            {articlesLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse p-4 bg-gray-50 rounded-lg">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentArticles.length > 0 ? (
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{article.title}</h4>
                      <p className="text-sm text-gray-600">by {article.author}</p>
                      <p className="text-xs text-gray-500">{article.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                        {article.status}
                      </span>
                      <span className="text-sm text-gray-600">{article.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <DocumentTextIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>No articles yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                <PlusIcon className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">New Article</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                <BookOpenIcon className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-900">New Poetry</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                <UsersIcon className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-900">Manage Users</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                <ChartBarIcon className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-900">View Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

  const renderUsers = () => {
    if (usersLoading) {
      return (
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <UserGroupIcon className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers?.toLocaleString() || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <EnvelopeIcon className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.subscribers?.toLocaleString() || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <PencilIcon className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Contributors</p>
              <p className="text-2xl font-bold text-gray-900">{formattedUsers.filter(u => u.role === 'contributor').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <CogIcon className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900">{formattedUsers.filter(u => u.role === 'admin').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formattedUsers.length > 0 ? formattedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <UsersIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
  }

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-3xl font-bold text-gray-900">89,340</p>
              <p className="text-sm text-green-600">+15% from last month</p>
            </div>
            <ChartBarIcon className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
              <p className="text-3xl font-bold text-gray-900">24,567</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
            <UsersIcon className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Session</p>
              <p className="text-3xl font-bold text-gray-900">4:32</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <ClockIcon className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              <p className="text-3xl font-bold text-gray-900">32%</p>
              <p className="text-sm text-red-600">-5% from last month</p>
            </div>
            <ArrowDownIcon className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart Component Would Go Here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Articles</h3>
          <div className="space-y-4">
            {recentArticles.slice(0, 5).map((article, index) => (
              <div key={article.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{article.title}</span>
                </div>
                <span className="text-sm text-gray-600">{article.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderComments = () => {
    if (commentsLoading) {
      return (
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse mb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    const handleApprove = async (id: string) => {
      await contentActions.approveComment(id)
      if (contentActions.success) {
        refetchComments()
      }
    }

    const handleReject = async (id: string) => {
      await contentActions.rejectComment(id)
      if (contentActions.success) {
        refetchComments()
      }
    }

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Comments Management</h2>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {formattedComments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {formattedComments.map((comment) => (
              <div key={comment.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{comment.author}</h4>
                      <span className="text-sm text-gray-500">on</span>
                      <span className="text-sm font-medium text-blue-600">{comment.article}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                        {comment.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <p className="text-xs text-gray-500">{comment.date}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {comment.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApprove(comment.id)}
                          disabled={contentActions.loading}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          title="Approve"
                        >
                          <CheckCircleIcon className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleReject(comment.id)}
                          disabled={contentActions.loading}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          title="Reject"
                        >
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button className="text-gray-600 hover:text-gray-900" title="Delete">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>No comments yet</p>
          </div>
        )}
      </div>

      {contentActions.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {contentActions.error}
        </div>
      )}

      {contentActions.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Action completed successfully!
        </div>
      )}
    </div>
  )
}

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
              <input
                type="text"
                defaultValue="TELOS MAED"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
              <textarea
                rows={3}
                defaultValue="Faith-driven excellence for young Christian intellectuals"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="admin@telosmaed.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="en">English</option>
                <option value="am">Amharic (አማርኛ)</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Enable multilingual content</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Auto-translate content</span>
              </label>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
              <input
                type="text"
                defaultValue="Christian, faith, theology, young adults"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Enable sitemap generation</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Enable Google Analytics</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Email notifications for new comments</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Email notifications for new users</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Weekly analytics reports</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Save Settings
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard()
      case 'hero': return <HeroManagement />
      case 'articles': return <ArticlesManagement />
      case 'poetry': return <PoetryManagement />
      case 'users': return renderUsers()
      case 'analytics': return renderAnalytics()
      case 'comments': return renderComments()
      case 'settings': return renderSettings()
      case 'translations': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Translation Management</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
            <LanguageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Translation management interface coming soon...</p>
          </div>
        </div>
      )
      case 'media': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
            <PhotoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Media library interface coming soon...</p>
          </div>
        </div>
      )
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">TELOS MAED Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <BellIcon className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}