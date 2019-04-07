import axios from 'axios'

const API_BASE_URL = 'https://api.exchangeratesapi.io/latest'

export function getRates(base) {
  return axios.get(API_BASE_URL, {
    params: {
      base
    }
  })
    .then(res => {
      const { data } = res,
        currencyList = []

      currencyList.push({
        name: data.base,
        value: 1
      })

      for (let rate in data.rates) {
        currencyList.push({
          name: rate,
          value: data.rates[rate]
        })
      }

      return currencyList

    }).catch(function (err) {
      console.log(err);
    })
}

export function getExchangeRates(base, target) {
  return axios.get(API_BASE_URL, {
    params: {
      base,
      symbols: target
    }
  })
    .then(res => {
      const { data } = res
      return data.rates[target]
    })
}