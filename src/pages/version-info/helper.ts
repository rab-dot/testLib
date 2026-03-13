import { isString } from '@/shared/lib'

type MarkdownElement = {
  type: string
  value: any
  position: any
}

const actionDict: { [key: string]: string } = {
  FEATURES: '🚀',
  REFACTORS: '🛠️',
  'BUG FIXES': '🐛',
  CHORES: '🪄',
  'OTHER CHANGES': '🔧',
  ENHANCEMENTS: '✨',
  'PROJECT INITIALIZATION': '🏁',
}

export const formatVersionHeader = (node: any) => {
  const children = node.children || []
  let fullValue = ''

  children.forEach((child: any) => {
    if (child.type === 'text') {
      fullValue += child.value
    } else if (child.children?.[0]?.value) {
      // Handle links: [version](link)
      fullValue += child.children[0].value
    }
  })

  // Regex to match: [version] (date) or version (date) or [version] or version
  const versionMatch = fullValue.match(/v?(\d+\.\d+\.\d+)/)
  const dateMatch = fullValue.match(/\((\d{4}-\d{2}-\d{2})\)/)

  const version = versionMatch ? versionMatch[1] : 'Unknown'
  const data = dateMatch ? dateMatch[1] : ''

  return { version, data }
}

export const formatActionsType = (node: any) => {
  const rawValue = node.children?.[0] as MarkdownElement
  const upperCaseValue = rawValue?.value?.toUpperCase()

  return actionDict[upperCaseValue] || ''
}

export const getVesionsStrings = (rawString?: string) => {
  if (!isString(rawString)) return []

  const versionBlocks = rawString.split(/^## /m).filter(Boolean)

  return versionBlocks
    .map((block) => {
      const firstLine = block.split('\n')[0]
      // Extract version: [1.0.0] or 1.0.0 or v1.0.0
      const versionMatch = firstLine.match(/v?(\d+\.\d+\.\d+)/)
      // Extract date: (2026-03-12)
      const dateMatch = firstLine.match(/\((\d{4}-\d{2}-\d{2})\)/)

      if (versionMatch) {
        return {
          versionNumber: versionMatch[1],
          versionDate: dateMatch ? dateMatch[1] : '',
        }
      }
      return null
    })
    .filter(
      (v): v is { versionNumber: string; versionDate: string } => v !== null
    )
}

export const getVersionAnchor = (item: string) => {
  if (!isString(item)) return ''
  return `#${item}`
}
