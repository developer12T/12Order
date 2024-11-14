import { defineStore } from 'pinia'
import axios from 'axios'

export const useUtilityStore = defineStore('utility', {
  state: () => ({
    searchText: '',
    searchData: [],
    orderNo: localStorage.getItem('orderNo'),
    summary: localStorage.getItem('summary'),
    summaryAll: localStorage.getItem('summaryAll'),
    cnNo: localStorage.getItem('cnNo')
  }),
  getters: {
    filteredData(state) {
      const search = state.searchText ? state.searchText.toLowerCase() : ''
      if (!search) {
        return state.searchData
      }
      return state.searchData.filter(item =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(search)
      );
    },
  },
  actions: {
    async insertLog(order) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/log',
          order
        )
        console.log('log', response.data)
      } catch (error) {
        console.error(error)
      } 
    }
  }
});
