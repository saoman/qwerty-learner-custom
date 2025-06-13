import { hintSoundsConfigAtom, keySoundsConfigAtom } from '@/store'
import { soundAtom } from '@/store'
import { Popover, Switch, Transition } from '@headlessui/react'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'
import { Fragment, useCallback } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function SoundSwitcher() {
  const [keySoundsConfig, setKeySoundsConfig] = useAtom(keySoundsConfigAtom)
  const [hintSoundsConfig, setHintSoundsConfig] = useAtom(hintSoundsConfigAtom)
  const [isSoundOn, setIsSoundOn] = useAtom(soundAtom)

  const onChangeKeySound = useCallback(
    (checked: boolean) => {
      setKeySoundsConfig((old) => ({ ...old, isOpen: checked }))
    },
    [setKeySoundsConfig],
  )

  const onChangeHintSound = useCallback(
    (checked: boolean) => {
      setHintSoundsConfig((old) => ({ ...old, isOpen: checked }))
    },
    [setHintSoundsConfig],
  )

  const toggleSound = useCallback(() => {
    setIsSoundOn(!isSoundOn)
  }, [setIsSoundOn, isSoundOn])

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <button className="my-btn-primary h-12 w-12 rounded-full" onClick={toggleSound} title="切换声音">
            {isSoundOn ? <SpeakerWaveIcon className="h-6 w-6" /> : <SpeakerXMarkIcon className="h-6 w-6" />}
          </button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-2 flex max-w-max -translate-x-1/2 px-4 ">
              <div className="shadow-upper box-border flex w-60 select-none flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 drop-shadow dark:bg-gray-800">
                <div className="flex w-full  flex-col  items-start gap-2 py-0">
                  <span className="text-sm font-normal leading-5 text-gray-900 dark:text-white dark:text-opacity-60">开关按键音</span>
                  <div className="flex w-full flex-row items-center justify-between">
                    <Switch checked={keySoundsConfig.isOpen} onChange={onChangeKeySound} className="switch-root">
                      <span aria-hidden="true" className="switch-thumb" />
                    </Switch>
                    <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                      keySoundsConfig.isOpen ? '开启' : '关闭'
                    }`}</span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start  gap-2 py-0">
                  <span className="text-sm font-normal leading-5 text-gray-900 dark:text-white dark:text-opacity-60">开关效果音</span>
                  <div className="flex w-full flex-row items-center justify-between">
                    <Switch checked={hintSoundsConfig.isOpen} onChange={onChangeHintSound} className="switch-root">
                      <span aria-hidden="true" className="switch-thumb" />
                    </Switch>
                    <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                      hintSoundsConfig.isOpen ? '开启' : '关闭'
                    }`}</span>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
