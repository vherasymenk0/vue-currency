import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { CurrencyModel } from '@/types/currency.ts'

type ResponseData<TData> = Promise<AxiosResponse<TData>>

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

  async getCurrentRates(): ResponseData<CurrencyModel[]> {
    return this.axios.get('/exchange', { params: { json: true } })
  }

  async getRateByCode(code: string, date: string): ResponseData<CurrencyModel[]> {
    return this.axios.get('/exchange', {
      params: { valcode: code, date, json: true }
    })
  }

  async getRateByDate(date: string): ResponseData<CurrencyModel[]> {
    return this.axios.get('/exchange', {
      params: { date, json: true }
    })
  }
}

export const Api = new ApiService()
