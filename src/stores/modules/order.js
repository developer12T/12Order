import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore('orders', {
    state: () => ({
        orderCms : []
    }),
    actions: {
        async getOrderCms() {
            try {
              //   const token = JSON.parse(localStorage.getItem('token'));
              const area = localStorage.getItem('area');
              const response = await axios.post(
                import.meta.env.VITE_API_BASE_URL + '/',
                {
                  area: area
                }
                // {
                //   headers: { Authorization: `Bearer ${token}` },
                // }
              );
              if (response.status === 204) {
                this.noData = true;
              } else {
                this.noData = false;
                this.orderMain = response.data;
              }
              console.log('orderMain', this.orderMain);
              console.log('status', response.data);
            } catch (error) {
              console.error(error);
            }
          },
    }
})