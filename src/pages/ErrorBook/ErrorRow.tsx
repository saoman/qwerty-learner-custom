import { LoadingWordUI } from './LoadingWordUI'
import useGetWord from './hooks/useGetWord'
import { currentRowDetailAtom } from './store'
import type { groupedWordRecords } from './type'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { idDictionaryMap } from '@/resources/dictionary'
import { recordErrorBookAction } from '@/utils'
import { TrashIcon } from '@heroicons/react/24/solid'
import { useSetAtom } from 'jotai'
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'

type IErrorRowProps = {
  record: groupedWordRecords
  onDelete: () => void
  onWordUpdate: (word: any) => void
}

const ErrorRow: FC<IErrorRowProps> = ({ record, onDelete, onWordUpdate }) => {
  const setCurrentRowDetail = useSetAtom(currentRowDetailAtom)
  const dictInfo = idDictionaryMap[record.dict]
  const { word, isLoading, hasError } = useGetWord(record.word, dictInfo)
  const prevWordRef = useRef<any>()
  const stableWord = useMemo(() => word, [word])

  const onClick = useCallback(() => {
    setCurrentRowDetail(record)
    recordErrorBookAction('detail')
  }, [record, setCurrentRowDetail])

  useEffect(() => {
    if (stableWord && stableWord !== prevWordRef.current) {
      onWordUpdate(stableWord)
      prevWordRef.current = stableWord
    }
  }, [stableWord, onWordUpdate])

  return (
    <li
      className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white px-6 py-3 text-black opacity-85 shadow-md dark:bg-gray-800 dark:text-white"
      onClick={onClick}
    >
      <span className="basis-2/12 break-normal">{record.word}</span>
      <span className="basis-6/12 break-normal">
        {word ? word.trans.join('；') : <LoadingWordUI isLoading={isLoading} hasError={hasError} />}
      </span>
      <span className="basis-1/12 break-normal pl-8">{record.wrongCount}</span>
      <span className="basis-1/12 break-normal">{dictInfo?.name}</span>
      <span
        className="basis-1/12 break-normal"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="my-btn-primary h-12 w-12 rounded-full" onClick={onDelete} title={t('删除')}>
                <TrashIcon className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Records</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </li>
  )
}

export default ErrorRow
