export interface CurrencyModel {
  r030: number
  txt: string
  rate: number
  cc: string
  exchangedate: string
}

export interface EditCurrency extends CurrencyModel {
  alreadyModified?: boolean
}
