<template>

  <!-- 我的地址的bar -->
  <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" />
  <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList" disabled-text="以下地址超出配送范围"
    default-tag-text="默认" @add="onAdd" @edit="onEdit" />

  <!-- 修改的弹出框 -->
  <van-dialog v-model:show="updateshow" title="修改" show-cancel-button :show-confirm-button="false">
    <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
      :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
      @change-detail="onChangeDetail" />
  </van-dialog>


    <!-- 添加的弹出框 -->
  <van-dialog v-model:show="addshow" title="添加" show-cancel-button :show-confirm-button="false">
    <van-address-edit :area-list="areaList" :show-delete="false" show-set-default show-search-result :search-result="searchResult2"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave1" @change-detail="onChangeDetail2" />
  </van-dialog>
</template>
<script setup>
import { ref,onMounted,toRef } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import { areaList } from '@vant/area-data';
import request from '../axios/request.js'
import { Area } from 'vant';
//路由
const router = useRouter();
//地址默认
const chosenAddressId = ref('1');
import { useStore } from 'vuex'

const store = useStore()


const list = ref([
  {
    id: '4',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: false,
  },
  {
    id: '2',
    name: '李四',
    tel: '1310000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号',
  },
]);

const disabledList = [
  {
    id: '3',
    name: '王五',
    tel: '1320000000',
    address: '浙江省杭州市滨江区江南大道 15 号',
  },
];


//挂载时从vuex获取用户信息并对地址插入用户地址
onMounted(() => {
const gdate = ref([])
request({
    url: "/mock/getcustomer",
    method: "get"
}).then(res => {
    console.log(res)
    gdate.value = store.state.newcustomer
    // carBox.value = toRef(gdate.value,'want')
    // console.log('购物车gate====现在', res.data.data[0].name)
    console.log('当前用户', gdate.value)
    // console.log('购物车',carBox.value)
    list.value.unshift({
      id: '1',
      name: gdate.value.name,
      tel: gdate.value.tel,  
      address: gdate.value.province +gdate.value.county+  gdate.value.addressDetail,
      isDefault: gdate.value.isDefault,
    })
})

})






//添加状态
const addshow = ref(false)
//修改地址的状态量
const updateshow = ref(false);


const onClickLeft = () => {
  router.go(-1);
}



//增加地址页面触发页面
const onAdd = () => {
  showToast('新增地址');
  addshow.value = true
}




const onSave1 = (value) => {
  showToast('save')
  console.log(value)
  console.log(value.city)
};

//修改
const onEdit = (item, index) => {
  

  updateshow.value = true;
}





//详细地址搜索
const searchResult = ref([]);

const onSave = (value) => {
  showToast('save')
  console.log(value)
  console.log(value.city)
};

const searchResult2 = ref([]);
const onChangeDetail2 = (val) => {
  if (val) {
    searchResult2.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区',
      },
      {
        name: '西溪路',
        address: '杭州市西湖区',
      },
      {
        name: '文三路',
        address: '杭州市西湖区',
      },
      {
        name: '文二路',
        address: '杭州市西湖区',
      },

    ];
  } else {
    searchResult2.value = [];
  }
};





const onDelete = () => showToast('delete');

//搜索详细
const onChangeDetail = (val) => {
  if (val) {
    searchResult.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区',
      },
      {
        name: '西溪路',
        address: '杭州市西湖区',
      },
      {
        name: '文三路',
        address: '杭州市西湖区',
      },
      {
        name: '文二路',
        address: '杭州市西湖区',
      },

    ];
  } else {
    searchResult.value = [];
  }
};




</script>