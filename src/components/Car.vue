<template>
    <!-- bar 头部 -->
    <van-sticky>
        <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>

    <van-empty description="未登录,点击登入" v-if="store.state.isLogin == false" @click="Tome" />

    <!-- 购物车 -->
    <div class="card" v-if="store.state.isLogin == true">
        <div v-for="(item, index) in carBox" :key="item.id">

            <van-swipe-cell>

                <template #left>
                    <van-button square type="primary" text="选择" class="delete-button" @click="choice(item)" />
                </template>
                <van-card style="background-color: white;" :num="num" :price="item.price"
                    :origin-price="item.price + 10.00" :desc="item.desc" :title="item.name" :thumb="item.pic">

                    <template #tags>
                        <van-tag type="primary">好物</van-tag>
                        <van-tag type="primary" text-color="#ad0000" color="#ffe1e1">爆款</van-tag>
                    </template>




                    <template #num>
                        <div class="checkcss">
                            <van-checkbox v-model="item.checked" @click="addprice(item)" />
                        </div>

                        <van-stepper v-model="item.num" @plus="plus(item)" @minus="minus(item)" />
                    </template>

                </van-card>
                <template #right>
                    <van-button square text="删除" type="danger" @click="del(item.id, index, item)"
                        class="delete-button" />
                </template>

            </van-swipe-cell>


        </div>
    </div>



    <van-submit-bar class="payTab" :price="price" button-text="提交订单" @click="pay" :safe-area-inset-bottom="true"
        v-if="store.state.isLogin == true">
        <van-checkbox v-model="checked" @click="Allcheck">全选</van-checkbox>
        <template #tip>
            你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
        </template>
    </van-submit-bar>

    <!-- tab -->

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
import { Dialog } from 'vant';
import { ref, onMounted, toRef, toRefs, reactive, provide } from 'vue';
import { useRouter } from 'vue-router';
import { closeToast, showLoadingToast } from 'vant';
import { showSuccessToast, showFailToast } from 'vant';
import request from '../axios/request.js'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter();
const price = ref(0)

const firsttrigger = ref(false)
const onClickLeft = () => {
    router.go(-1);
}
const active = ref(3);

const num = ref(1)

//暂时性 check
const checked = ref(false)

//修改地址
const onClickLink = () => {
    router.push({ name: 'MyAddress' })
}

//加入购物车
const gdate = ref([])
const carBox = ref([])
const badge = ref(0)
onMounted(() => {
    window.scrollTo(0, 0);
    request({
        url: "/mock/getcustomer",
        method: "get"
    }).then(res => {
        console.log(res)
        gdate.value = store.state.newcustomer
        // carBox.value = toRef(gdate.value,'want')
        // console.log('购物车gate====现在', res.data.data[0].name)
        console.log('购物车gate2====现在', gdate.value)
        // console.log('购物车',carBox.value)
        carBox.value = gdate.value.want
        for (let i = 0; i < gdate.value.want.length; i++) {
            addprice(gdate.value.want[i])
        }
        badge.value = gdate.value.want.length
    })

})


// 上传
const pay = () => {
    console.log('提交', gdate.value)
    // showLoadingToast({
    //     message: '加载中...',
    //     forbidClick: true,
    //     loadingType: 'spinner',
    // });

    // setTimeout(() => {
    //     closeToast();
    //     showSuccessToast('提交成功');

    // }, 2000);

    router.push({ name: 'paypage' })

}

const Tome = () => {
    router.push({ name: 'Me' })
}


//删除
const del = (id, index, item) => {
    console.log('删除', id, index)
    gdate.value.want.splice(index, 1)
    carBox.value = gdate.value.want
    console.log('删除后carBox=', carBox.value)
    console.log('删除后gdate=', gdate.value)

    store.commit('setnewcustomer', gdate.value)
    console.log('删除后store=', store.state.newcustomer)

    const money = ref(0)
    if (item.checked) {
        money.value = item.price * item.num
        console.log('jia++', price.value)
        const temp = money.value
        if (firsttrigger.value == false) {
            price.value = Number(temp.toString() + '00' + '.00')
            firsttrigger.value = true
        } else {
            price.value -= Number(temp.toString() + '00' + '.00')
        }
    }
}

//全选
const Allcheck = () => {
    console.log('全选中')

    gdate.value.want.forEach((item, index) => {
        if (item.checked == false) {
            const money = ref(0)
            money.value = item.price * item.num
            console.log('jia++', price.value)
            const temp = money.value
            if (firsttrigger.value == false) {
                price.value = Number(temp.toString() + '00' + '.00')
                firsttrigger.value = true
            } else {
                price.value += Number(temp.toString() + '00' + '.00')
            }
        }
        item.checked = checked.value
        console.log('全选中', item.checked)
    })
    carBox.value = gdate.value.want
    console.log('全选中', gdate.value.want)
    store.commit('setnewcustomer', gdate.value)

    if (gdate.value.want[0].checked == false) {
        price.value = Number('00' + '.00')
    }



}


//选择的钱改变
const addprice = (item) => {

    console.log('选择price=', item)
    const money = ref(0)
    if (item.checked) {
        money.value = item.price * item.num
        console.log('jia++', price.value)
        const temp = money.value
        if (firsttrigger.value == false) {
            price.value = Number(temp.toString() + '00' + '.00')
            firsttrigger.value = true
        } else {
            price.value += Number(temp.toString() + '00' + '.00')
        }
    } else {
        money.value = item.price * item.num
        const temp = money.value

        if (price.value > 0) {
            price.value -= Number(temp.toString() + '00' + '.00')
        }
    }



}


const choice = (item) => {
    console.log('选择', item)
    item.checked = !item.checked
    addprice(item)
}

//增加数量 价格
const plus = (item) => {
    console.log('plus', item)
    const money = ref(0)
    if (item.checked) {
        money.value = item.price
        const temp = money.value
        if (firsttrigger.value == false) {
            price.value = Number(temp.toString() + '00' + '.00')
            firsttrigger.value = true
        } else {
            price.value += Number(temp.toString() + '00' + '.00')
        }

    }
}


//减少数量 价格
const minus = (item) => {
    console.log('minus', item)
    const money = ref(0)
    if (item.checked) {
        money.value = item.price
        const temp = money.value

        if (price.value > 0) {
            price.value -= Number(temp.toString() + '00' + '.00')
        }

    }
}
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
    height: 864px;
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