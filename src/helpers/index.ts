export const getCurrencySlug = (code: string, date: string) => {
  const currencyCode = code.toLowerCase()
  const currencyDate = date.split('.').reverse().join('')

  return `${currencyCode}-${currencyDate}`
}
