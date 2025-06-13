import SharePicDialog from './SharePicDialog'
import { recordShareAction } from '@/utils'
import { ShareIcon } from '@heroicons/react/24/solid'
import { useCallback, useMemo, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function ShareButton() {
  const [isShowSharePanel, setIsShowSharePanel] = useState(false)

  const randomChoose = useMemo(
    () => ({
      picRandom: Math.random(),
      promoteRandom: Math.random(),
    }),
    [],
  )

  const onClickShare = useCallback(() => {
    recordShareAction('open')
    setIsShowSharePanel(true)
  }, [])

  return (
    <>
      {isShowSharePanel && <SharePicDialog showState={isShowSharePanel} setShowState={setIsShowSharePanel} randomChoose={randomChoose} />}

      <button className="my-btn-primary h-12 w-12 rounded-full" onClick={onClickShare} title="分享你的成绩给朋友">
        <ShareIcon className="h-6 w-6" />
      </button>
    </>
  )
}
