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
    setSummary:[],
    setSummaryAll:[],
    orderSummary: [], 
    orderSummaryAll: [], 
  }),
  actions: {
    async getOrderCm() {
      this.isLoading = true
      this.error = null
      this.noData = false
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_BASE_URL + '/getOrderCm'
        );
        if (response.status === 204) {
          this.noData = true
          this.orderCm = []
        } else {
          this.orderCm = response.data
        }
        console.log('orderCm', this.orderCm)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error);
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
          import.meta.env.VITE_API_BASE_URL + '/getOrderCmDetail',
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
        console.error(error);
      } finally {
        this.isLoading = false
      }
    },
    async addOrderErp(order) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_ERP_BASE_URL + '/createOrder',
          {
            order
          }
        )
        console.log('addOrder', response.data)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error);
      } finally {
        this.isLoading = false
      }
    },
    setSummaryOrders(order) {
      this.setSummary = order
      console.log('set', this.setSummary)
    },
    setSummaryOrdersAll(order) {
      this.setSummaryAll = order
      console.log('set', this.setSummaryAll)
    },
    async summaryOrder() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/summaryOrder',
          this.setSummary
        )
        this.orderSummary = response.data
        console.log('summary', response.data)
        console.log('summary2', this.orderSummary)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error);
      } finally {
        this.isLoading = false
      }
    },
    async summaryOrderAll(order) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/summaryAll',
          order
        )
        this.orderSummaryAll = response.data
        console.log('summaryAll', response.data)
        console.log('summaryAll2', this.orderSummaryAll)
      } catch (error) {
        this.error = error.message || 'Error fetching orders'
        console.error(error);
      } finally {
        this.isLoading = false
      }
    },
  },
  persist: true 
})