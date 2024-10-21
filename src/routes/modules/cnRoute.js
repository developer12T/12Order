import Layout from '../../views/Layout.vue'

const orderRoutes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'cn',
                component: () => import('../../views/cn/cnMain.vue'),
                // meta: { mainRoute: true }
                meta: { breadcrumb: 'รายการคืน' }
            },
        ],
    },
    {
        path: '/cn',
        component: Layout,
        children: [
            {
                path: 'detail',
                component: () => import('../../views/cn/cnDetail.vue'),
                meta: { breadcrumb: 'รายละเอียด' }
            },
            {
                path: 'summary',
                component: () => import('../../views/cn/cnSummary.vue'),
                meta: { breadcrumb: 'ใบรับคืน' }
            },
            // {
            //     path: 'summaryAll',
            //     component: () => import('../../views/orders/orderSummaryAll.vue'),
            //     meta: { breadcrumb: 'ใบรวมสินค้า' }
            // }
        ],
    },
];

export default orderRoutes;