import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/HomeView' },
        { path: '/HomeView', name: 'HomeView', component: () => import('./components/HomeView.vue') },
        {path:'/Me',name:'Me',component:()=>import('./components/Me.vue')},
        {path:'/MyAddress',name:'MyAddress',component:()=>import('./components/MyAddress.vue')},
        {path:'/goodsclass',name:'goodsclass',component:()=>import('./components/goodsclass.vue'),
            children:[
                {path:'beclassgoods/:classname',name:'beclassgoods',props:true,component:()=>import('./components/pages/Beclassgoods.vue')},
              
            ]

        },
       {path:'/car',name:'car',props:true,component:()=>import('./components/Car.vue')},
       {path:'/paypage',name:'paypage',component:()=>import('./components/paypage.vue')},
       {path:'/gooddetail',name:'gooddetail',component:()=>import('./components/gooddetail.vue')},
       {path:'/mybuy',name:'mybuy',component:()=>import('./components/mybuy.vue')},
       {path:'/searchdetail',name:'searchdetail',component:()=>import('./components/searchdetail.vue')},
    ]
})




export default router