<script setup>
import { ref, computed } from 'vue';
import useOptions from '../composables/useOptions';

const props = defineProps({
	address: {
		type: Object,
		required: true,
	},
});
const {countyOptions} = useOptions();
const newAddress = ref(JSON.parse(JSON.stringify(props.address)));
const types = ref([]);
if (newAddress.value.AddressType) {
	types.value.push(newAddress.value.AddressType);
}

const checkType = computed(() => {
	if(types.value.length) {
		return true;
	}
	return false
})
const emit = defineEmits(['submit', 'close']);
const submit = () => {
	if(types.value.length) {
		emit('submit', {
		addressTypes: types.value,
		address: newAddress.value,
	});
	}
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
					value="Mailing"
					v-model="types"
				/>
				<span>Mailing</span>
			</label>
			<label>
				<input
					type="checkbox"
					id="residential"
					value="Residential"
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
					required
				/>
			</label>
			<label>
				<span>StateCode</span>
				<input
					type="text"
					v-model="newAddress.StateCode"
					pattern="[A-Z]{2}"
					required
				/>
			</label>
			<label>
				<span>ZipCode</span>
				<input
					type="text"
					v-model="newAddress.ZipCode"
					required
				/>
			</label>
			<label>
				<span>ZipCodeExtension</span>
				<input
					type="text"
					v-model="newAddress.ZipCodeExtension"
				/>
			</label>
			<label>
				<span>County Code</span>
				<select
				v-model="newAddress.CountyCode"
				>
					<option
						v-for="(option, index) in countyOptions.labels"
						:value="countyOptions.values[index]"
						:key="index"
					>{{ countyOptions.labels[index] }}</option>
				</select>
				<span> (not required but highly recommended)</span>
			</label>
			<label>
				<span>AddressStartDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newAddress.AddressStartDate"
					required
				/>
			</label>
			<label>
				<span>AddressEndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newAddress.AddressEndDate"
					required
				/>
			</label>
			<button type="submit">Update</button>
			<button @click="close">Cancel</button>
			<div v-if="!checkType">Please select one or more address types</div>
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
