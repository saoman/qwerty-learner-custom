import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import type { FC } from 'react'
import { useCallback } from 'react'

export type ITipAlert = {
  className?: string
  show: boolean
  setShow: (show: boolean) => void
}

export const TipAlert: FC<ITipAlert> = ({ className, show, setShow }) => {
  const onClose = useCallback(() => {
    setShow(false)
  }, [setShow])

  return (
    <>
      {show && (
        <div className={`alert z-10 w-fit cursor-pointer pr-5 ${className}`} onClick={onClose}>
          <Alert variant="destructive" className="relative">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-yellow-500">插件冲突！</span>
            </div>
            <AlertTitle>插件冲突！</AlertTitle>
            <AlertDescription>如果多次输入失败，可能是与本地浏览器插件冲突，请关闭相关插件或切换浏览器试试</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  )
}
