export const getCurrencySlug = (code: string, date: string) => {
  const currencyCode = code.toLowerCase()
  const currencyDate = date.split('.').reverse().join('')

  return `${currencyCode}-${currencyDate}`
}

export const slugDateToDate = (date: string) => {
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)
  return `${day}.${month}.${year}`
}
