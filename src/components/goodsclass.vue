<template>


    <!-- 粘性+van-nav-bar -->
    <van-sticky>
        <van-nav-bar title="分类" left-text="返回" left-arrow @click-left="onClickLeft" style="height: 50px;" />
    </van-sticky>

    <!-- sidebar -->

    <div style="display: flex;">

        <van-sticky :offset-top="50">
            <van-sidebar v-model="sidebaractive" style="overflow: auto;">
                <van-sidebar-item title="全部"  @click="trangood('全部')" />
                <van-sidebar-item title="美妆百货" @click="trangood('美妆百货')" />
                <van-sidebar-item title="酒水饮料" @click="trangood('酒水饮料')" />
                <van-sidebar-item title="家电科技" @click="trangood('家电科技')" />
                <van-sidebar-item title="休闲服饰" @click="trangood('休闲服饰')" />
                <van-sidebar-item title="时令水果" @click="trangood('时令水果')" />
                <van-sidebar-item title="海鲜水产" @click="trangood('海鲜水产')" />
                <van-sidebar-item title="肉禽蛋品" @click="trangood('肉禽蛋品')" />
                <van-sidebar-item title="新鲜蔬菜" @click="trangood('新鲜蔬菜')" />
               

            </van-sidebar>
        </van-sticky>

        <!-- 内容 -->
        <div style="flex: 1;">
            <!-- <RouterView></RouterView> -->
            <goodslist :list="gdate" />
        </div>
    </div>



    <!-- Tabbar -->
    <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" :to="{ name: 'HomeView' }">
            <router-link :to="{ name: 'HomeView' }" style="color: black;">主页</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="apps-o" :to="{ name: 'goodsclass' }">
            <router-link :to="{ name: 'goodsclass' }" style="color: black;">分类</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="fire-o" badge="Hot" :to="{ name: 'mybuy' }">我的订单</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" :to="{ name: 'car' }" :badge="badge">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" :to="{ name: 'Me' }">
            <router-link :to="{ name: 'Me' }" style="color: black;">我的</router-link>
        </van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref, reactive, inject, provide, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import request from "../axios/request.js"
import goodslist from './Goodslist.vue'
import { useStore } from 'vuex'
const active = ref(1)
const sidebaractive = ref(0)
const router = useRouter()
const store = useStore()
const gdate = ref()
const badge = ref(0)


//挂载时或获取allgoods.json
onMounted(() => {
    window.scrollTo(0, 0);
    request({
        url: "/mock/getAllGoods",
        method: "get"
    }).then(res => {
        console.log(res)
        gdate.value = res.data.data
        console.log('gate====现在', gdate.value)
    })
    if (store.state.isLogin == true) {


        badge.value = store.state.newcustomer.want.length

    }
})


//点击tabbar 可以获取到不同的json数据
const trangood = (classname) => {
    if (classname == '酒水饮料') {

        request({
            url: "/mock/getdrinkgoods",
            method: "get"
        }).then(res => {
            console.log('res====酒水', res)

            gdate.value = res.data.data
            console.log('gate====酒水', gdate.value)
        })
    } else if (classname == '时令水果') {
        request({
            url: "/mock/getfruitgoods",
            method: "get"
        }).then(res => {
            console.log('res====时令水果', res)

            gdate.value = res.data.data
            console.log('gate====时令水果', gdate.value)
        })
    } else if (classname == '海鲜水产') {

        request({
            url: "/mock/getseafoodgoods",
            method: "get"
        }).then(res => {
            console.log('res====海鲜水产', res)

            gdate.value = res.data.data
            console.log('gate====海鲜水产', gdate.value)
        })
    } else if (classname == '美妆百货') {
        request({
            url: "/mock/getladylover",
            method: "get"
        }).then(res => {
            console.log('res====美妆百货', res)

            gdate.value = res.data.data
            console.log('gate====美妆百货', gdate.value)
        })
    } else if (classname == '全部') {
        request({
            url: "/mock/getAllGoods",
            method: "get"
        }).then(res => {
            console.log(res)
            gdate.value = res.data.data
            console.log('gate====现在', gdate.value)
        })
    }else if(classname=='家电科技'){
        request({
            url: "/mock/getelectric",
            method: "get"
        }).then(res => {
            console.log(res)
            gdate.value = res.data.data
            console.log('gate====家电科技', gdate.value)
        })
    }else if(classname == '休闲服饰'){
        request({
            url: "/mock/getchill",
            method: "get"
        }).then(res => {
            console.log(res)
            gdate.value = res.data.data
            console.log('gate====休闲服饰', gdate.value)
        })
    }
}
const onClickLeft = () => {
    router.go(-1)

}



</script>