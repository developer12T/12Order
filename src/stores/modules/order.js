import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    isLoading: false,
    error: null,
    noData: false,
    orderCm: [],
    orderCmDetail: [],
    orderCmItem: [],
    orderSummary: [],
    orderSummaryAll: {
      list: [],
      totalList: {}
  }
  }),
  actions: {
    async getOrderCm(status) {
      this.isLoading = true
      this.error = null
      this.noData = false
      try {
        const response = await axios.get(import.meta.env.VITE_API_BASE_URL + '/sale/getOrderCm', {
          params: { status }
        })
        if (response.status === 204) {
          this.noData = true
          this.orderCm = []
        } else {
          this.orderCm = response.data
          return response.data
        }
        console.log('orderCm', this.orderCm)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async getOrderCmDetail(orderNo) {
      this.isLoading = true
      this.error = null
      this.noData = false
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/sale/getOrderCmDetail',
          {
            orderNo
          }
        )
        if (response.status === 204) {
          this.noData = true
          this.orderCmDetail = []
        } else {
          this.orderCmDetail = response.data[0]
          this.orderCmItem = response.data[0].list
        }
        console.log('orderCmDetail', this.orderCmDetail)
        console.log('item', this.orderCmItem)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async addOrder(order) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_ERP_BASE_URL + '/sale/addOrder',
          {
            order
          }
        )
        console.log('addOrder', response.data)
        return response.data
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async addOrderERP(order) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_ERP_BASE_URL + '/sale/addOrderErp',
          {
            order
          }
        )
        console.log('addOrderERP', response.data)
        return response.data
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
        throw error
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
    async summaryOrderAll(order) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/sale/summaryAll',
          order
        )
        this.orderSummaryAll = response.data
        console.log('summaryAll', response.data)
        console.log('summaryAll2', this.orderSummaryAll)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})