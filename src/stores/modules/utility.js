import { defineStore } from 'pinia';

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
      const search = state.searchText.toLowerCase();
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
});
