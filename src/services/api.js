// src/services/api.js
import dataJson from '@/data/dataBahanAjar.json'

export const DataService = {
  async getBahanAjarData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transformedData = {
          ...dataJson,
          tracking: this.transformTracking(dataJson.tracking)
        }
        resolve(transformedData)
      }, 100)
    })
  },

  transformTracking(trackingArray) {
    const trackingObj = {}
    trackingArray.forEach((item) => {
      const key = Object.keys(item)[0]
      trackingObj[key] = item[key]
    })
    return trackingObj
  },

  getStok() {
    return dataJson.stok
  },

  getTracking() {
    return this.transformTracking(dataJson.tracking)
  },

  getPaket() {
    return dataJson.paket
  },

  getPengirimanList() {
    return dataJson.pengirimanList
  }
}
