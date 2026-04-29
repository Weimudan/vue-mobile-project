import goods from './goods.json'
import Mock from 'mockjs'
import user from './user.json'
import provider from './provider.json'
import tosgoodstore from './tosgoodstore.json'
import allgoods from './allgoods.json'
import drinkgoods from './drinkgoods.json'
import fruitgoods from './fruitgoods.json'
import seafoodgoods from './seafoodgoods.json'
import customer from './customer.json'
import ladylover from './ladylover.json'
import electric from './electric.json'
import chill from './chill.json'
// 模拟商品列表数据
Mock.mock('/mock/getGoodsList', 'get', {
    code: 200,
    data: goods
}).mock('/mock/updateGoods', 'post', {
    code: 200,
    data: goods
}).mock('/mock/deleteGoods','delete',{

    code: 200,
    data: goods
    
}).mock('/mock/getUser','get',{
    code: 200,
    data: user
}).mock('/mock/getProvider','get',{
    code: 200,
    data: provider
}).mock('/mock/gettosgoodstore','get',{
    code: 200,
    data: tosgoodstore
}).mock('/mock/getAllGoods','get',{
    code:200,
    data:allgoods
}).mock('/mock/getdrinkgoods','get',{
    code:200,
    data:drinkgoods
}).mock('/mock/getfruitgoods','get',{
    code:200,
    data:fruitgoods
}).mock('/mock/getseafoodgoods','get',{
    code:200,
    data:seafoodgoods
}).mock('/mock/getcustomer','get',{
    code:200,
    data:customer
}).mock('/mock/getladylover','get',{
    code:200,
    data:ladylover
}).mock('/mock/getelectric','get',{
    code:200,
    data:electric
}).mock('/mock/getchill','get',{
    code:200,
    data:chill
})
