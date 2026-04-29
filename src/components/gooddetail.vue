<template>
    <!-- nav -->
    <van-nav-bar title="商品页面" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
            <van-icon name="share-o" size="18" @click="showShare = true" />
        </template>
    </van-nav-bar>


    <!-- 分享插件 -->
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />


    <!-- 主题内容 -->
    <div class="content">
        <!-- 照片盒子 -->
        <div class="img">
            <van-image style="width: 100%;height: 100%;" :src="product.pic" />
        </div>
        <!-- 价格文字盒子-->
        <div class="pricecontent">
             <!-- 价格弹性容器  -->
            <div class="priceandnum">
                <!-- 价格盒子弹性盒子 -->
                <div class="price">
                    <p style="overflow: hidden;">￥<span style="font-size: 20px;font-weight: 700;overflow: hidden;">{{ product.price }}</span>起 &nbsp; 60天低价</p>
                </div>
                <!-- 数量盒子弹性盒子 -->
                <div class="num">
                    <p>已拼8009件</p>
                </div>
            </div>
            <!-- 标签盒子 -->
            <div class="tag">
                <van-tag plain size="medium" type="danger">即将恢复{{ product.price + 10 }}元起</van-tag>
                &nbsp;
                <van-tag plain size="medium" type="danger">2件9.5折</van-tag>
            </div>
        </div>
        <!-- 描述盒子 -->
        <div class="dig">
            <van-tag style="width: 100%" type="success" size="large"><van-icon name="hot" />
                &nbsp;先用后付|支持0元下单，确认后发货在付款</van-tag>
        </div>
        <!-- 描述盒子 -->
        <div class="textdetail">
            {{ product.desc }}{{ product.name }}<van-tag
                type="success">退货包运费</van-tag>
        </div>
        

        <!-- 供应商盒子 -->
        <van-cell value="内容" inset is-link style="background-color: rgba(255, 255, 255, 0.8);">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <van-image width="25" height="20" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                <span class="custom-title" >貓之點</span>
                <!-- <van-tag type="primary">标签</van-tag> -->
            </template>
           
            <template #value>
                <span>品牌官方授权，100%正品</span>
            </template>


        </van-cell>
        <!-- 动态字幕组件 -->
        <van-notice-bar left-icon="volume-o" text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。" />
        

    </div>

    <!-- 动作bar -->
    <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-action-bar-icon icon="cart-o" text="购物车"  @click="onClickIcon" :badge="badge" />
        <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" />
        <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
    </van-action-bar>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { closeToast, showLoadingToast } from 'vant';
import { showSuccessToast, showFailToast } from 'vant';
import { useStore } from 'vuex'
import { showToast } from 'vant';
import request from '../axios/request.js'
const store = useStore()
const router = useRouter();
const price = ref(0)

// 退回
const onClickLeft = () => {
    router.go(-1);
}
//商品信息
const product = ref([])
//当前用户
const customer = ref([])
//购物车商品数量
const badge = ref(0)

//挂载时当处于登入状态时获取获取客户信息以及购物车商品数量 ，不在是只从vuex获取商品信息
onMounted(() => {
    window.scrollTo(0, 0);
    product.value = store.state.choicegooddetail
    if(store.state.isLogin == true){
       
        customer.value = store.state.newcustomer
        badge.value =  store.state.newcustomer.want.length
    }
   
    console.log(badge.value)
})

//点击购物车 添加商品
const onClickIcon = () => {
   
    console.log(product)
    
    //当状态为登录时可以对用户的want购物车做插入操作
    if(store.state.isLogin == true){
        customer.value = store.state.newcustomer
        console.log(customer.value.want)
        customer.value.want.push(product.value)
    
        console.log('customer.value=======',customer.value)
        store.commit('setnewcustomer', customer.value )
        showSuccessToast('添加在购物车')
    }else{
        router.push('/car')
    }
    
    
}


//点击购买
const onClickButton = () => {
      //当状态为登录时可以对用户的选择的商品做check为true的操作 ，在router跳转到paypage页面时将用户选择的商品添加到用户的buy
    if(store.state.isLogin == true){
        customer.value = store.state.newcustomer
        console.log(customer.value.want)
        product.value.checked = true
        customer.value.want.push(product.value)
    
        console.log('customer.value=======',customer.value)
        store.commit('setnewcustomer', customer.value )
       
        router.push({name:'paypage'})
    }else{
        //没有登录去car
        router.push('/car')
    }
   
    
}


//分享
const showShare = ref(false);
const options = [
    { name: '微信', icon: 'wechat' },
    { name: '微博', icon: 'weibo' },
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
];

const onSelect = (option) => {
    showToast(option.name);
    showShare.value = false;
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}

.content {
    /* padding-top: 10px; */
    width: 100%;
  
    /* background-color: #b73c3c; */
}

.content .img {
    width: 100%;
    height: 296px;
}

.content .pricecontent {
    padding: 8px;
    height: 90px;
    background-color: #fff;
    border-top: 2px solid #d8d6d6da;
}

.content .pricecontent .priceandnum {
    display: flex;
    justify-content: space-between;
    height: 40px;

}

.content .pricecontent .priceandnum .price {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 40%;
    height: 100%;
    color: red;

}

.content .pricecontent .priceandnum .num {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 30%;
    height: 100%;

    color: gray;
    font-size: 13px;
}

.content .pricecontent .tag {


    padding-right: 6px;
    height: 30px;

}

.content .dig {
    padding-left: 6px;
    padding-right: 6px;
    height: 30px;

}

.content .textdetail {
    padding: 8px;
    height: 60px;

    font-weight: 700;
    overflow: hidden;
    border-bottom: 1px solid rgb(0 0 0 / 13%);
    
}

.custom-title{
    margin-left: 5px;
    width: 50px;
    height: 20px;
    font-weight: 700;
    font-size: 10px;
    
}
.van-cell__title{
    display: flex;
   
}
</style>