import { LoadingUI } from '@/components/Loading'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import type { FC } from 'react'

type LoadingWordUIProps = {
  className?: string
  isLoading: boolean
  hasError: boolean
}

export const LoadingWordUI: FC<LoadingWordUIProps> = ({ className, isLoading, hasError }) => {
  return (
    <div className={`${className}`}>
      {hasError ? (
        <div className="tooltip !bg-transparent" data-tip="数据加载失败">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
        </div>
      ) : (
        isLoading && <LoadingUI />
      )}
    </div>
  )
}
