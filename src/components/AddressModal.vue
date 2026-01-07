<script setup>
import { ref, computed } from 'vue';
import useOptions from '../composables/useOptions';
import useModal from '../composables/useModal'

const {
	currentModal,
	submitAddress,
	cancelModal,
} = useModal();

const {countyOptions} = useOptions();
const types = ref([]);
if (currentModal.value.object.AddressType) {
	types.value.push(currentModal.value.object.AddressType);
}
const checkType = computed(() => {
	if(types.value.length) {
		return true;
	}
	return false
})

const submit = () => {
	if(checkType.value) {
		submitAddress({addressTypes: types.value, address: currentModal.value.object});
	}
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
				<input
					type="checkbox"
					id="guardian"
					value="Guardian"
					v-model="types"
				/>
				<span>Guardian</span>
			</label>
			<label class="input-grid">
				<span>Street1</span>
				<input
					type="text"
					v-model="currentModal.object.Street1"
					required
				/>
			</label>
			<label class="input-grid">
				<span>Street2</span>
				<input
					type="text"
					v-model="currentModal.object.Street2"
				/>
			</label>
			<label class="input-grid">
				<span>Street3</span>
				<input
					type="text"
					v-model="currentModal.object.Street3"
				/>
			</label>
			<label class="input-grid">
				<span>CityName</span>
				<input
					type="text"
					v-model="currentModal.object.CityName"
					required
				/>
			</label>
			<label class="input-grid">
				<span>StateCode</span>
				<input
					type="text"
					v-model="currentModal.object.StateCode"
					pattern="[A-Z]{2}"
					required
				/>
			</label>
			<label class="input-grid">
				<span>ZipCode</span>
				<input
					type="text"
					v-model="currentModal.object.ZipCode"
					required
				/>
			</label>
			<label class="input-grid">
				<span>ZipCodeExtension</span>
				<input
					type="text"
					v-model="currentModal.object.ZipCodeExtension"
				/>
			</label>
			<label class="input-grid">
				<span>County Code</span>
				<select
				v-model="currentModal.object.CountyCode"
				>
					<option
						v-for="(option, index) in countyOptions.labels"
						:value="countyOptions.values[index]"
						:key="index"
					>{{ countyOptions.labels[index] }}</option>
				</select>
				<span> (not required but highly recommended)</span>
			</label>
			<label class="input-grid">
				<span>AddressStartDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.AddressStartDate"
					required
				/>
			</label>
			<label class="input-grid">
				<span>AddressEndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.AddressEndDate"
					required
				/>
			</label>
			<button type="submit" >Update</button>
			<button @click="cancelModal">Cancel</button>
			<div v-if="!checkType">Please select one or more address types</div>
		</form>
	</div>
</template>


