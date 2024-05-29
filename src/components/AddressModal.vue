<script setup>
import { ref } from 'vue';

const props = defineProps({
	address: {
		type: Object,
		required: true,
	},
});
const newAddress = ref(JSON.parse(JSON.stringify(props.address)));
const types = ref([]);
if (newAddress.value.AddressType) {
	types.value.push(newAddress.value.AddressType);
}
const emit = defineEmits(['submit', 'close']);
const submit = () => {
	emit('submit', {
		addressTypes: types.value,
		address: newAddress.value,
	});
};
const close = () => {
	emit('close');
};
</script>
<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<label>
				<input
					type="checkbox"
					id="mailing"
					value="mailing"
					v-model="types"
				/>
				<span>Mailing</span>
			</label>
			<label>
				<input
					type="checkbox"
					id="residential"
					value="residential"
					v-model="types"
				/>
				<span>Residential</span>
			</label>
			<label>
				<span>Street1</span>
				<input
					type="text"
					v-model="newAddress.Street1"
					required
				/>
			</label>
			<label>
				<span>Street2</span>
				<input
					type="text"
					v-model="newAddress.Street2"
				/>
			</label>
			<label>
				<span>Street3</span>
				<input
					type="text"
					v-model="newAddress.Street3"
				/>
			</label>
			<label>
				<span>CityName</span>
				<input
					type="text"
					v-model="newAddress.CityName"
				/>
			</label>
			<label>
				<span>StateCode</span>
				<input
					type="text"
					v-model="newAddress.StateCode"
				/>
			</label>
			<label>
				<span>ZipCode</span>
				<input
					type="text"
					v-model="newAddress.ZipCode"
				/>
			</label>
			<label>
				<span>AddressStartDate</span>
				<input
					type="text"
					v-model="newAddress.AddressStartDate"
				/>
			</label>
			<label>
				<span>AddressEndDate</span>
				<input
					type="text"
					v-model="newAddress.AddressEndDate"
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
