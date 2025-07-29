<script setup>
import {ref} from 'vue'
import useRecord from '@/composables/useRecord';
// import useMemberData from '@/composables/useMemberData';
import AddressModal from '@/components/AddressModal.vue';
import RacModal from './RacModal.vue';
import BenefitModal from './BenefitModal.vue';
import MedicareCoverageDetailsModal from './MedicareCoverageDetailsModal.vue';
import IncarcerationModal from './IncarcerationModal.vue';
import UppModal from './UppModal.vue';
import EsiModal from './EsiModal.vue';
import useTemplates from '@/composables/useTemplates';


const {
	newAddressTemplate,
	newRacTemplate,
	newBenefitTemplate,
	newIncarcerationTemplate,
	newUppTemplate,
} = useTemplates()

const {
	// currentRecordValidationObject,
	currentMemberValidationObject,
	currentMemberRecord, 
	// checkIdAgainstHOH, 
} = useRecord();

const edit = ref(false);
const newAddress = ref(null);
const oldAddressIndex = ref(null);
const newRac = ref(null);
const oldRacIndex = ref(null);
const newBenefit = ref(null);
const oldBenefitIndex = ref(null);
const newIncarceration = ref(null);
const oldIncarcerationIndex = ref(null)
const newUpp = ref(null);
const oldUppIndex = ref(null);
const newEsi = ref(null);
const oldEsiIndex = ref(null);
const newMedicareCoverage = ref(null);
const oldMedicareCoverageIndex = ref(null);

const submitAddress = function ({ addressTypes, address }) {
	const index = oldAddressIndex.value;
	
	addressTypes.forEach((type) => {
		const addy = {
			AddressType: type,
			...address,
		};
		addy.AddressType = type;
		currentMemberRecord.value['Address'].value.push(addy);
	});
	if (index !== null) {
		currentMemberRecord.value['Address'].value.splice(index, 1);
		oldAddressIndex.value = null;
	}
	newAddress.value = null;
	edit.value = false
};
const submitRac = function (rac) {
	const index = oldRacIndex.value;
	insertInArray(rac, 'Rac', index);
	oldRacIndex.value = null;
	edit.value = false
	newRac.value = null
}
const submitBenefit = function (benefit) {
	const index = oldBenefitIndex.value;
	insertInArray(benefit, 'Benefit', index);
	oldBenefitIndex.value = null;
	edit.value = false
	newBenefit.value = null
}
const submitIncarceration = function (incarceration) {
	const index = oldIncarcerationIndex.value;
	insertInArray(incarceration, 'Incarceration', index);
	oldIncarcerationIndex.value = null;
	edit.value = false
	newIncarceration.value = null
}
const submitUpp = function (upp) {
	const index = oldUppIndex.value;
	insertInArray(upp, 'UppPremiumInformation', index);
	oldUppIndex.value = null;
	edit.value = false
	newUpp.value = null
}
const submitEsi = function (esi) {
	const index = oldEsiIndex.value;
	insertInArray(esi, 'ESIPremiumInformation', index);
	oldEsiIndex.value = null;
	edit.value = false
	newEsi.value = null
}
const submitMedicareCoverage = function (esi) {
	const index = oldMedicareCoverageIndex.value;
	insertInArray(esi, 'MedicareCoverageDetails', index);
	oldMedicareCoverageIndex.value = null;
	edit.value = false
	newMedicareCoverage.value = null
}
const insertInArray = function(object, name, index) {
	if(index !== null) {
		currentMemberRecord.value[name].value.splice(index, 1, object);
	} else {
		currentMemberRecord.value[name].value.push(object);
	}
}

const addAddress = function (address, index) {
	newAddress.value = {
		...newAddressTemplate,
		...address
	};
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
const addIncarceration = function(incarceration, index) {
	newIncarceration.value = incarceration;
	if(index !== null) {
		oldIncarcerationIndex.value = index;
		edit.value = true;
	}
}

const addUpp = function(upp, index) {
	newUpp.value = upp;
	if(index !== null) {
		oldUppIndex.value = index;
		edit.value = true;
	}
}

const addEsi = function(esi, index) {
	newEsi.value = esi;
	if(index !== null) {
		oldEsiIndex.value = index;
		edit.value = true;
	}
}
const addMedicareCoverage = function(coverage, index) {
	newMedicareCoverage.value = coverage;
	if(index !== null) {
		oldMedicareCoverageIndex.value = index;
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
	newUpp.value = null
	oldUppIndex.value = null
	newEsi.value = null
	oldEsiIndex.value = null
	newMedicareCoverage.value = null
	oldMedicareCoverageIndex.value = null
	newIncarceration.value = null
	oldIncarcerationIndex.value = null
	edit.value = false
};

const deleteFromArray = function (arrayName, index) {
	currentMemberRecord.value[arrayName].value.splice(index, 1);
};

const labelStyle = function(object) {
	return object.required && (object.value === '' || object.value?.length === 0)
		? 'color: red;'
		: 'color: automatic'
}

</script>
<template>
<div class="section-left">
		<div v-for="item in Object.keys(currentMemberRecord)" :key="item">
			<h3 v-if="item === 'MemberId'">Member Data</h3>
			<h3 v-else-if="item === 'FosterCareParentName' && currentMemberRecord['FosterCareParentName'].included">Foster Care</h3>
			<h3 v-else-if="item === 'SubsidizedParentFirstName' && currentMemberRecord['SubsidizedParentFirstName'].included">Subsidized Adoption</h3>
			<h3 v-else-if="item === 'GuardianParentFirstName' && currentMemberRecord['GuardianParentFirstName'].included">Guardian</h3>
			<h3 v-else-if="item === 'DisabilityInitialEntitlementDate' && currentMemberRecord['DisabilityInitialEntitlementDate'].included">SSA Disability</h3>
			<h3 v-else-if="item === 'PrimaryMemberId' && currentMemberRecord['PrimaryMemberId'].included">Linked Members</h3>
			<h3 v-else-if="item === 'Indicator' && currentMemberRecord['Indicator'].included">Tobacco Survey Cessation</h3>
			<h3 v-else-if="item === 'MedicareIdType' && currentMemberRecord['MedicareIdType'].included">Medicare</h3>
			<h3 v-else-if="item === 'ExemptDuplicateIndicator'">Exempt Duplicate Indicator</h3>
			<label
				v-if="currentMemberRecord[item].included"
				:style="labelStyle(currentMemberRecord[item])"
			>
				<span>{{ item.includes('-') ? item.substring(0, item.indexOf('-')) : item }}</span>
				<span v-if="currentMemberRecord[item].required">*</span>
			</label>
			<div
				v-if="item === 'Address' && currentMemberRecord[item]"
				class="address"
			>
				<div v-for="(address, index) in currentMemberRecord['Address'].value" :key="index">
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
            <!-- <div v-else-if="item === 'MemberId'">
                <input
                    :type="currentMemberRecord[item].type"
                    v-model="currentMemberRecord[item].value"
                    :pattern="currentMemberRecord[item].pattern"
                    :required="currentMemberRecord[item].required"
                    @input="(currentMemberRecord[item].handler) ? currentMemberRecord[item].handler(currentMemberRecord[item], currentMemberRecord[item].value) : null"
                    @focusout="checkIdAgainstHOH"
                />
            </div> -->
			<div v-if="item === 'Rac' && currentMemberValidationObject['includeRac']">
				<button
					v-if="currentMemberValidationObject['includeRac'] === true"
					@click="addRac({...newRacTemplate}, null)"
				>
					Add Rac
				</button>
				<div v-if="currentMemberRecord['Rac'].included && currentMemberRecord['Rac'].value.length">
					<div v-for="(rac, index) in currentMemberRecord['Rac'].value" :key="index">
						<pre>RacCode {{ rac.RacCode }} : {{ rac.RacBeginDate }}–{{ rac.RacEndDate }}</pre>
						<button @click="deleteFromArray('Rac', index)">Delete</button>
						<button @click="addRac(rac, index)">Edit</button>
					</div>
				</div>
			</div>
			<div v-else-if="item === 'Benefit' && currentMemberRecord[item]">
				<button
					v-if="currentMemberValidationObject['includeBenefit'] === true"
					@click="addBenefit({...newBenefitTemplate}, null)"
				>
					Add Benefit
				</button>
				<div v-if="currentMemberValidationObject['includeBenefit'] === true">
					<!-- display Benefits -->
					<div v-for="(benefit, index) in currentMemberRecord['Benefit'].value" :key="index">
						<pre>BenefitSubType {{ benefit.BenefitSubType }} : {{ benefit.BenefitSubTypeStartDate }}–{{ benefit.BenefitSubTypeEndDate }}</pre>
						<button @click="deleteFromArray('Benefit', index)">Delete</button>
						<button @click="addBenefit(benefit, index)">Edit</button>
					</div>
				</div>
			</div>
			<div v-else-if="item === 'MedicareCoverageDetails' && currentMemberRecord[item]">
				<button
					v-if="currentMemberValidationObject['includeMedicareEligibility'] === true"
					@click="addMedicareCoverage({
						MedicareCoverageType: '',
						MedicareCoverageStartDate: '',
						MedicareCoverageEndDate: '',
					}, null)"
				>
					Add Medicare Coverage Details
				</button>
				<div v-if="currentMemberValidationObject['includeMedicareEligibility'] === true">
					<div v-for="(coverage, index) in currentMemberRecord['MedicareCoverageDetails'].value" :key="index">
						<pre>Medicare: {{ coverage.MedicareCoverageType }} : {{ coverage.MedicareCoverageStartDate }}–{{ coverage.MedicareCoverageEndDate }}</pre>
						<button @click="deleteFromArray('MedicareCoverageDetails', index)">Delete</button>
						<button @click="addMedicareCoverage(coverage, index)">Edit</button>
					</div>
				</div>
			</div>
			<div v-else-if="item === 'Incarceration' && currentMemberRecord[item]">
				<button
					v-if="currentMemberValidationObject['includeIncarceration'] === true"
					@click="addIncarceration({...newIncarcerationTemplate}, null)"
				>
					Add Incarceration
				</button>
				<div v-if="currentMemberValidationObject['includeIncarceration'] === true">
					<div v-for="(incarceration, index) in currentMemberRecord['Incarceration'].value" :key="index">
						<pre>{{ incarceration["IncarcerationID"]}}: {{ incarceration.StartDate }}–{{ incarceration.EndDate }}</pre>
						<button @click="deleteFromArray('Incarceration', index)">Delete</button>
						<button @click="addIncarceration(incarceration, index)">Edit</button>
					</div>
				</div>
			</div>
			<div v-else-if="item === 'UppPremiumInformation' && currentMemberRecord[item]">
				<button
					v-if="currentMemberValidationObject['includeUppPremiumInformation'] === true"
					@click="addUpp({...newUppTemplate}, null)"
				>
					Add Upp Premium
				</button>
				<div v-if="currentMemberValidationObject['includeUppPremiumInformation'] === true">
					<div v-for="(upp, index) in currentMemberRecord['UppPremiumInformation'].value" :key="index">
						<pre>{{ upp.UppProgramStartDate }}–{{ upp.UppProgramEndDate }}</pre>
						<button @click="deleteFromArray('UppPremiumInformation', index)">Delete</button>
						<button @click="addUpp(upp, index)">Edit</button>
					</div>
				</div>
			</div>
			<div v-else-if="item === 'ESIPremiumInformation' && currentMemberRecord[item]">
				<button
					v-if="currentMemberValidationObject['includeEsiPremiumInformation'] === true"
					@click="addEsi({...newEsiTemplate}, null)"
				>
					Add ESI Premium
				</button>
				<div v-if="currentMemberValidationObject['includeEsiPremiumInformation'] === true">
					<div v-for="(esi, index) in currentMemberRecord['ESIPremiumInformation'].value" :key="index">
						<pre>{{ esi.ESIProgramStartDate }}–{{ esi.ESIProgramEndDate }}</pre>
						<button @click="deleteFromArray('ESIPremiumInformation', index)">Delete</button>
						<button @click="addEsi(esi, index)">Edit</button>
					</div>
				</div>
			</div>
			<select
				v-else-if="currentMemberRecord[item].included && currentMemberRecord[item].options"
				v-model="currentMemberRecord[item].value"
			>
				<option
					v-for="(option, index) in currentMemberRecord[item].options.labels"
					:value="currentMemberRecord[item].options.values[index]"
					:key="index"
				>{{ currentMemberRecord[item].options.labels[index] }}</option>
			</select>
			<input
				v-else-if="currentMemberRecord[item].included && currentMemberRecord[item].type !== 'modal'"
				:type="currentMemberRecord[item].type"
				v-model="currentMemberRecord[item].value"
				:pattern="currentMemberRecord[item].pattern"
				:required="currentMemberRecord[item].required"
				@input="(currentMemberRecord[item].handler) ? currentMemberRecord[item].handler(currentMemberRecord[item], currentMemberRecord[item].value) : null"
			/>
		</div>
		<!-- <pre>{{ currentMemberRecord }}</pre> -->
		<!-- <p v-else>No Records Yet, Add Record to start</p> -->
	</div>
	<div class="section-right">
		<!-- <div class="section-booleans">
			<div v-if="Object.keys(currentMemberValidationObject).length">
				<input
					type="button"
					value="Populate Default Required Fields"
					@click="createRandomRecord"
				/>
			</div>
			<label
				v-for="item in Object.keys(currentMemberValidationObject)" :key="item"
				@click="toggleMemberIncludes(item)"
			>
				<input type="checkbox" v-model="currentMemberValidationObject[item]"/>
				<span>{{ item }}</span>
			</label>
		</div> -->
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
	<IncarcerationModal
		v-if="newIncarceration"
		:incarceration="newIncarceration"
		:edit="edit"
		@submit="submitIncarceration"
		@close="cancelModal"
	/>
	<UppModal
		v-if="newUpp"
		:upp="newUpp"
		:edit="edit"
		@submit="submitUpp"
		@close="cancelModal"
	/>
	<EsiModal
		v-if="newEsi"
		:esi="newEsi"
		:edit="edit"
		@submit="submitEsi"
		@close="cancelModal"
	/>
	<MedicareCoverageDetailsModal
		v-if="newMedicareCoverage"
		:coverage="newMedicareCoverage"
		:edit="edit"
		@submit="submitMedicareCoverage"
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
</style>