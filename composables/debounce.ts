function debounce<T extends unknown[]>(fn: (...args: T) => void, delay = 0, immediate = false) {
  let timeout: NodeJS.Timeout
  return (...args: T) => {
    if (immediate && !timeout) fn(...args)
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

function useDebouncedRef(initialValue: string, delay: number, immediate = false) {
  const state = ref(initialValue)
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: debounce(
      (value: unknown) => {
        state.value = value as string
        trigger()
      },
      delay,
      immediate
    ),
  }))
  return debouncedRef
}

export default useDebouncedRef