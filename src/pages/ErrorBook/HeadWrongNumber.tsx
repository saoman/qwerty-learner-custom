import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import type { FC } from 'react'
import { useCallback } from 'react'

type IHeadWrongNumberProps = {
  className?: string
  sortType: ISortType
  setSortType: (sortType: ISortType) => void
}

export type ISortType = 'asc' | 'desc' | 'none'

const HeadWrongNumber: FC<IHeadWrongNumberProps> = ({ className, sortType, setSortType }) => {
  const onClick = useCallback(() => {
    const sortTypes: Record<ISortType, ISortType> = {
      asc: 'desc',
      desc: 'none',
      none: 'asc',
    }
    setSortType(sortTypes[sortType])
  }, [setSortType, sortType])

  return (
    <span className={`relative cursor-pointer ${className}`} onClick={onClick}>
      错误次数
      <div className="absolute -right-2 bottom-0 top-0 flex flex-col items-center justify-center text-[12px]">
        <button className="my-btn-primary h-12 w-12 rounded-full" onClick={onClick} title="排序">
          {sortType === 'asc' ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
        </button>
      </div>
    </span>
  )
}

export default HeadWrongNumber
