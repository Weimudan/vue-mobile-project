<template>
    <!-- 头部bar -->

    <van-sticky>
        <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <van-empty description="未登录,点击登入" v-if="store.state.isLogin == false" @click="Tome" />
    <div class="content" v-for="(item, index) in customerbuy" :key="index"  v-if="store.state.isLogin == true">
        <div class="item">
            <div class="product">
                <van-cell value="内容" inset is-link>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        <van-image width="25" height="20" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                        <span class="custom-title">貓之點</span>
                        <!-- <van-tag type="primary">标签</van-tag> -->
                    </template>

                    <template #value>
                        <span>品牌官方授权，100%正品</span>
                    </template>


                </van-cell>
            </div>
            <div class="text_img">
                <div class="img">
                    <van-image style="width: 100%;height: 100%;" :src="item.pic" />
                </div>
                <div class="text">
                    <div class="word">
                        <van-tag type="warning" size="large"><van-icon name="good-job-o" />百亿补贴</van-tag>
                        <span style="overflow: hidden;">{{ item.desc }}{{ item.name }}</span>
                        <p>{{ item.name }}/1{{ item.unit }}</p>
                        <p><van-tag mark type="success" size="large">退货包运费保障中</van-tag></p>
                    </div>
                    <div class="price">
                        <div class="money">
                            ￥<span>{{ item.price }}</span>
                        </div>
                        <div class="num">
                            ×{{ item.num }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="address">
                <van-steps :active="2">
                    <van-step>买家下单</van-step>
                    <van-step>商家接单</van-step>
                    <van-step>买家提货</van-step>
                    <van-step>交易完成</van-step>
                </van-steps>
            </div>
            <div class="action">
                <div class="actiontext">
                    商品好不好，等你来评价
                </div>
                <div class="comment">
                    <van-rate v-model="value" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
                </div>
            </div>
        </div>
    </div>
    <van-tabbar v-model="active" style="z-index: 1;">
        <van-tabbar-item icon="home-o" :to="{ name: 'HomeView' }">
            <router-link :to="{ name: 'HomeView' }" style="color: black;">主页</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="apps-o" :to="{ name: 'goodsclass' }">
            <router-link :to="{ name: 'goodsclass' }" style="color: black;">分类</router-link>
        </van-tabbar-item>
        <van-tabbar-item icon="fire-o" badge="Hot" :to="{ name: 'mybuy' }">我的订单</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" :to="{ name: 'goodsclass' }" >购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" :to="{ name: 'Me' }">
            <router-link :to="{ name: 'Me' }" style="color: black;">我的</router-link>
        </van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref, onMounted, provide, inject } from 'vue';
import { useRouter } from 'vue-router';
import { closeToast, showLoadingToast } from 'vant';
import { showSuccessToast, showFailToast } from 'vant';
import { useStore } from 'vuex'
import request from '../axios/request.js'


//购物车数量
const badge = ref(0)
//当前消费者
const customer = ref([])
//当前消费者购买的商品
const customerbuy = ref([])
const store = useStore()
const router = useRouter();
const value = ref(0)
//当前tab的下标
const active = ref(2);
//回退
const onClickLeft = () => {

    router.go(-1);
}
const Tome = () => {
    router.push({ name: 'Me' })
}

//挂载时，当处于登录状态时获取当前消费者的buy的数据
onMounted(() => {

    window.scrollTo(0, 0);
    if (store.state.isLogin == true) {

        customer.value = store.state.newcustomer
        badge.value = store.state.newcustomer.want.length
        console.log(customer.value)
        customerbuy.value = store.state.newcustomer.buy
        customerbuy.value.reverse()
        console.log('buy=',store.state.newcustomer.buy)
        console.log('customerbuy=', customerbuy.value)
    }





})
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.content {

    width: 100%;
    height: 100%;
    background-color: #cb2929;
}

.content .item {
    margin-top: 8px;
    height: 240px;
    background-color: white;
    border-top: 2px solid rgb(0 0 0 / 13%);
    border-bottom: 2px solid rgb(0 0 0 / 13%);
}

.content .item .product {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
    height: 15%;
    border-bottom: 1px solid rgb(0 0 0 / 13%);
}

.content .item .text_img {
    display: flex;
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
    height: 50%;

}

.content .item .img {

    width: 120px;
    height: 100%;
    background-color: #fff;
}

.content .item .text_img .text {
    display: flex;
    flex: 1;
    padding-left: 6px;

}

.content .item .text_img .text .word {
    padding: 8px;
    width: 80%;
    background-color: #fff;
}

.content .item .text_img .text .price {
    flex: 1;
    padding-top: 8px;
    padding-bottom: 8px;

}

.content .item .text_img .text .money {
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}

.content .item .text_img .text .num {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: grey;
}

.content .item .address {
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
    height: 20%;
    border-top: 1px solid rgb(0 0 0 / 13%);
 
}

.content .item .action {
    display: flex;
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
    height: 15%;
    background-color: #d6d6d6d2;
}

.content .item .action .actiontext {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    color: rgb(0, 0, 0);

}

.content .item .action .comment {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;

}
</style>