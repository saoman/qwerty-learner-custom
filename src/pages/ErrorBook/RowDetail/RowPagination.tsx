import { currentRowDetailAtom } from '../store'
import type { groupedWordRecords } from '../type'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

type IRowPaginationProps = {
  className?: string
  allRecords: groupedWordRecords[]
}

export const ITEM_PER_PAGE = 20

const RowPagination: FC<IRowPaginationProps> = ({ className, allRecords }) => {
  const [currentRowDetail, setCurrentRowDetail] = useAtom(currentRowDetailAtom)
  const currentIndex = useMemo(() => {
    if (!currentRowDetail) return -1
    return allRecords.findIndex((record) => record.word === currentRowDetail.word && record.dict === currentRowDetail.dict)
  }, [currentRowDetail, allRecords])

  const nextRowDetail = useCallback(() => {
    if (!currentRowDetail) return

    const index = currentIndex
    if (index === -1) return
    const nextIndex = index + 1
    if (nextIndex >= allRecords.length) return
    setCurrentRowDetail(allRecords[nextIndex])
  }, [currentRowDetail, currentIndex, allRecords, setCurrentRowDetail])

  const prevRowDetail = useCallback(() => {
    if (!currentRowDetail) return

    const index = currentIndex
    if (index === -1) return
    const prevIndex = index - 1
    if (prevIndex < 0) return
    setCurrentRowDetail(allRecords[prevIndex])
  }, [currentRowDetail, currentIndex, setCurrentRowDetail, allRecords])

  useHotkeys(
    'left',
    (e) => {
      prevRowDetail()
      e.stopPropagation()
    },
    {
      preventDefault: true,
    },
  )

  useHotkeys(
    'right',
    (e) => {
      nextRowDetail()
      e.stopPropagation()
    },
    {
      preventDefault: true,
    },
  )

  return (
    <div className={`-gap-1 flex select-none items-center ${className}`}>
      <button className="my-btn-primary h-12 w-12 rounded-full" onClick={prevRowDetail} title="上一页">
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <span className="text-sm text-black dark:text-white">{`${currentIndex + 1} / ${allRecords.length}`}</span>
      <button className="my-btn-primary h-12 w-12 rounded-full" onClick={nextRowDetail} title="下一页">
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  )
}

export default RowPagination
