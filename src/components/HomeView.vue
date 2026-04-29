<template>
    <div class="home">
        <!-- 粘性+van-nav-bar -->
        <van-sticky>
        <van-row class="search-top" type="flex" align="center" justify="center">
            <!--1. 定位 跨连列 一个row 24个col offset=偏移 span+offset = 24 -->
            <van-col span="1" offset="1">
                <van-icon name="location-o" size="24px" color="white" @click="tomyaddress"/>
            </van-col>
            <!-- 搜索栏 -->
            <van-col span="18">

                <van-search @search="onSearch" v-model="value" placeholder="水果" shape="round" background="skyblue" />

            </van-col>
            <van-col span="2"><van-icon name="points" size="24px" color="green" @click="tome" /></van-col>
            <van-col span="2"><van-icon name="star-o" size="24px" color="yellow" @click="tostar" /></van-col>
        </van-row>
        </van-sticky>

        <!-- 轮播图 -->
        <div class="swipebox">
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in images" :key="image">
                    <img :src="image" class="img" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 九宫格 -->
         
        <van-grid :column-num="5">
            <van-grid-item v-for="(item, index) in cateList" :key="value" :icon="item.pic" :text="item.name" :to="{name:'goodsclass'}" />
        </van-grid>

        <!-- Tabbar -->
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" :to="{name:'HomeView'}">
                <router-link :to="{name:'HomeView'}" style="color: black;">主页</router-link> 
            </van-tabbar-item>
            <van-tabbar-item icon="apps-o" :to="{name:'goodsclass'}">
                <router-link :to="{name:'goodsclass'}" style="color: black;">分类</router-link> 
            </van-tabbar-item>
            <van-tabbar-item icon="fire-o" badge="Hot" :to="{ name: 'mybuy' }">我的订单</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" :to="{ name: 'car' }" :badge="badge">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" :to="{name:'Me'}">
                 <router-link :to="{name:'Me'}" style="color: black;">我的</router-link> 
            </van-tabbar-item>
        </van-tabbar>

        <!-- Tab -->
        <van-sticky :offset-top="70">
        <van-tabs v-model:active="activeName" swipe-threshold="5" @click-tab="trangood">

            <van-tab title="全部" name="a"></van-tab>
            <van-tab title="食品" name="b"></van-tab>
            <van-tab title="百货" name="c"></van-tab>
            <van-tab title="科技" name="c"></van-tab>
            <van-tab title="休闲" name="c"></van-tab>
            
        </van-tabs>
        </van-sticky>

        <!-- 商品宫格 -->
        <goodslist :list="gdate" />
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue';
import goodslist from './Goodslist.vue'
import request from "../axios/request.js"
import img1 from '../assets/pic/1.jpg'
import img2 from '../assets/pic/2.jpg'
import img3 from '../assets/pic/3.jpg'
import img4 from '../assets/pic/4.jpg'
import catepic1 from '../assets/pic/cata/1.png'
import catepic2 from '../assets/pic/cata/2.png'
import catepic3 from '../assets/pic/cata/3.png'
import catepic4 from '../assets/pic/cata/4.png'
import catepic5 from '../assets/pic/cata/5.png'
import catepic6 from '../assets/pic/cata/6.png'
import catepic7 from '../assets/pic/cata/7.png'
import catepic8 from '../assets/pic/cata/8.png'
import catepic9 from '../assets/pic/cata/9.png'
import catepic10 from '../assets/pic/cata/10.png'
import propic1 from '../assets/pic/product/1.jpg'
import propic2 from '../assets/pic/product/2.jpg'
import propic3 from '../assets/pic/product/3.jpg'
import propic4 from '../assets/pic/product/4.jpg'
import propic5 from '../assets/pic/product/5.jpg'
import propic6 from '../assets/pic/product/6.jpg'
import { useStore } from 'vuex'
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
const router = useRouter()
const value = ref('');
const images = [
    img1,
    img2,
    img3,
    img4
]
const cateList = [
    { name: '餐饮熟食', pic: catepic1 },
    { name: '乳品烘培', pic: catepic2 },
    { name: '美妆百货', pic: catepic3 },
    { name: '酒水饮料', pic: catepic4 },
    { name: '粮油调味', pic: catepic5 },
    { name: '冰品面点', pic: catepic6 },
    { name: '海鲜水产', pic: catepic7 },
    { name: '肉禽蛋品', pic: catepic8 },
    { name: '新鲜蔬菜', pic: catepic9 },
    { name: '时令水果', pic: catepic10 },
]
const store = useStore()
const gdate = ref([])
const badge = ref(0)
onMounted(()=>{
    window.scrollTo(0, 0);
   //获取所有allgood.json数据
    request({
        url:"/mock/getAllGoods",
        method:"get"
    }).then(res=>{
        console.log(res)
        gdate.value = res.data.data
        console.log('gate====现在',gdate.value)
    })
    if(store.state.isLogin == true){
       
        //当用户登录时，获取购物车物品数量
        badge.value = store.state.newcustomer.want.length
        
    }
})
//tab
const active = ref(0);
//tabbar
const activeName = ref(0);

//点击tabbar 可以获取到不同的json数据
const trangood = (classname) => {
    console.log(classname)
    if (classname.title == '食品') {

        request({
            url: "/mock/getdrinkgoods",
            method: "get"
        }).then(res => {
            console.log('res====酒水', res)

            gdate.value = res.data.data
            console.log('gate====酒水', gdate.value)
        })
    } else if (classname.title == '时令水果') {
        request({
            url: "/mock/getfruitgoods",
            method: "get"
        }).then(res => {
            console.log('res====时令水果', res)

            gdate.value = res.data.data
            console.log('gate====时令水果', gdate.value)
        })
    } else if (classname.title == '海鲜水产') {

        request({
            url: "/mock/getseafoodgoods",
            method: "get"
        }).then(res => {
            console.log('res====海鲜水产', res)

            gdate.value = res.data.data
            console.log('gate====海鲜水产', gdate.value)
        })
    } else if (classname.title == '百货') {
        request({
            url: "/mock/getladylover",
            method: "get"
        }).then(res => {
            console.log('res====美妆百货', res)

            gdate.value = res.data.data
            console.log('gate====美妆百货', gdate.value)
        })
    } else if (classname.title == '全部') {
        request({
            url: "/mock/getAllGoods",
            method: "get"
        }).then(res => {
            console.log(res)
            gdate.value = res.data.data
            console.log('gate====现在', gdate.value)
        })
    }else if(classname.title=='科技'){
        request({
            url: "/mock/getelectric",
            method: "get"
        }).then(res => {
            console.log(res)
            gdate.value = res.data.data
            console.log('gate====家电科技', gdate.value)
        })
    }else if(classname.title == '休闲'){
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



//搜索
const onSearch = (value)=>{
    store.commit('setsearchinfo',value)

    router.push({name:'searchdetail'})
}

const productlist = [
        {
          id: 1,
          name: "西瓜 1000g",
          desc: "正宗沙土西瓜",
          price: 10,
          unit: "份",
          pic: propic1,
        },
        {
          id: 2,
          name: "杨梅",
          desc: "乡村,精选,漳州",
          price: 20,
          unit: "公斤",
          pic: propic2,
        },
        {
          id: 3,
          name: "榴莲",
          desc: "猫山王榴莲",
          price: 80,
          unit: "公斤",
          pic: propic3,
        },
        {
          id: 4,
          name: "龙虾",
          desc: "澳洲出产",
          price: 160,
          unit: "只",
          pic: propic4,
        },
        {
          id: 5,
          name: "红萝卜",
          desc: "根根脆爽,饱满红嫩",
          price: 4,
          unit: "公斤",
          pic: propic5,
        },
        {
          id: 6,
          name: "青尖椒",
          desc: "入口微辣,肉厚质嫩",
          price: 4.98,
          unit: "份",
          pic: propic6,
        },
      ]

const tomyaddress = ()=>{
    router.push({name:'MyAddress'})
}      
const tome = ()=>{
    router.push('/Me')
}
const tostar = ()=>{
    router.push('/mybuy')
}
</script>
<style scoped>
.search-top {
    background-color: skyblue;
    height:70px;
}

.img {
    height: 150px;
    width: 100%;
}

.swipebox {
    text-align: center;
}
</style>