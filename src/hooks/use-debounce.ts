import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // quando il valore cambia, programmo un aggiornamento
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    // quando il “valore” cambia di nuovo prima che scada il timer, si cancella il timer precedente
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
