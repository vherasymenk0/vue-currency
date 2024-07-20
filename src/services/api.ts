import axios, { AxiosInstance } from 'axios'
import { CurrencyModel } from '@/types/currency.ts'

class ApiService {
  private axios: AxiosInstance

  constructor() {

    this.axios = axios.create({
      baseURL: 'https://bank.gov.ua/NBUStatService/v1/statdirectory',
      headers: {
        Accept: 'application/json'
      }
    })

    this.axios.interceptors.response.use(response => {
      if (typeof response.data === 'string') {
        try {
          response.data = JSON.parse(response.data)
        } catch (e) {
          console.error('Failed to parse JSON response', e)
        }
      }
      return response
    })
  }

  async getCurrentRates() {
    return this.axios.get<CurrencyModel[]>('/exchange', { params: { json: true } })
  }

  async getRateByCode(code: string, date: string) {
    return this.axios.get<CurrencyModel[]>('/exchange', {
      params: {
        valcode: code.toUpperCase(),
        date,
        json: true
      }
    })
  }
}

export const Api = new ApiService()
