
import { createStore } from 'vuex'

import createPersistedstate from 'vuex-persistedstate'
const store = createStore(
    {

        // 准备state——用于存储数据 （类似于date）
        state: {
            sum: 1999245135,
            sum2: 1999200000,
            sum3: 1999105600,
            sum4: 1999520000,
            sum5: 1999512600,
            sum6: 1999412600,
            sum7: 1999402600,
            userAll: [],
            GoodsList: [],
            Provider:[],
            goodsstore:[],
            user:[],

            isLogin:false,
            newcustomer:[],
            allcustomer:[],
            firstused:false,
            choicegooddetail:[],
            searchinfo:[]
        },
        // 准备mutations——用于响应组件的动作（逻辑判断等）
        actions: {
            increment(context, value) {
                console.log("进来increment")
                context.commit('INCREMENT', value)
            }
            , decrement(context, value) {
                console.log("进来decrement")
                context.commit('DECREMENT', value)
            },
            incrementOdd(context, value) {
                console.log("进来incrementOdd")
                if (context.state.sum % 2) {
                    context.commit('INCREMENT', value)
                }
            },
            incrementWait(context, value) {
                console.log("进来incrementWait")
                setTimeout(() => {
                    context.commit('INCREMENT', value)
                }, 500);
            },
            updateGoodsList(context, value) {
                console.log("updateGoodsList")
                console.log('updateGoodsList前', context.state.GoodsList)

                for (let i = 0; i < context.state.GoodsList.length; i++) {
                    if (context.state.GoodsList[i].id == value.id) {

                        context.state.GoodsList[i].price = value.price
                        console.log('updateGoodsList后', context.state.GoodsList)

                    }

                }
            }

        },
        // 准备mutations——用于操作数据（直接对数据操作）
        mutations: {
            setsearchinfo(state,value){
                state.searchinfo = value
            }
            ,setchoicegooddetail(state,value){
                state.choicegooddetail = value
            },setfirstused(state,value){
                state.firstused = value
            },
            setAllcustomer(state, value){
                state.allcustomer = value
            },
            setnewcustomer(state, value) {

                state.newcustomer = value

            },
            setisLogin(state,value){
                state.isLogin = value
            }
            ,INCREMENT(state, value) {
                
                let date = new Date()
                console.log("进来INCREMENT",date.getDay())

                if (date.getDay() == 1){
                    state.sum += value
                }else if(date.getDay() == 2){
                    state.sum2 += value
                }else if(date.getDay() == 3){
                    state.sum3 += value
                }else if(date.getDay() == 4){
                    state.sum4 += value
                }else if(date.getDay() == 5){
                    state.sum5 += value
                }else if(date.getDay() == 6){
                    state.sum6 += value
                }else if(date.getDay() == 0){
                    state.sum7 += value
                }
                
            },
            DECREMENT(state, value) {
                let date = new Date()
                console.log("进来DECREMENT",date.getDay())
                
                if (date.getDay() == 1){
                    state.sum -= value
                }else if(date.getDay() == 2){
                    state.sum2 -= value
                }else if(date.getDay() == 3){
                    state.sum3 -= value
                }else if(date.getDay() == 4){
                    state.sum4 -= value
                }else if(date.getDay() == 5){
                    state.sum5 -= value
                }else if(date.getDay() == 6){
                    state.sum6 -= value
                }else if(date.getDay() == 0){
                    state.sum7 -= value
                }
                

            },
            CHENGFA(state, value) {
                state.sum *= value
            },
            CHUFA(state, value) {
                state.sum /= value
            },
            setUser(state, value) {
                console.log("进来setUser")
                console.log(value)
                state.userAll = value
                console.log("出来")
            },
            setGoodsList(state, value) {
                console.log("进来setGoodsList")
                console.log('进来setGoodsList的value',value)
                state.GoodsList = value
                
                console.log('进来setGoodsList的修改的state.GoodsList',state.GoodsList )
            },
            setProvider(state, value) {
                console.log("进来setProvider")
                state.Provider = value
                console.log("进来setProvider值",state.Provider)
                console.log("setProvider出来")
            },
            setgoodsstore(state, value) {
                console.log("进来setgoodsstore")
                state.goodsstore = value
                console.log("进来setgoodsstore值",state.goodsstore)
                console.log("setgoodsstore出来")
            },
            setLoginuser(state, value){
                console.log("进来setLoginuser")
                state.user = value
                console.log("进来setLoginuser值",state.user)
                console.log("setLoginuser出来")
            }
        },
        // 准备getters——用于将state中的数据进行加工（相当于计算属性）（类似于compute）
        getters: {
            bigSum(state) {
                return state.sum * 10//一定要写返回值
            }
        },
        plugins: [
            createPersistedstate({
                key: 'index',// 存数据的key名   自定义的  要有语义化
                // paths: ['loginModule'] // 要把那些模块加入缓存
               
            })
        ]



    }
)
export default store