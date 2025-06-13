import { TypingContext, TypingStateActionType } from '../../store'
import AnalysisButton from '../AnalysisButton'
import ErrorBookButton from '../ErrorBookButton'
import HandPositionIllustration from '../HandPositionIllustration'
import LoopWordSwitcher from '../LoopWordSwitcher'
import Setting from '../Setting'
import SoundSwitcher from '../SoundSwitcher'
import WordDictationSwitcher from '../WordDictationSwitcher'
import Tooltip from '@/components/Tooltip'
import { isOpenDarkModeAtom } from '@/store'
import { CTRL } from '@/utils'
import { LanguageIcon, NoSymbolIcon } from '@heroicons/react/24/outline'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'
import { useCallback, useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTranslation } from 'react-i18next'

export default function Switcher() {
  const [isOpenDarkMode, setIsOpenDarkMode] = useAtom(isOpenDarkModeAtom)
  const { state, dispatch } = useContext(TypingContext) ?? {}
  const { t } = useTranslation()

  const changeDarkModeState = () => {
    setIsOpenDarkMode((old) => !old)
  }

  const changeTransVisibleState = () => {
    if (dispatch) {
      dispatch({ type: TypingStateActionType.TOGGLE_TRANS_VISIBLE })
    }
  }

  useHotkeys(
    'ctrl+shift+v',
    () => {
      changeTransVisibleState()
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  return (
    <div className="flex items-center justify-center gap-2">
      <Tooltip content="音效设置">
        <SoundSwitcher />
      </Tooltip>

      <Tooltip className="h-7 w-7" content="设置单个单词循环">
        <LoopWordSwitcher />
      </Tooltip>

      <Tooltip className="h-7 w-7" content={`开关默写模式（${CTRL} + V）`}>
        <WordDictationSwitcher />
      </Tooltip>
      <Tooltip className="h-7 w-7" content={`开关释义显示（${CTRL} + Shift + V）`}>
        <button
          className={`p-[2px] ${state?.isTransVisible ? 'text-indigo-500' : 'text-gray-500'} text-lg focus:outline-none`}
          type="button"
          onClick={(e) => {
            changeTransVisibleState()
            e.currentTarget.blur()
          }}
          aria-label={`开关释义显示（${CTRL} + Shift + V）`}
        >
          {state?.isTransVisible ? <LanguageIcon className="h-6 w-6" /> : <NoSymbolIcon className="h-6 w-6" />}
        </button>
      </Tooltip>

      <Tooltip content="错题本">
        <ErrorBookButton />
      </Tooltip>

      <Tooltip className="h-7 w-7" content="查看数据统计">
        <AnalysisButton />
      </Tooltip>

      <Tooltip className="h-7 w-7" content="开关深色模式">
        <button className="my-btn-primary h-12 w-12 rounded-full" onClick={changeDarkModeState} title={t('切换深色模式')}>
          {isOpenDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
      </Tooltip>
      <Tooltip className="h-7 w-7" content="指法图示">
        <HandPositionIllustration></HandPositionIllustration>
      </Tooltip>
      <Tooltip content="设置">
        <Setting />
      </Tooltip>
    </div>
  )
}
