/* eslint-disable react/prop-types */
import { LoadingWordUI } from '../LoadingWordUI'
import useGetWord from '../hooks/useGetWord'
import { currentRowDetailAtom } from '../store'
import type { groupedWordRecords } from '../type'
import DataTag from './DataTag'
import RowPagination from './RowPagination'
import type { WordPronunciationIconRef } from '@/components/WordPronunciationIcon'
import { WordPronunciationIcon } from '@/components/WordPronunciationIcon'
import Phonetic from '@/pages/Typing/components/WordPanel/components/Phonetic'
import Letter from '@/pages/Typing/components/WordPanel/components/Word/Letter'
import { idDictionaryMap } from '@/resources/dictionary'
import { ChartPieIcon, CheckCircleIcon, ClockIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useSetAtom } from 'jotai'
import { useCallback, useMemo, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTranslation } from 'react-i18next'

type RowDetailProps = {
  currentRowDetail: groupedWordRecords
  allRecords: groupedWordRecords[]
}

const RowDetail: React.FC<RowDetailProps> = ({ currentRowDetail, allRecords }) => {
  const setCurrentRowDetail = useSetAtom(currentRowDetailAtom)
  const { t } = useTranslation()

  const dictInfo = idDictionaryMap[currentRowDetail.dict]
  const { word, isLoading, hasError } = useGetWord(currentRowDetail.word, dictInfo)
  const wordPronunciationIconRef = useRef<WordPronunciationIconRef>(null)

  const rowDetailData: RowDetailData = useMemo(() => {
    const time =
      currentRowDetail.records.length > 0
        ? currentRowDetail.records.reduce((acc, cur) => acc + cur.totalTime, 0) / currentRowDetail.records.length
        : 0
    const timeStr = (time / 1000).toFixed(2)
    const correctCount = currentRowDetail.records.length
    const wrongCount = currentRowDetail.wrongCount
    const sumCount = correctCount + wrongCount
    return { time: timeStr, sumCount, correctCount, wrongCount }
  }, [currentRowDetail.records, currentRowDetail.wrongCount])

  const onClose = useCallback(() => {
    setCurrentRowDetail(null)
  }, [setCurrentRowDetail])

  useHotkeys(
    'esc',
    (e) => {
      onClose()
      e.stopPropagation()
    },
    { preventDefault: true },
  )

  useHotkeys(
    'ctrl+j',
    () => {
      wordPronunciationIconRef.current?.play()
    },
    [],
    { enableOnFormTags: true, preventDefault: true },
  )

  return (
    <div className="absolute inset-0 flex  flex-col items-center  justify-center ">
      <div className="my-card relative z-10 flex h-[32rem] min-w-[26rem] select-text flex-col items-center justify-around rounded-2xl bg-white px-3 py-10 dark:bg-gray-900">
        <button className="my-btn-primary h-12 w-12 rounded-full" onClick={onClose} title={t('关闭')}>
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="flex flex-col items-center justify-start">
          <div>
            {currentRowDetail.word.split('').map((t, index) => (
              <Letter key={`${index}-${t}`} letter={t} visible state="normal" />
            ))}
          </div>
          <div className="relative flex h-8 items-center">
            {word ? <Phonetic word={word} /> : <LoadingWordUI isLoading={isLoading} hasError={hasError} />}
            {word && (
              <WordPronunciationIcon
                lang={dictInfo.language}
                word={word}
                className="absolute -right-7 top-1/2 h-5 w-5 -translate-y-1/2 transform "
                ref={wordPronunciationIconRef}
              />
            )}
          </div>
          <div className="flex max-w-[24rem] items-center">
            <span className={`max-w-4xl text-center font-sans transition-colors duration-300 dark:text-white dark:text-opacity-80`}>
              {word ? word.trans.join('；') : <LoadingWordUI isLoading={isLoading} hasError={hasError} />}
            </span>
          </div>
        </div>
        <div className="item flex flex-col gap-4">
          <div className="flex gap-6">
            <DataTag icon={ClockIcon} name="平均用时" data={rowDetailData.time} />
            <DataTag icon={ChartPieIcon} name="练习次数" data={rowDetailData.sumCount} />
          </div>
          <div className="flex gap-6">
            <DataTag icon={CheckCircleIcon} name="正确次数" data={rowDetailData.correctCount} />
            <DataTag icon={XCircleIcon} name="错误次数" data={rowDetailData.wrongCount} />
          </div>
        </div>
        <RowPagination className="absolute bottom-6 mt-10" allRecords={allRecords} />
      </div>
      <div className="absolute inset-0 z-0  cursor-pointer bg-transparent" onClick={onClose}></div>
    </div>
  )
}

type RowDetailData = {
  time: string
  sumCount: number
  correctCount: number
  wrongCount: number
}

export default RowDetail
