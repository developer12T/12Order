import {
  defineStore
} from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    isLoading: false,
    error: null,
    noData: false,
    orderCm: [],
    orderCmDetail: [],
    orderCmItem: [],
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
          this.orderCmDetail = response.data
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
  }
})