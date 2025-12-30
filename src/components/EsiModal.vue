<script setup>
import useModal from '../composables/useModal'

const {
	currentModal,
	submitObject,
	cancelModal,
} = useModal();

const submit = () => {
	submitObject();
};
const close = () => {
	cancelModal();
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
					v-model="currentModal.object.ESIProgramStartDate"
					required
				/>
			</label>
			<label>
				<span>ESIProgramEndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.ESIProgramEndDate"
					required
				/>
			</label>
			<label>
				<span>BillMonth</span>
				<input
					type="text"
					v-model="currentModal.object.BillMonth"
					required
				/>
			</label>
			<label>
				<span>ESIPremiumAmt</span>
				<input
					type="number"
					v-model="currentModal.object.ESIPremiumAmt"
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
