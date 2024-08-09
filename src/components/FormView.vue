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

//temp
const includeMedicare = ref(false);

onUpdated(() => {
	validateRecords();
})
const edit = ref(false)
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
	edit.value = false
};
const submitRac = function (rac) {
	const index = oldRacIndex.value;
	if(index !== null) {
		currentEligibilityRecord.value['Rac'].value.splice(index, 1, rac);
	} else {
		currentEligibilityRecord.value['Rac'].value.push(rac);
	}
	oldRacIndex.value = null;
	edit.value = false
	newRac.value = null
}
const submitBenefit = function (benefit) {
	const index = oldBenefitIndex.value;
	if(index !== null) {
		currentEligibilityRecord.value['Benefit'].value.splice(index, 1, benefit);
	} else {
		currentEligibilityRecord.value['Benefit'].value.push(benefit);
	}
	oldBenefitIndex.value = null;
	edit.value = false
	newBenefit.value = null
}
const deleteFromArray = function (arrayName, index) {
	currentEligibilityRecord.value[arrayName].value.splice(index, 1);
};
const addAddress = function (address, index) {
	newAddress.value = address;
	if (index !== null) {
		oldAddressIndex.value = index;
		edit.value = true;
	}
};
const addRac = function (rac, index) {
	newRac.value = rac;
	if(index !== null) {
		oldRacIndex.value = index
		edit.value = true;
	} 
};
const addBenefit = function (benefit, index) {
	newBenefit.value = benefit;
	if(index !== null) {
		oldBenefitIndex.value = index;
		edit.value = true;
	}
}
const cancelModal = function () {
	newAddress.value = null;
	oldAddressIndex.value = null;
	newRac.value = null;
	oldRacIndex.value = null;
	oldBenefitIndex.value = null;
	newBenefit.value = null
	edit.value = false
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
			<h3 v-if="item === 'ErepCaseId'">Basic Fields</h3>
			<h3 v-else-if="item === 'MotherId' && currentEligibilityRecord['MotherId'].included">Unborn Links</h3>
			<h3 v-else-if="item === 'Chip5Percent' && currentEligibilityRecord['Chip5Percent'].included">Chip Premium Details</h3>
			<h3 v-else-if="item === 'HohMemberId-RelationshipDetails' && currentEligibilityRecord['HohMemberId-RelationshipDetails'].included">Case Head Releationship Details</h3>
			<h3 v-else-if="item === 'MemberId'">Member Data</h3>
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
					Add Rac - testing
				</button>
				<div v-if="currentEligibilityRecord['Rac'].included && currentEligibilityRecord['Rac'].value.length">
					<label>RAC</label>
					<div v-for="(rac, index) in currentEligibilityRecord['Rac'].value" :key="index">
						<pre>RacCode {{ rac.RacCode }} : {{ rac.RacBeginDate }}–{{ rac.RacEndDate }}</pre>
						<button @click="deleteFromArray('Rac', index)">Delete</button>
						<button @click="addRac(rac, index)">Edit</button>
					</div>
				</div>
			</div>
			<div v-else-if="item === 'Benefit' && currentEligibilityRecord[item]">
				<button
					v-if="currentRecordValidationObject['includeBenefit'] === true"
					@click="addBenefit({...newBenefitTemplate}, null)"
				>
					Add Benefit - testing
				</button>
				<div>
					<!-- display Benefits -->
					<div v-for="(benefit, index) in currentEligibilityRecord['Benefit'].value" :key="index">
						<pre>BenefitSubType {{ benefit.BenefitSubType }} : {{ benefit.BenefitSubTypeStartDate }}–{{ benefit.BenefitSubTypeEndDate }}</pre>
						<button @click="deleteFromArray('Benefit', index)">Delete</button>
						<button @click="addBenefit(benefit, index)">Edit</button>
					</div>
				</div>
			</div>
			<input
				:type="currentEligibilityRecord[item].type"
				v-model="currentEligibilityRecord[item].value"
				:pattern="currentEligibilityRecord[item].type === 'tel' ? '\\d{9,10}' : null"
				:required="currentEligibilityRecord[item].required"
				v-else-if="currentEligibilityRecord[item].included"
			/>
		</div>
		<pre v-if="currentEligibilityRecord">{{ currentEligibilityRecord }}</pre>
		<p v-else>No Records Yet, Add Record to start</p>
	</div>
	<div class="section-middle" v-if="includeMedicare">
		<p>Well hello middle!</p>
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
		:edit="edit"
		@submit="submitRac"
		@close="cancelModal"
	/>
	<BenefitModal
		v-if="newBenefit"
		:benefit="newBenefit"
		:edit="edit"
		@submit="submitBenefit"
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
	width: 40%;
}
.section-middle {
	width: 40%;
	position:absolute;
	top: 10%;
	left: 40%;
}
.section-right {
	width: 20%;
	position: fixed;
	top: 15%;
	right: 10%;
}
</style>
