type UseCountDownProps = {
  enabled: boolean;
  seconds: number;
  callback: () => void;
  clearCallback: () => void;
};

export const useCountDown = ({
  enabled,
  seconds,
  callback,
  clearCallback
}: UseCountDownProps) => {
  const secondsToStart = ref(seconds)
  const countDownInterval = ref<NodeJS.Timer | null>(null)

  watchEffect(() => {
    if (enabled) {
      countDownInterval.value = setInterval(() => {
        if (secondsToStart.value > -1) {
          secondsToStart.value--
        } else {
          callback()
        }
      }, 1000)
    }
  })

  onBeforeUnmount(() => {
    if (countDownInterval.value) {
      clearCallback()
      clearInterval(countDownInterval.value)
    }
  })

  return secondsToStart
}
