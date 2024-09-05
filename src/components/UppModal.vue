<script setup>

import { ref } from 'vue';

const props = defineProps({
	upp: {
		type: Object,
		required: true,
	},
});
const newUpp = ref(JSON.parse(JSON.stringify(props.upp)));

const emit = defineEmits(['submit', 'close']);
const submit = () => {
	emit('submit', newUpp.value);
};
const close = () => {
	emit('close');
};
</script>
<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<label>
				<span>UppProgramStartDate</span>
				<input
					type="date"
					v-model="newUpp.UppProgramStartDate"
					required
				/>
			</label>
			<label>
				<span>UppProgramEndDate</span>
				<input
					type="date"
					v-model="newUpp.UppProgramEndDate"
					required
				/>
			</label>
			<label>
				<span>BillMonth</span>
				<input
					type="text"
					v-model="newUpp.BillMonth"
					required
				/>
			</label>
			<label>
				<span>UppPremiumAmt</span>
				<input
					type="number"
					v-model="newUpp.UppPremiumAmt"
					required
				/>
			</label>
			<button type="submit">Update</button>
			<button @click="close">Cancel</button>
		</form>
	</div>
</template>

<style scoped>
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
	background-color: #bfc;
}
</style>
