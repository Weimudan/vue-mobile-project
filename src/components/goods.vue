<template>
	<div class="content" @click="Gooddetail(product)">
		<van-image :src="product.pic"></van-image>
		<div>{{ product.name }}</div>
		<div class="gray_text">{{ product.desc }}</div>
		<div class="cart-wrap">
			<div>
				<span style="color:red">¥{{ product.price }}</span>
				<span class="gray_text">/{{ product.unit }}</span>
			</div>
			<van-icon name="shopping-cart-o" color="red" @click="addCart(product)"></van-icon>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Gooddetail from './gooddetail.vue';

export default {
	props: ['product'],
	methods: {
		...mapActions(['addCart'])
	}
}
</script>

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


const Gooddetail = (product)=>{

	console.log('goods of product===',product)
	store.commit('setchoicegooddetail',product)
	router.push({name:'gooddetail'})
}

</script>
<style scoped="scoped">
.cart-wrap {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.gray_text {
	color: #ccc;
}

.content:hover {
	box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.506);
}
</style>
