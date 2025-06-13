import standTypingHandPosition from '@/assets/stand-typing-hand-position.png'
import { Dialog, Transition } from '@headlessui/react'
import { ComputerDesktopIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Fragment, useState } from 'react'

export default function HandPositionIllustration() {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button className="my-btn-primary h-12 w-12 rounded-full" onClick={openModal} title="手位图">
        <ComputerDesktopIcon className="h-6 w-6" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-200  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                  <button type="button" onClick={() => setIsOpen(false)} title="关闭对话框">
                    <XMarkIcon className="absolute right-7 top-5 cursor-pointer text-gray-400" />
                  </button>
                  <Dialog.Title as="h3" className="text-center text-xl font-medium leading-6 text-gray-800 dark:text-gray-200">
                    推荐打字指法图示
                  </Dialog.Title>
                  <div className="mt-8">
                    <img className="block " src={standTypingHandPosition} alt="" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
