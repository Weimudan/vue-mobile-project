<template>
    <!-- 头部navbar -->
    <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 未登录登录的盒子 -->
    <div class="outhead" v-if="isLogin === false">

        <van-row class="head" align="center">
            <van-col span="4" offset="2"><van-icon name="user-circle-o" size="50px" /></van-col>
            <van-col span="6">
                <h4>未登录</h4>
                <p>默认签名</p>
            </van-col>
            <van-col offset="5" span="3"><van-button plain hairline type="success" size="small"
                    @click="login">登录</van-button></van-col>
            <van-col span="3"><van-button plain hairline type="primary" size="small"
                    @click="register">注册</van-button></van-col>
        </van-row>

        <!-- 未登录Dialog -->
        <van-dialog v-model:show="show" title="登录" :show-confirm-button="false" show-cancel-button>
            <!-- 登录form -->
            <van-form @submit="onSubmit">
                <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="密码" label="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" placeholder="密码" />
                <div style="margin: 16px;">
                    <van-button round block type="primary" size="middle" native-type="submit">
                        登录
                    </van-button>
                </div>
            </van-form>
        </van-dialog>

        <!-- 注册Dialog -->
        <van-dialog v-model:show="registershow" title="注册" :show-confirm-button="false" show-cancel-button>

            <!-- 注册form -->

            <van-form @submit="onRegisterSubmit">
                <van-field v-model="registerusername" name="注册用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="tel" type="tel" label="手机号" name="注册手机号"
                    :rules="[{ pattern, required: true, message: '请填写手机号' }]" placeholder="手机号" />
                <van-field v-model="registerpassword" type="password" name="注册密码" label="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" placeholder="密码"></van-field>
                <van-field v-model="registerpassword2" type="password" name="确认密码" label="确认密码"
                    :rules="[{ required: true, message: '请填写密码' }]" placeholder="确认密码" />
                <div style="margin: 16px;">
                    <van-button round block type="primary" size="middle" native-type="submit">
                        注册
                    </van-button>
                </div>
            </van-form>

        </van-dialog>



    </div>

    <!-- 登录成功 -->
    <div class="outhead" v-if="isLogin === true">
        <van-row class="head" align="center">
            <van-col span="4" offset="1">
                <!-- <van-icon name="user-circle-o" size="50px" /> -->
                <van-image round width="4rem" height="4rem" :src="newcustomer.avatar" />
            </van-col>
            <van-col span="6" offset="1">
                <h4>{{ newcustomer.name }}</h4>
                <p>tel:{{ newcustomer.tel }}</p>
                <p style="line-height: 25px;width: 200px;overflow: hidden;">消费余额: <span style="color: red;">{{ newcustomer.customerprice * 0.01
                        }}元</span></p>
            </van-col>

            <van-col span="4" offset="7"><van-button type="warning" @click="logout">退出</van-button></van-col>
        </van-row>
    </div>
    <van-empty description="请登入" v-if="isLogin === false" />

    <!-- cell功能 -->
    <div class="cell">
        <van-cell-group v-if="isLogin === true">


            <van-cell title="收货地址" icon="wap-home-o" :to="{ name: 'MyAddress' }">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon name="arrow" />
                </template>
            </van-cell>
            <van-cell title="我的优惠券" icon="after-sale" :to="{ name: 'paypage' }">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon name="arrow" />
                </template>
            </van-cell>
            <van-cell title="我的订单" icon="shop-o" :to="{ name: 'mybuy' }" label="描述信息">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon name="arrow" />
                </template>
            </van-cell>
            <van-cell title="我的购物车" icon="shopping-cart-o" :to="{ name: 'car' }" label="描述信息">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon name="arrow" />
                </template>
            </van-cell>

        </van-cell-group>
    </div>





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
import { Dialog } from 'vant';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { closeToast, showLoadingToast } from 'vant';
import { showSuccessToast, showFailToast } from 'vant';
import { useStore } from 'vuex'
import request from '../axios/request.js'
const store = useStore()
const router = useRouter();
const onClickLeft = () => {
    router.go(-1);
}
const isLogin = ref(false);
const active = ref(4);
console.log(active.value);


//从vuex获取数据
const gdate = ref([])
const carBox = ref([])
const badge = ref(0)
//当前消费者
const newcustomer = ref([])

//获取Allcustomer
onMounted(() => {

    request({
        url: "/mock/getcustomer",
        method: "get"
    }).then(res => {
        console.log(res)

        //如果系统是第一次运行就从数据库获取，否则从vuex中获取
        if (store.state.firstused === false) {

            store.commit('setfirstused', true)
            console.log('所有消费者', store.state.allcustomer)
            gdate.value = res.data.data
            store.commit('setAllcustomer', gdate.value)
            console.log('所有消费者后', store.state.allcustomer)
            badge.value =  gdate.value.want.length
        } else {

            gdate.value = store.state.allcustomer
            console.log('所有消费者sssssss=', store.state.allcustomer)
            // store.commit('setfirstused',false)
            badge.value = store.state.newcustomer.want.length
        }
        

        // carBox.value = toRef(gdate.value,'want')
        // console.log('Meeee购物车gate====现在', res.data.data[0].name)
        // console.log('购物车gate2====现在', gdate.value[0].want)

        // console.log('购物车',carBox.value)

    })
    //判断是否以及登录
    isLogin.value = store.state.isLogin
    if (isLogin.value === true) {
        newcustomer.value = store.state.newcustomer
        
    } else {
        newcustomer.value = []
    }
})

const login = () => {

    show.value = true
    // isLogin.value = true
}

// 登录信息
const show = ref(false)

const username = ref('')
const password = ref('')



//登录判断
const onSubmit = (values) => {
    console.log('submit', values);



    setTimeout(() => {
        showLoadingToast('验证中...');

    }, 500);



    setTimeout(() => {
        let flag = 0;
        gdate.value.forEach(item => {

            if (item.username === values.用户名 && item.password === values.密码) {
                console.log('登录成功');
                showSuccessToast('登录成功')


                if ('speechSynthesis' in window) {
                   
                    // 创建一个新的SpeechSynthesisUtterance对象 
                    let msg = new SpeechSynthesisUtterance('叮')
                    msg.volume = 1 //音量
                    msg.rate = 11 //语速
                    msg.text = '叮' //文字
                    msg.pitch = 4.0
                    speechSynthesis.speak(msg) //播放语音
                } else {
                    console.error('浏览器不支持Web Speech API');
                }




                newcustomer.value = item
                console.log('登录成功', newcustomer.value)
                store.commit('setnewcustomer', newcustomer.value)

                isLogin.value = true
                store.commit('setisLogin', isLogin.value)
                flag = 1;

            }
        })
        if (flag == 0) {
            console.log('登录失败')
            showFailToast('登录失败')
        }


    }, 2000);
    show.value = false
};


//退出
const logout = () => {

    isLogin.value = false
    store.commit('setisLogin', isLogin.value)
    newcustomer.value = []
    store.commit('setnewcustomer', newcustomer.value)


    showFailToast('退出成功')
}



//注册
const registershow = ref(false)
const registerusername = ref('')
const tel = ref('')
const registerpassword = ref('')
const registerpassword2 = ref('')
const newuser = ref([])
//电话的正则表达式
const pattern = /^1[3456789]\d{9}$/;
const register = () => {
    registershow.value = true
}
//注册
const onRegisterSubmit = (values) => {
    console.log('onRegisterSubmit', values)
    if (values.注册用户名 === '' || values.注册手机号 === '' || values.注册密码 === '' || values.确认密码 === '') {
        showFailToast('请输入完整信息')
    } else if (values.注册密码 != values.确认密码) {
        showFailToast('两次密码不一致')
    } else if (!pattern.test(values.注册手机号)) {
        showFailToast('请输入正确的手机号')
    } else {
        showSuccessToast('注册成功')
        newuser.value = {
            name:values.注册用户名 ,
            username:values.注册用户名,
            password:values.注册密码,
            avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.egBHrvTIkO73Rj6DD20_twAAAA?w=194&h=194&c=7&r=0&o=5&dpr=1.6&pid=1.7",
            addressDetail: "杭州市西湖区 黄龙万科中心",
            city: "北京市",
            county: "东城区",
            isDefault: true,
            province: "北京市",
            tel: values.注册手机号 ,
            customerprice:0,
            buy:[],
            want:[]

        }
        console.log(newuser.value)
        console.log('所有用户',gdate.value)
        gdate.value.push(newuser.value)
        store.commit('setAllcustomer',gdate.value)
        registershow.value = false

    }
}
</script>
<style scoped>
* {

    box-sizing: border-box;
}

.outhead {
    height: 50px;
    padding-top: 8px;
}

.outhead h4 {
    font-weight: 700;
    font-size: 17px;
    margin: 0;
}

.outhead p {

    margin: 0;
}

.cell {
    margin-top: 40px;
}
</style>