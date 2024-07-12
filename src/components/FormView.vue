<script setup>
import useRecord from '@/composables/useRecord';
import { ref, onUpdated } from 'vue';
import AddressModal from '@/components/AddressModal.vue';
import RacModal from './RacModal.vue';
import BenefitModal from './BenefitModal.vue';
import useValidation from '@/composables/useValidation';
import useTemplates from '@/composables/useTemplates'
const {validateRecords} = useValidation();
const {newAddressTemplate, newRacTemplate, newBenefitTemplate} = useTemplates()

const {
	currentEligibilityRecord,
	addNewRecord,
	currentRecordValidationObject,
	toggleIncluded,
} = useRecord();


onUpdated(() => {
	validateRecords();
})
const newAddress = ref(null);
const oldAddressIndex = ref(null);
const newRac = ref(null);
const oldRacIndex = ref(null);
const newBenefit = ref(null);
const oldBenefitIndex = ref(null); 
const submitAddress = function ({ addressTypes, address }) {
	const index = oldAddressIndex.value;
	
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
	currentEligibilityRecord.value[arrayName].value.splice(index, 1);
};
const addAddress = function (address, index) {
	newAddress.value = address;
	if (index !== null) {
		oldAddressIndex.value = index;
	}
};
const addRac = function (rac, index) {
	newRac.value = rac;
	if(index !== null) {
		oldRacIndex.value = index
	}
};
const submitRac = function () {}
const cancelModal = function () {
	newAddress.value = null;
	oldAddressIndex.value = null;
	newRac.value = null;
	oldRacIndex.value = null;
	oldBenefitIndex.value = null;
	newBenefit.value = null
};
const addBenefit = function (benefit, index) {
	newBenefit.value = benefit;
	if(index !== null) {
		oldBenefitIndex.value = index;
	}
}
// const submitBenefit = function () {}
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
			<label v-if="currentEligibilityRecord[item].included">
				<span>{{ item.includes('-') ? item.substring(0, item.indexOf('-')) : item }}</span>
				<span v-if="currentEligibilityRecord[item].required">*</span>
			</label>
			<div
				v-if="item === 'Address' && currentEligibilityRecord[item]"
				class="address"
			>
				<div v-for="(address, index) in currentEligibilityRecord['Address'].value" :key="index">
					<pre>{{ address }}</pre>
					<button @click="deleteFromArray('Address', index)">Delete</button>
					<button @click="addAddress(address, index)">Edit</button>
				</div>
				<button
					@click="addAddress({ ...newAddressTemplate }, null)"
					:disabled="newAddress"
				>
					Add Address
				</button>
			</div>
			<div v-else-if="item === 'Rac' && currentEligibilityRecord[item]">
				<button
					v-if="currentRecordValidationObject['includeRac'] === true"
					@click="addRac({...newRacTemplate}, null)"
				>
					Add Rac - not implemented
				</button>
				<div>
					<!-- display RACs -->
				</div>
			</div>
			<div v-else-if="item === 'Benefit' && currentEligibilityRecord[item]">
				<button
					v-if="currentRecordValidationObject['includeBenefit'] === true"
					@click="addBenefit({...newBenefitTemplate}, null)"
				>
					Add Benefit - not implemented
				</button>
				<div>
					<!-- display Benefits -->
				</div>
			</div>
			<input
				:type="currentEligibilityRecord[item].type"
				v-model="currentEligibilityRecord[item].value"
				:pattern="currentEligibilityRecord[item].type === 'tel' ? '[0-9]*' : ''"
				:required="currentEligibilityRecord[item].required"
				v-else-if="currentEligibilityRecord[item].included"
			/>
		</div>
		<pre v-if="currentEligibilityRecord">{{ currentEligibilityRecord }}</pre>
		<p v-else>No Records Yet, Add Record to start</p>
	</div>
	<div class="section-right">
		<p>To use this form:</p>
		<p>If you want to make a formerly populated record value empty, put null as the new value</p>
		<p>You can navigate between records on the List Tab</p>
		<div class="section-booleans">
			<label
				v-for="item in Object.keys(currentRecordValidationObject)" :key="item"
				@click="toggleIncluded(item)"
			>
				<input type="checkbox" v-model="currentRecordValidationObject[item]"/>
				<span>{{ item }}</span>
			</label>
		</div>
	</div>
	<AddressModal
		v-if="newAddress"
		:address="newAddress"
		@submit="submitAddress"
		@close="cancelModal"
	/>
	<RacModal
		v-if="newRac"
		:rac="newRac"
		@submit="submitRac"
		@close="cancelModal"
	/>
	<BenefitModal
		v-if="newBenefit"
		:benefit="newBenefit"
		@submit="submitRac"
		@close="cancelModal"
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
	top: 2%;
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
