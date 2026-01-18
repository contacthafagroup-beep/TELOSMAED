'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlayIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl?: string
  title?: string
  description?: string
}

export function VideoModal({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title = "TELOS MAED Introduction",
  description = "Discover our mission and vision"
}: VideoModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-black shadow-2xl transition-all">
                <div className="relative aspect-video">
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>

                  {/* Video Content */}
                  {videoUrl ? (
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    /* Placeholder Content */
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-900 to-secondary-900">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-white"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
                        >
                          <PlayIcon className="h-8 w-8 ml-1" />
                        </motion.div>
                        <h3 className="text-2xl font-display font-bold mb-2">{title}</h3>
                        <p className="text-lg opacity-80 mb-6">{description}</p>
                        <div className="text-sm opacity-60">
                          Video content will be available soon
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}