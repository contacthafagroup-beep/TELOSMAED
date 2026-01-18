'use client'

import { useState } from 'react'
import { 
  VideoCameraIcon,
  PencilIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { useHeroVideo } from '@/lib/hooks/use-hero-api'

export default function HeroManagement() {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const { 
    video: heroVideo, 
    loading: videoLoading, 
    error: videoError,
    updateVideo 
  } = useHeroVideo()

  const openModal = (item?: any) => {
    setSelectedItem(item || null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedItem(null)
  }

  const toggleActive = async () => {
    try {
      if (heroVideo) {
        await updateVideo({ isActive: !heroVideo.isActive })
        triggerSuccess()
      }
    } catch (error) {
      console.error('Failed to toggle:', error)
    }
  }

  const handleSaveVideo = async (formData: FormData) => {
    try {
      await updateVideo({
        title: formData.get('title') as string,
        titleAm: formData.get('titleAm') as string,
        description: formData.get('description') as string,
        descriptionAm: formData.get('descriptionAm') as string,
        videoUrl: formData.get('videoUrl') as string,
        isActive: formData.get('isActive') === 'on'
      })
      triggerSuccess()
      closeModal()
    } catch (error) {
      console.error('Failed to save video:', error)
    }
  }

  const triggerSuccess = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const openPreview = () => {
    setShowPreview(true)
  }

  const closePreview = () => {
    setShowPreview(false)
  }

  const renderVideoManagement = () => {
    if (videoLoading) return <div className="text-center py-12 text-gray-500">Loading video...</div>
    if (videoError || !heroVideo) return <div className="text-center py-12 text-red-600">Error loading video data</div>

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Hero Story Video</h3>
            <p className="text-sm text-gray-600 mt-1">Manage the "Watch Our Story" video modal</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-2xl">
          <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            {heroVideo.videoUrl ? (
              <video 
                src={heroVideo.videoUrl} 
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-white">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <PlayIcon className="h-8 w-8 ml-1" />
                </div>
                <h4 className="text-2xl font-bold mb-2">{heroVideo.title}</h4>
                <p className="text-lg opacity-80">{heroVideo.description}</p>
              </div>
            )}
            
            <div className="absolute top-3 right-3 flex space-x-2 z-10">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${heroVideo.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {heroVideo.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">English Title:</p>
                <p className="text-sm text-gray-900 font-medium">{heroVideo.title}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Amharic Title:</p>
                <p className="text-sm text-gray-900 font-medium">{heroVideo.titleAm}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">English Description:</p>
                <p className="text-sm text-gray-900">{heroVideo.description}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Amharic Description:</p>
                <p className="text-sm text-gray-900">{heroVideo.descriptionAm}</p>
              </div>
              {heroVideo.videoUrl && (
                <div className="md:col-span-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">Video URL:</p>
                  <p className="text-sm text-gray-900 truncate">{heroVideo.videoUrl}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                onClick={toggleActive}
                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${heroVideo.isActive ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
              >
                {heroVideo.isActive ? <PauseIcon className="w-5 h-5 mr-2" /> : <PlayIcon className="w-5 h-5 mr-2" />}
                {heroVideo.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={openPreview}
                  className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <EyeIcon className="w-5 h-5 mr-2" />
                  Preview
                </button>
                <button
                  onClick={() => openModal(heroVideo)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 mr-2" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderModal = () => {
    if (!showModal) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      handleSaveVideo(formData)
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedItem ? 'Edit' : 'Add'} Hero Video
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">English Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedItem?.title || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Watch Our Story"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amharic Title</label>
                <input
                  type="text"
                  name="titleAm"
                  defaultValue={selectedItem?.titleAm || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="የእኛን ታሪክ ይመልከቱ"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">English Description</label>
                <input
                  type="text"
                  name="description"
                  defaultValue={selectedItem?.description || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Discover Our Mission"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amharic Description</label>
                <input
                  type="text"
                  name="descriptionAm"
                  defaultValue={selectedItem?.descriptionAm || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ተልእኳችንን ያውቁ"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                type="url"
                name="videoUrl"
                defaultValue={selectedItem?.videoUrl || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/video.mp4 or YouTube/Vimeo URL"
              />
              <p className="text-xs text-gray-500 mt-1">Enter a direct video URL or embed URL from YouTube/Vimeo</p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={selectedItem?.isActive !== false}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                id="video-active"
              />
              <label htmlFor="video-active" className="ml-2 text-sm text-gray-700">Active</label>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {selectedItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center">
            <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
            <p className="text-green-800 font-medium">✅ Changes saved successfully!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hero Video Management</h2>
        <p className="text-gray-600">Manage the hero section video: "Watch Our Story"</p>
      </div>

      {/* Video Management Content */}
      {renderVideoManagement()}

      {/* Modal */}
      {renderModal()}

      {/* Preview Modal */}
      {showPreview && heroVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Preview: Hero Story Video
                </h3>
                <button
                  onClick={closePreview}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                  {heroVideo.videoUrl ? (
                    <video 
                      src={heroVideo.videoUrl} 
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative z-10 text-center text-white">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                        <PlayIcon className="h-8 w-8 ml-1" />
                      </div>
                      <h4 className="text-3xl font-bold mb-2">{heroVideo.title}</h4>
                      <p className="text-xl opacity-80 mb-2">{heroVideo.description}</p>
                      <p className="text-lg opacity-70">{heroVideo.titleAm}</p>
                      <p className="text-base opacity-60">{heroVideo.descriptionAm}</p>
                    </div>
                  )}
                </div>
                {heroVideo.videoUrl && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Video URL:</p>
                    <p className="text-sm text-gray-600 break-all">{heroVideo.videoUrl}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={closePreview}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
