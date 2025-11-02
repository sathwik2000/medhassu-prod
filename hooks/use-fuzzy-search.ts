export function useFuzzySearch() {
  const search = <T extends Record<string, any>>(items: T[], query: string, fields: (keyof T)[]): T[] => {
    if (!query.trim()) return items

    const lowerQuery = query.toLowerCase()

    return items.filter((item) => {
      return fields.some((field) => {
        const value = item[field]
        if (!value) return false
        return String(value).toLowerCase().includes(lowerQuery)
      })
    })
  }

  return { search }
}
