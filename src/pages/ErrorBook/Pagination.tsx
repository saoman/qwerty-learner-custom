import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import type { FC } from 'react'
import { useCallback } from 'react'

type IPaginationProps = {
  className?: string
  page: number
  setPage: (page: number) => void
  totalPages: number
}

export const ITEM_PER_PAGE = 20

const Pagination: FC<IPaginationProps> = ({ className, page, setPage, totalPages }) => {
  const nextPage = useCallback(() => {
    setPage(page + 1)
  }, [page, setPage])

  const prevPage = useCallback(() => {
    setPage(page - 1)
  }, [page, setPage])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button className="my-btn-primary h-12 w-12 rounded-full" onClick={prevPage} title={t('上一页')}>
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <span className="text-black dark:text-white">{`${page} / ${totalPages}`}</span>
      <button className="my-btn-primary h-12 w-12 rounded-full" onClick={nextPage} title={t('下一页')}>
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  )
}

export default Pagination
