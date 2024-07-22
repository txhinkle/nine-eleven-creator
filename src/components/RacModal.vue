<script setup>
import { ref } from 'vue';
import useValidation from '@/composables/useValidation';
const {removeEmptyValuesFromObjects} = useValidation();

const props = defineProps({
	rac: {
		type: Object,
		required: true,
	},
	edit: {
		type: Boolean,
		required: false,
	}
});
const newRac = ref(JSON.parse(JSON.stringify(props.rac)));
// include Booleans to turn on/off required aspect and to show/hide elements
const includePregnancy = ref(props.edit && props.rac.Pregnancy);
const includeIncome = ref()
const includeAssistance = ref(false)
const includeCopayExemptDetails = ref(false)
const includePatientLiability = ref(false)
const includeSpenddown = ref(false)
// spenddownBills is a repeatable loop within spenddown. This is not being implemented at this time. Can be added to "expanded functionality" list
const includeSpm = ref(false)
const includeMedicareDualEligibility = ref(false)
const emit = defineEmits(['submit', 'close']);

const emptySections = function(shortRac) {
	const rac = removeEmptyValuesFromObjects(shortRac)
	// let rac = {...shortRac}
	// if(!includePregnancy.value) {
	// 	delete rac.Pregnancy
	// } else {
	// 	rac.Pregnancy = removeEmptyValuesFromObjects(rac.Pregnancy)
	// }
	// if(!includeIncome.value) delete rac.Countable
	// else rac.Countable = removeEmptyValuesFromObjects(rac.Countable)
	// if(!includeAssistance.value) delete rac.MemberIdsForAssistanceUnit
	// else rac.MemberIdsForAssistanceUnit = removeEmptyValuesFromObjects(rac.MemberIdsForAssistanceUnit)
	// if(!includeCopayExemptDetails.value) delete rac.CopayExemptDetails
	// if(!includePatientLiability.value) delete rac.PatientLiability
	// if(!includeSpenddown.value) delete rac.Spenddown
	// else rac.Spenddown = removeEmptyValuesFromObjects(rac.Spenddown)
	// if(!includeSpm.value) delete rac.SPMDetails
	// if(!includeMedicareDualEligibility.value) delete rac.MedicareDualEligibilityStatusCode
	return rac
}

const submit = () => {
	const shortRac = emptySections(newRac.value)
	emit('submit', shortRac);
};
const close = () => {
	emit('close');
};
</script>
<template>
	<div class="modal">
		<div class="radios">
			<label>
				<span>Include Pregnancy</span>
				<input type="checkbox" v-model="includePregnancy" />
			</label>
			<label>
				<span>Include Income</span>
				<input type="checkbox" v-model="includeIncome" />
			</label>
			<label>
				<span>Include MemberIdsForAssistance</span>
				<input type="checkbox" v-model="includeAssistance" />
			</label>
			<label>
				<span>Include CopayExempt</span>
				<input type="checkbox" v-model="includeCopayExemptDetails" />
			</label>
			<label>
				<span>Include PatientLiability</span>
				<input type="checkbox" v-model="includePatientLiability" />
			</label>
			<label>
				<span>Include Spenddown</span>
				<input type="checkbox" v-model="includeSpenddown" />
			</label>
			<label>
				<span>Include SPM</span>
				<input type="checkbox" v-model="includeSpm" />
			</label>
			<label>
				<span>Include includeMedicareDualEligibility</span>
				<input type="checkbox" v-model="includeMedicareDualEligibility" />
			</label>
		</div>
		<form @submit.prevent="submit">
			<label>
				<span>RacCode</span>
				<input
					type="text"
					v-model="newRac.RacCode"
					required
				/>
			</label>
			<label>
				<span>RacBeginDate</span>
				<input
					type="date"
					v-model="newRac.RacBeginDate"
					required
				/>
			</label>
			<label>
				<span>RacEndDate</span>
				<input
					type="date"
					v-model="newRac.RacEndDate"
					required
				/>
			</label>
			<label>
				<span>RacIssuanceDate</span>
				<input
					type="date"
					v-model="newRac.RacIssuanceDate"
					required
				/>
			</label>
			<div v-if="includePregnancy">
				<label>
					<span>PregnancyStatus</span>
					<input
						type="text"
						v-model="newRac.Pregnancy.PregnancyStatus"
						required
					/>
				</label>
				<label>
					<span>PregnancyStartDate</span>
					<input
						type="date"
						v-model="newRac.Pregnancy.PregnancyStartDate"
					/>
				</label>
				<label>
					<span>PregnancyDueDate</span>
					<input
						type="date"
						v-model="newRac.Pregnancy.PregnancyDueDate"
					/>
				</label>
				<label>
					<span>PregnancyEndDate</span>
					<input
						type="date"
						v-model="newRac.Pregnancy.PregnancyEndDate"
					/>
				</label>
			</div>
			<div v-if="includeIncome">
				<label>
					<span>Income</span>
					<input
						type="text"
						v-model="newRac.Countable.Income"
						required
					/>
				</label>
			</div>
			<div v-if="includeAssistance">
				<label>
					<span>ContributingMemberId</span>
					<input
						type="text"
						v-model="newRac.MemberIdsForAssistanceUnit.ContributingMemberId"
						required
					/>
				</label>
				<label>
					<span>RelationshipCode</span>
					<input
						type="text"
						v-model="newRac.MemberIdsForAssistanceUnit.RelationshipCode"
						required
					/>
				</label>
			</div>
			<div v-if="includeCopayExemptDetails">
				<label>
					<span>CopayExemptIndicator</span>
					<input
						type="text"
						v-model="newRac.CopayExemptDetails.CopayExemptIndicator"
						required
					/>
				</label>
			</div>
			<div v-if="includePatientLiability">
				<label>
					<span>Amount</span>
					<input
						type="text"
						v-model="newRac.PatientLiability.Amount"
						required
					/>
				</label>
			</div>
			<div v-if="includeSpenddown">
				<label>
					<span>SpenddownIndicator</span>
					<input
						type="text"
						v-model="newRac.Spenddown.Information.SpenddownIndicator"
						required
					/>
				</label>
				<label>
					<span>MetDate</span>
					<input
						type="date"
						v-model="newRac.Spenddown.Information.MetDate"
					/>
				</label>
				<label>
					<span>Amount</span>
					<input
						type="text"
						v-model="newRac.Spenddown.Information.Amount"
						required
					/>
				</label>
				<label>
					<span>BillId</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillId"
						required
					/>
				</label>
				<label>
					<span>BillAccountNumber</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillAccountNumber"
						required
					/>
				</label>
				<label>
					<span>BillStartDate</span>
					<input
						type="date"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillStartDate"
						required
					/>
				</label>
				<label>
					<span>BillEndDate</span>
					<input
						type="date"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillEndDate"
						required
					/>
				</label>
				<label>
					<span>ServiceType</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.ServiceType"
						required
					/>
				</label>
				<label>
					<span>PrescriptionNumber</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.PrescriptionNumber"
					/>
				</label>
				<label>
					<span>ErepCurrentUsedAmount</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.ErepCurrentUsedAmount"
						required
					/>
				</label>
				<label>
					<span>TotalBill</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.TotalBill"
						required
					/>
				</label>
				<label>
					<span>BillingProviderName</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderName"
						required
					/>
				</label>
				<label>
					<span>BillingProviderStreet1</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet1"
						required
					/>
				</label>
				<label>
					<span>BillingProviderStreet2</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet2"
						required
					/>
				</label>
				<label>
					<span>BillingProviderStreet3</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet3"
						required
					/>
				</label>
				<label>
					<span>BillingProviderCityName</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderCityName"
						required
					/>
				</label>
				<label>
					<span>BillingProviderStateCode</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderStateCode"
						required
					/>
				</label>
				<label>
					<span>BillingProviderZipCode</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderZipCode"
						required
					/>
				</label>
				<label>
					<span>BillingProviderZipCodeExtension</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderZipCodeExtension"
					/>
				</label>
				<label>
					<span>BillingProviderCountyCode</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BillingProviderCountyCode"
					/>
				</label>
				<label>
					<span>BilledPersonSuffix</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BilledPersonSuffix"
					/>
				</label>
				<label>
					<span>BilledPersonFirstName</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BilledPersonFirstName"
						required
					/>
				</label>
				<label>
					<span>BilledPersonMiddleName</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BilledPersonMiddleName"
					/>
				</label>
				<label>
					<span>BilledPersonLastName</span>
					<input
						type="text"
						v-model="newRac.Spenddown.SpenddownBills.BillDetails.BilledPersonLastName"
						required
					/>
				</label>
			</div>
			<div v-if="includeSpm">
				<label>
					<span>SPMIndicator</span>
					<input
						type="text"
						v-model="newRac.SPMDetails.SPMIndicator"
						required
					/>
				</label>
			</div>
			<div v-if="includeMedicareDualEligibility">
				<label>
					<span>MedicareDualEligibilityStatusCode</span>
					<input
						type="text"
						v-model="newRac.MedicareDualEligibilityStatusCode.MedicareDualEligibilityStatusCode"
						required
					/>
				</label>
			</div>
			<button type="submit">Update</button>
			<button @click="close">Cancel</button>
		</form>
	</div>
</template>

<style scoped>
label {
	display: block;
}
.radios {
	margin-right: 20px;
	padding-right: 10px;
	border-right: solid black 1px;
	height: 50svw;
}
.form {
	height: 500px;
	max-height: 500px;
	overflow-y: scroll;
}
.modal {
	z-index: 5;
	position: fixed;
	top: 0;
	left: 0;
	padding-top: 5svw;
	padding-left: 10svw;
	width: 100%;
	height: 100%;
	background-color: #bfc;
	display: flex;
}
</style>
