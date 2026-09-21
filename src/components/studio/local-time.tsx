'use client'

import { useEffect, useState } from 'react'

export function LocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date())
      )
    }
    update()
    const timer = window.setInterval(update, 20_000)
    return () => window.clearInterval(timer)
  }, [])

  return <span>{time}</span>
}
