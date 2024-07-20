import { CurrencyModel } from '@/types/currency.ts'
import { ref } from 'vue'

const MODIFIED_KEY = 'modified'

export const useModifiedCurrencies = () => {
  const stringData = localStorage.getItem(MODIFIED_KEY) || '[]'
  const modifiedData = ref(JSON.parse(stringData) as CurrencyModel[])

  const set = (data: CurrencyModel) => {
    modifiedData.value.push(data)
    localStorage.setItem(MODIFIED_KEY, JSON.stringify(modifiedData.value))
  }

  const update = (data: CurrencyModel) => {
    modifiedData.value = modifiedData.value.map((item) => {
      if (item.r030 === data.r030) item.rate = data.rate
      return item
    })

    localStorage.setItem(MODIFIED_KEY, JSON.stringify(modifiedData.value))
  }

  const remove = (id: number) => {
    modifiedData.value = modifiedData.value.filter((item) => item.r030 !== id)
    localStorage.setItem(MODIFIED_KEY, JSON.stringify(modifiedData.value))
  }

  return { data: modifiedData, set, update, remove }
}
