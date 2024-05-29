<script setup>
import useRecord from '@/composables/useRecord';
import { ref, onUpdated } from 'vue';
import AddressModal from '@/components/AddressModal.vue';
import useValidation from '@/composables/useValidation';
const {validateRecords} = useValidation();

const { currentEligibilityRecord, addNewRecord } = useRecord();
const newAddressTemplate = {
	Street1: '',
	Street2: '',
	Street3: '',
	CityName: '',
	StateCode: '',
	ZipCode: '',
	AddressStartDate: '',
	AddressEndDate: '',
};

onUpdated(() => {
	validateRecords();
})
const newAddress = ref(null);
const oldAddressIndex = ref(null);
const racModal = ref(false);
const submitAddress = function ({ addressTypes, address }) {
	const index = oldAddressIndex.value;
	// needs logic to separate single address into multiple addresses with different types
	addressTypes.forEach((type) => {
		const addy = {
			AddressType: type,
			...address,
		};
		addy.AddressType = type;
		currentEligibilityRecord.value['Address'].value.push(addy);
	});
	if (index !== null) {
		currentEligibilityRecord.value['Address'].value.splice(index, 1);
		oldAddressIndex.value = null;
	}
	newAddress.value = null;
};
const deleteFromArray = function (arrayName, index) {
	arrayName === 'address'
		? currentEligibilityRecord.value['Address'].value.splice(index, 1)
		: currentEligibilityRecord.value['racstufffixlater'].splice(index, 1);
};
const submitRac = function (rac) {
	// take object and create an array of objects based on the dates. This function needs to be aware of the system date
};
const addAddress = function (address, index) {
	// change boolean, needs to know whether it's editing and old address or creating a new one
	newAddress.value = address;
	console.log('new address?', newAddress.value);
	if (index !== null) {
		console.log('index?', index);
		oldAddressIndex.value = index;
	}
};
const addRac = function () {
	// modal
};
const cancelModal = function () {
	racModal.value = false;
	newAddress.value = null;
	oldAddressIndex.value = null;
};
</script>
<template>
	<button
		@click="addNewRecord"
		id="record-button"
	>
		+
	</button>
	<div class="section-left">
		<div v-for="item in Object.keys(currentEligibilityRecord)" :key="item">
			<label>
				<span>{{ item }}</span>
				<span v-if="currentEligibilityRecord[item].required">*</span>
			</label>
			<div
				v-if="item === 'Address'"
				class="address"
			>
				<div v-for="(address, index) in currentEligibilityRecord['Address'].value" :key="index">
					<pre>{{ address }}</pre>
					<button @click="deleteFromArray('address', index)">Delete</button>
					<button @click="addAddress(address, index)">Edit</button>
				</div>
				<button
					@click="addAddress({ ...newAddressTemplate }, null)"
					:disabled="newAddress"
				>
					Add Address
				</button>
			</div>
			<div v-else-if="item === 'Rac'">
				<button>Add Rac - not implemented</button>
				<div
					class="modal"
					v-if="racModal"
				>
					<!-- needs date picking logic in addition to pushing a complete object to an array -->
				</div>
			</div>
			<input
				:type="currentEligibilityRecord[item].type"
				v-model="currentEligibilityRecord[item].value"
				:required="currentEligibilityRecord[item].required"
				v-else
			/>
		</div>
		<pre v-if="currentEligibilityRecord">{{ currentEligibilityRecord }}</pre>
		<p v-else>No Records Yet, Add Record to start</p>
	</div>
	<div class="section-right">
		<!--    <p>To use this form:</p>-->
		<!--    <p>If you want to make a formerly populated record value empty, put null as the new value</p>-->
		<!--    <p>You can navigate between records on the List Tab</p>-->
	</div>
	<AddressModal
		v-if="newAddress"
		:address="newAddress"
		@submit="submitAddress"
		@close="newAddress = null"
	/>
</template>
<style scoped>
label {
	display: block;
}

.address {
	outline: 1px;
}

#record-button {
	position: fixed;
	top: 5%;
	border-radius: 50%;
	background-color: lightgreen;
	font-size: larger;
	margin-left: 50svw;
	padding: 10px 15px;
}

.section {
	display: inline-block;
}
.section-left {
	width: 80%;
}
.section-right {
	width: 20%;
	position: fixed;
	top: 15%;
	right: 20%;
}
</style>
