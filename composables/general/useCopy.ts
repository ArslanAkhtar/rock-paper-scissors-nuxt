import { useClipboard, usePermission } from '@vueuse/core'

export const useCopy = () => {
  const { isSupported, ...clipboardData } = useClipboard()
  const permissionWrite = usePermission('clipboard-write')
  const copy = (value: string) => {
    if (permissionWrite.value === 'prompt') {
      clipboardData.copy(value)
    }
  }

  return {
    isSupported,
    copy
  }
}
