<template>
    <!-- 头部bar -->
    <van-sticky>
        <van-nav-bar title="支付" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 消费者 -->
    <van-contact-card type="edit" :name="gdate.name" :tel="gdate.tel" :editable="false" />

    <!-- 商品card -->
    <div class="card">

        <div v-for="(item, index) in carBox" :key="item.id">

            <van-card style="background-color: white;" :num="item.num" :price="item.price" :desc="item.desc"
                :title="item.name" :thumb="item.pic" :origin-price="item.price + 10.00">

                <template #tags>
                    <van-tag plain type="primary">好物</van-tag>
                    <van-tag plain type="primary">爆款</van-tag>
                </template>


            </van-card>


        </div>
        <!-- 优惠价 -->
        <!-- 优惠券单元格 -->
        <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
        <!-- 优惠券列表 -->
        <van-popup v-model:show="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
            <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons"
                @change="onChange" @exchange="onExchange" />
        </van-popup>
    </div>








    <!-- 提交 -->
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" />
</template>
<script setup>

import { ref, onMounted, provide, inject } from 'vue';
import { useRouter } from 'vue-router';
import { closeToast, showLoadingToast } from 'vant';
import { showSuccessToast, showFailToast } from 'vant';
import { useStore } from 'vuex'
import request from '../axios/request.js'
const price = ref(0)



const store = useStore()
const router = useRouter();
const onClickLeft = () => {

    gdate.value.want.forEach((item) => {
        item.checked = false
    })
    store.commit('setnewcustomer', gdate.value)


    router.go(-1);
}
const gdate = ref([])
const carBox = ref([])



//挂载时 获取到选中的商品信息和价格和消费者信息
onMounted(() => {

    window.scrollTo(0, 0);
    request({
        url: "/mock/getcustomer",
        method: "get"
    }).then(res => {

        gdate.value = store.state.newcustomer

        // carBox.value = toRef(gdate.value,'want')
        // console.log('购物车gate====现在', res.data.data[0].name)
        console.log('要付款了====', gdate.value)
        // console.log('购物车',carBox.value)
        gdate.value.want.forEach((item) => {

            if (item.checked) {
                console.log('购物车', carBox.value)
                carBox.value.push(item)
            }
            console.log('购物车', carBox.value)
            console.log('购物车', carBox.value.length)
        })
        console.log('完成的pay购物车===', carBox.value)

        carBox.value.forEach((item) => {
            price.value += item.price * item.num
        })
        price.value = Number(price.value + '00' + '.00')
    })

})


//消费 == 删除购物车的东西 添加在消费记录上 上传到vuex实现持久化和数据共享
const onSubmit = () => {

    gdate.value.want.forEach((item,index) => {

        if (item.checked) {
            console.log('购物车', carBox.value)
            gdate.value.want.splice(index, 1)
            gdate.value.buy.push(item)
            
        }
        console.log('购物车', carBox.value)
        console.log('购物车加入buyyy====', gdate.value.buy)
    })
    //计算花费
    gdate.value.customerprice =gdate.value.customerprice + price.value
    store.commit('setnewcustomer', gdate.value)
    showSuccessToast('支付成功')
    router.push({name:'car'})
};




//优惠价
const coupon = {
    available: 1,
    condition: '无门槛\n最多优惠12元',
    reason: '',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1.5',
    unitDesc: '元',
    price: 1.5
};
//不可用的优惠卷
const disabledCoupons = ref([coupon]);

const coupons = ref([
    {
        available: 1,
        condition: '无门槛\n最多优惠12元',
        reason: '',
        value: 800,
        name: '6.18大庆狂欢',
        startAt: 1718000000,
        endAt: 1729154000,
        valueDesc: '8',
        unitDesc: '元',

    },
    {
        available: 1,
        condition: '无门槛\n最多优惠12元',
        reason: '',
        value: 1000,
        name: '6.18大庆狂欢',
        startAt: 1718000000,
        endAt: 1719154000,
        valueDesc: '10',
        unitDesc: '元',

    },
    {
        available: 1,
        condition: '无门槛\n最多优惠12元',
        reason: '',
        value: 1200,
        name: '6.18大庆狂欢',
        startAt: 1718000000,
        endAt: 1719154000,
        valueDesc: '12',
        unitDesc: '元',

    },

]);
const showList = ref(false);
const chosenCoupon = ref(-1);
//优惠卷改变时触发
const onChange = (index) => {

    showList.value = false;
    chosenCoupon.value = index;
    console.log('优惠价', coupons.value[index]);
    if (price.value > 0) {
        price.value = price.value - coupons.value[index].value
    }


};
const onExchange = (code) => {

    // 假设接口返回了优惠券信息，将其添加到 coupons 数组中
    showLoadingToast('兑换中...')
    setTimeout(() => {
        closeToast()
        if (code === '886886') {
            coupons.value.push(coupon);
            showSuccessToast('兑换成功');
        } else {
            showFailToast('兑换码错误');
        }
    }, 1000)


};
</script>
<style>
.goods-card {
    margin: 0;
    background-color: white;

}

.delete-button {
    height: 100%;
}

.payTab {
    margin-bottom: 50px;
}

.card {
    /* display: inline-block; */
    width: 100%;

    overflow: scroll;
    background-color: #f9f9f9cb;
}

.van-card {
    margin-top: 0;
}

.checkcss {
    display: flex;
    justify-content: center;
    margin-top: -35px;
    margin-bottom: 10px;
    width: 100px;

}
</style>