import Layout from '../../views/Layout.vue'

const orderRoutes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'order',
                component: () => import('../../views/orders/orderMain.vue'),
                // meta: { mainRoute: true }
                meta: { breadcrumb: 'รายการขาย' }
            },
        ],
    },
    {
        path: '/order',
        component: Layout,
        children: [
            {
                path: 'detail',
                component: () => import('../../views/orders/orderDetail.vue'),
                meta: { breadcrumb: 'รายละเอียด' }
            }
        ],
    },
];

export default orderRoutes;