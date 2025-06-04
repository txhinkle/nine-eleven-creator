<script setup>

import { ref } from 'vue';

const props = defineProps({
	esi: {
		type: Object,
		required: true,
	},
});
const newEsi = ref(JSON.parse(JSON.stringify(props.esi)));

const emit = defineEmits(['submit', 'close']);
const submit = () => {
	emit('submit', newEsi.value);
};
const close = () => {
	emit('close');
};
</script>
<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<label>
				<span>ESIProgramStartDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newEsi.ESIProgramStartDate"
					required
				/>
			</label>
			<label>
				<span>ESIProgramEndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newEsi.ESIProgramEndDate"
					required
				/>
			</label>
			<label>
				<span>BillMonth</span>
				<input
					type="text"
					v-model="newEsi.BillMonth"
					required
				/>
			</label>
			<label>
				<span>ESIPremiumAmt</span>
				<input
					type="number"
					v-model="newEsi.ESIPremiumAmt"
					required
				/>
			</label>
			<button type="submit">Update</button>
			<button @click="close">Cancel</button>
		</form>
	</div>
</template>

<style scoped>
div, form, label, span {
	background-color: #bfc;
}
label {
	display: block;
}

.modal {
	z-index: 5;
	position: fixed;
	top: 0;
	left: 0;
	padding: 20svw;
	width: 100%;
	height: 100%;
}
</style>
