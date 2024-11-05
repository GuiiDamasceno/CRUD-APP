'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

export function SearchInput({
  children,
  placeholder,
  type,
}: {
  children: React.ReactNode
  placeholder: string
  type: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(searchParams.get('q') ?? '')

  const handleSearch = useCallback(
    (term: string) => {
      setValue(term)

      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (term) {
          params.set('q', term)
        } else {
          params.delete('q')
        }

        router.push(`/?${params.toString()}`)
      })
    },
    [router, searchParams],
  )

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q') ?? ''}
        className="w-full rounded-lg border bg-transparent border-zinc-300 px-3 py-2 pl-10 text-zinc-800"
      />
      <div className="absolute left-3 top-2.5 text-zinc-500">{children}</div>
      {isPending && (
        <div className="absolute right-3 top-2.5 text-zinc-500">
          Buscando...
        </div>
      )}
    </div>
  )
}
