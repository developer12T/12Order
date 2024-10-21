import { defineStore } from 'pinia'
import axios from 'axios'

export const useCnStore = defineStore('cn', {
  state: () => ({
    isLoading: false,
    error: null,
    noData: false,
    orderCnCm: [],
    orderCnCmDetail: [],
    orderCnCmItem: [],
  }),
  actions: {
    async getCnOrderCm(status) {
      this.isLoading = true
      this.error = null
      this.noData = false
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_BASE_URL + '/cn/getCnOrderCm',
          {
            params: { status }
          })
        if (response.status === 204) {
          this.noData = true
          this.orderCnCm = []
        } else {
          this.orderCnCm = response.data
        }
        console.log('CnOrderCm', this.orderCnCm)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async getCnOrderCmDetail(orderNo) {
      this.isLoading = true
      this.error = null
      this.noData = false
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cn/getCnOrderCmDetail',
          {
            orderNo
          }
        )
        if (response.status === 204) {
          this.noData = true
          this.orderCnCmDetail = []
        } else {
          this.orderCnCmDetail = response.data[0]
          this.orderCnCmItem = response.data[0].list
        }
        console.log('CnorderCmDetail', this.orderCnCmDetail)
        console.log('item', this.orderCnCmItem)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async summaryOrder(order) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/sale/summaryOrder',
          order
        )
        this.orderSummary = response.data
        console.log('summary', response.data)
        console.log('summary2', this.orderSummary)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async addCnOrder(order) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_ERP_BASE_URL + '/cn/createCnOrder',
          {
            order
          }
        )
        console.log('addCn', response.data)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async addCnErp(order) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_ERP_BASE_URL + '/cn/createOrder',
          {
            order
          }
        )
        console.log('addCn', response.data)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})