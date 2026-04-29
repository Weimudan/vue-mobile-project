<template>
    <div>+ - *</div>
    <button @click="store.dispatch('increment',1)">+</button>
    <button @click="store.dispatch('decrement',1)">-</button>
    <button @click="store.commit('CHENGFA',2)">*</button>
    {{ store.state.sum }}
    {{ gdate }}
</template>
<script setup>
    import { ref,onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import request from '../../axios/request.js'
    const store = useStore()
    const gdate = ref()
    onMounted(
       ()=>{
          request({
              url:'/mock/getGoodsList',
              method:'get'
          }).then(res=>{
              gdate.value = res.data.data
              console.log(gdate.value)
          }).catch(err=>{
              console.log(err)
          })
       }
    

    )
</script>