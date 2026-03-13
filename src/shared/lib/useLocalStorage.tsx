import React from 'react'

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = React.useState<T>(() => {
    const jsonValue = localStorage.getItem(key)

    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    }
    return initialValue
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))

    // Dispatch custom event for same-window updates
    window.dispatchEvent(
      new CustomEvent('local-storage', {
        detail: { key, value },
      })
    )
  }, [key, value])

  React.useEffect(() => {
    // Listen for changes from other components in the same window
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.key === key) {
        setValue(customEvent.detail.value)
      }
    }

    // Listen for changes from other tabs/windows
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === key && e.newValue != null) {
        setValue(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('local-storage', handleStorageChange)
    window.addEventListener('storage', handleStorageEvent)

    return () => {
      window.removeEventListener('local-storage', handleStorageChange)
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [key])

  return [value, setValue] as [typeof value, typeof setValue]
}
