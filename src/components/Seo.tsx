import { useEffect } from 'react'

export default function Seo({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    if (!description) return
    let el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'description')
      document.head.appendChild(el)
    }
    el.setAttribute('content', description)
  }, [description])

  return null
}