<template>
    <van-sticky>
        <van-nav-bar style="height:50px" title="商品页面" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    </van-sticky>

    <van-sticky :offset-top="45">
        <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" @change="handleChange" />
        <van-dropdown-item v-model="value2" :options="option2" @change="handleChange" />
    </van-dropdown-menu>
    </van-sticky>
    

    <goodslist :list="gdate" />
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { closeToast, showLoadingToast } from 'vant';
import { showSuccessToast, showFailToast } from 'vant';
import { useStore } from 'vuex'
import { showToast } from 'vant';
import goodslist from './Goodslist.vue'
import request from '../axios/request.js'
const store = useStore()
const router = useRouter();
const price = ref(0)
const onClickLeft = () => {
    router.go(-1);
}
const customer = ref([])
const searchinfo = ref('')
const gdate = ref([])


//搜索获取不同json数据
onMounted(() => {
    window.scrollTo(0, 0);

    if (store.state.isLogin == true) {

        customer.value = store.state.newcustomer

        console.log(searchinfo.value)

    }
    searchinfo.value = store.state.searchinfo


    if (searchinfo.value != '水果' && searchinfo.value.includes('水') || searchinfo.value.includes('饮') || searchinfo.value.includes('酒')) {

        request({
            url: "/mock/getdrinkgoods",
            method: "get"
        }).then(res => {
            console.log('res====酒水', res)

            gdate.value = res.data.data
            console.log('gate====酒水', gdate.value)
        })
    } else if (searchinfo.value.includes('水果')) {
        request({
            url: "/mock/getfruitgoods",
            method: "get"
        }).then(res => {
            console.log('res====时令水果', res)

            gdate.value = res.data.data
            console.log('gate====时令水果', gdate.value)
        })
    } else if (searchinfo.value.includes('海鲜')) {

        request({
            url: "/mock/getseafoodgoods",
            method: "get"
        }).then(res => {
            console.log('res====海鲜水产', res)

            gdate.value = res.data.data
            console.log('gate====海鲜水产', gdate.value)
        })
    } else if (searchinfo.value.includes('遮瑕') ||searchinfo.value.includes('美妆') || searchinfo.value.includes('口红') || searchinfo.value.includes('画笔') || searchinfo.value.includes('护肤') || searchinfo.value.includes('百货')) {
        request({
            url: "/mock/getladylover",
            method: "get"
        }).then(res => {
            console.log('res====美妆百货', res)

            gdate.value = res.data.data
            console.log('gate====美妆百货', gdate.value)
        })
    } else if (searchinfo.value == '全部' || searchinfo.value == '') {
        request({
            url: "/mock/getAllGoods",
            method: "get"
        }).then(res => {
            console.log(res)
            gdate.value = res.data.data
            console.log('gate====现在', gdate.value)
        })
    } else if (searchinfo.value.includes('电') ||searchinfo.value.includes('手机') || searchinfo.value.includes('空调') || searchinfo.value.includes('电脑') || searchinfo.value.includes('家电') || searchinfo.value.includes('科技') || searchinfo.value == '家电科技') {
        request({
            url: "/mock/getelectric",
            method: "get"
        }).then(res => {
            console.log(res)
            gdate.value = res.data.data
            console.log('gate====家电科技', gdate.value)
        })
    } else if (searchinfo.value == '休闲服饰' || searchinfo.value.includes('休闲') || searchinfo.value.includes('衣') || searchinfo.value.includes('鞋') || searchinfo.value.includes('服饰')) {
        request({
            url: "/mock/getchill",
            method: "get"
        }).then(res => {
            console.log(res)
            gdate.value = res.data.data
            console.log('gate====休闲服饰', gdate.value)
        })
    }
})


//下拉框的选择values
const value1 = ref(0);
const value2 = ref('a');
const option1 = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
];
const option2 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
    { text: '价格排序', value: 'd' },
    { text: '价格排序降序', value: 'e' },
];

//处理value改变时触发
const handleChange = (value) => {
    console.log(value)
    if (value == 'd') {
        gdate.value.sort((a, b) => {
            return a.price - b.price
        })
        console.log(gdate.value)
    } else if (value == 'e') {
        gdate.value.sort((a, b) => {
            return b.price - a.price
        })
        console.log(gdate.value)
    } else if (value == 'b') {
        gdate.value.sort((a, b) => {
            return b.price - a.price
        })
        console.log(gdate.value)
    }else if(value=='a'){
        gdate.value.sort((a, b) => {
            return b.id - a.id
        })
    }else if(value == 'c'){
        gdate.value.sort((a, b) => {
            return a.id - b.id
        })
    }else if(value == '1'){
        gdate.value.sort((a, b) => {
            return b.id - a.id
        })
    }else if(value == '2'){
        gdate.value.sort((a, b) => {
            return b.price - a.price
        })
    }
}
</script>