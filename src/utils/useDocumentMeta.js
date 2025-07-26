import { useEffect } from 'react'

export function useDocumentMeta({ title, description, themeColor }) {
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])

  useEffect(() => {
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
      }
      metaDescription.content = description
    }
  }, [description])

  useEffect(() => {
    if (themeColor) {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.name = 'theme-color'
        document.head.appendChild(metaThemeColor)
      }
      metaThemeColor.content = themeColor
    }
  }, [themeColor])
}