<script setup>
import {ref} from 'vue'
import useRecord from '@/composables/useRecord';
// import useMemberData from '@/composables/useMemberData';
import AddressModal from '@/components/AddressModal.vue';
import useTemplates from '@/composables/useTemplates';
import useOptions from '@/composables/useOptions'
import useModal from '@/composables/useModal'

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

const { setModal } = useModal()

const { addressByCounty } = useOptions();

const edit = ref(false);
const newAddress = ref(null);
const oldAddressIndex = ref(null);
const countyAddress = ref(null);

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

const selectCounty = function () {
	if(countyAddress.value) {
		const address = {
            Street1: addressByCounty[countyAddress.value].Street1,
            Street2: addressByCounty[countyAddress.value].Street2,
            Street3: addressByCounty[countyAddress.value].Street3,
            CityName: addressByCounty[countyAddress.value].CityName,
            StateCode: addressByCounty[countyAddress.value].StateCode,
            ZipCode: addressByCounty[countyAddress.value].ZipCode,
            ZipCodeExtension: addressByCounty[countyAddress.value].ZipCodeExtension,
            CountyCode: addressByCounty[countyAddress.value].CountyCode,
            AddressStartDate: addressByCounty[countyAddress.value].AddressStartDate,
            AddressEndDate: addressByCounty[countyAddress.value].AddressEndDate,
        }
		submitAddress({
			addressTypes: ['Residential', 'Mailing'], 
			address
		})
		countyAddress.value = null;
	}
	
	// console.log('addressByCounty[countyAddress.value]', addressByCounty[countyAddress.value])
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
	setModal('Rac', rac, !!index, index);
};
const addBenefit = function (benefit, index) {
	setModal('Benefit', benefit, !!index, index);
}
const addIncarceration = function(incarceration, index) {
	setModal('Incarceration', incarceration, !!index, index);
}

const addUpp = function(upp, index) {
	setModal('UppPremiumInformation', upp, !!index, index);
}

const addEsi = function(esi, index) {
	setModal('ESIPremiumInformation', esi, !!index, index);
}
const addMedicareCoverage = function(coverage, index) {
	setModal('MedicareCoverageDetails', coverage, !!index, index);
}

const cancelModal = function () {
	newAddress.value = null;
	oldAddressIndex.value = null;
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
					style="margin-top: 12px;"
				>
					Input Address
				</button>
				<p>OR</p>
				<select v-model="countyAddress">
					<option
						v-for="(option, index) in Object.keys(addressByCounty)"
						:key="index"
						:value="option"
					>{{ option }}</option>
				</select>
				<button
					@click="selectCounty"
				>
					Add Address by County
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
	
</template>
<style scoped>
label {
	display: block;
}
.address {
	outline: 1px;
}
</style>