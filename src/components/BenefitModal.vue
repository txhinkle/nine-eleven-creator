<script setup>
import { ref } from 'vue';

const props = defineProps({
	benefit: {
		type: Object,
		required: true,
	},
	edit: {
		type: Boolean,
		required: false,
	},
});

const newBenefit = ref(JSON.parse(JSON.stringify(props.benefit)));
// include Booleans to turn on/off required aspect and to show/hide elements
const includePregnancy = ref(props.edit && props.benefit.Pregnancy.PregnancyStatus !== '');
const includeIncome = ref(props.edit && props.benefit.Countable.Income !== '')
const includeAssistance = ref(props.edit && props.benefit.MemberIdsForAssistanceUnit.ContributingMemberId !== '')
const includeCopayExemptDetails = ref(props.edit && props.benefit.CopayExemptDetails.CopayExemptIndicator !== '')
const includePatientLiability = ref(props.edit && props.benefit.PatientLiability.Amount !== '')
const includeSpenddown = ref(props.edit && props.benefit.Spenddown.Information.SpenddownIndicator !== '')
// spenddownBills is a repeatable loop within spenddown. This is not being implemented at this time. Can be added to "expanded functionality" list
const includeSpm = ref(props.edit && props.benefit.SPMDetails.SPMIndicator !== '')
const includeMedicareDualEligibility = ref(props.edit && props.benefit.MedicareDualEligibilityStatusCode.MedicareDualEligibilityStatusCode !== '')
const emit = defineEmits(['submit', 'close']);

const submit = () => {
	emit('submit', newBenefit.value);
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
				<span>BenefitSubType</span>
				<input
					type="text"
					v-model="newBenefit.BenefitSubType"
					required
				/>
			</label>
			<label>
				<span>BenefitSubTypeStartDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newBenefit.BenefitSubTypeStartDate"
					required
				/>
			</label>
			<label>
				<span>BenefitSubTypeEndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newBenefit.BenefitSubTypeEndDate"
					required
				/>
			</label>
			<label>
				<span>BenefitSubTypeIssuanceDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newBenefit.BenefitSubTypeIssuanceDate"
					required
				/>
			</label>
			<div v-if="includePregnancy">
				<label>
					<span>PregnancyStatus</span>
					<input
						type="text"
						v-model="newBenefit.Pregnancy.PregnancyStatus"
						required
					/>
				</label>
				<label>
					<span>PregnancyStartDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="newBenefit.Pregnancy.PregnancyStartDate"
					/>
				</label>
				<label>
					<span>PregnancyDueDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="newBenefit.Pregnancy.PregnancyDueDate"
					/>
				</label>
				<label>
					<span>PregnancyEndDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="newBenefit.Pregnancy.PregnancyEndDate"
					/>
				</label>
			</div>
			<div v-if="includeIncome">
				<label>
					<span>Income</span>
					<input
						type="text"
						v-model="newBenefit.Countable.Income"
						required
					/>
				</label>
			</div>
			<div v-if="includeAssistance">
				<label>
					<span>ContributingMemberId</span>
					<input
						type="text"
						v-model="newBenefit.MemberIdsForAssistanceUnit.ContributingMemberId"
					/>
				</label>
				<label>
					<span>RelationshipCode</span>
					<input
						type="text"
						v-model="newBenefit.MemberIdsForAssistanceUnit.RelationshipCode"
					/>
				</label>
			</div>
			<div v-if="includeCopayExemptDetails">
				<label>
					<span>CopayExemptIndicator</span>
					<input
						type="text"
						v-model="newBenefit.CopayExemptDetails.CopayExemptIndicator"
						required
					/>
				</label>
			</div>
			<div v-if="includePatientLiability">
				<label>
					<span>Amount</span>
					<input
						type="text"
						v-model="newBenefit.PatientLiability.Amount"
						required
					/>
				</label>
			</div>
			<div v-if="includeSpenddown">
				<label>
					<span>SpenddownIndicator</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.Information.SpenddownIndicator"
						required
					/>
				</label>
				<label>
					<span>MetDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="newBenefit.Spenddown.Information.MetDate"
					/>
				</label>
				<label>
					<span>Amount</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.Information.Amount"
						required
					/>
				</label>
				<label>
					<span>BillId</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillId"
						required
					/>
				</label>
				<label>
					<span>BillAccountNumber</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillAccountNumber"
						required
					/>
				</label>
				<label>
					<span>BillStartDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillStartDate"
						required
					/>
				</label>
				<label>
					<span>BillEndDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillEndDate"
						required
					/>
				</label>
				<label>
					<span>ServiceType</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.ServiceType"
						required
					/>
				</label>
				<label>
					<span>PrescriptionNumber</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.PrescriptionNumber"
					/>
				</label>
				<label>
					<span>ErepCurrentUsedAmount</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.ErepCurrentUsedAmount"
						required
					/>
				</label>
				<label>
					<span>TotalBill</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.TotalBill"
						required
					/>
				</label>
				<label>
					<span>BillingProviderName</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderName"
						required
					/>
				</label>
				<label>
					<span>BillingProviderStreet1</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet1"
						required
					/>
				</label>
				<label>
					<span>BillingProviderStreet2</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet2"
						required
					/>
				</label>
				<label>
					<span>BillingProviderStreet3</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet3"
						required
					/>
				</label>
				<label>
					<span>BillingProviderCityName</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderCityName"
						required
					/>
				</label>
				<label>
					<span>BillingProviderStateCode</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderStateCode"
						required
					/>
				</label>
				<label>
					<span>BillingProviderZipCode</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderZipCode"
						required
					/>
				</label>
				<label>
					<span>BillingProviderZipCodeExtension</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderZipCodeExtension"
					/>
				</label>
				<label>
					<span>BillingProviderCountyCode</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillingProviderCountyCode"
					/>
				</label>
				<label>
					<span>BilledPersonSuffix</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BilledPersonSuffix"
					/>
				</label>
				<label>
					<span>BilledPersonFirstName</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BilledPersonFirstName"
						required
					/>
				</label>
				<label>
					<span>BilledPersonMiddleName</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BilledPersonMiddleName"
					/>
				</label>
				<label>
					<span>BilledPersonLastName</span>
					<input
						type="text"
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BilledPersonLastName"
						required
					/>
				</label>
			</div>
			<div v-if="includeSpm">
				<label>
					<span>SPMIndicator</span>
					<input
						type="text"
						v-model="newBenefit.SPMDetails.SPMIndicator"
						required
					/>
				</label>
			</div>
			<div v-if="includeMedicareDualEligibility">
				<label>
					<span>MedicareDualEligibilityStatusCode</span>
					<input
						type="text"
						v-model="newBenefit.MedicareDualEligibilityStatusCode.MedicareDualEligibilityStatusCode"
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
}
.modal {
	z-index: 5;
	position: fixed;
	top: 0;
	left: 0;
	padding-top: 3px;
	padding-left: 10svw;
	width: 100%;
	height: 100%;
	background-color: #bfc;
	display: flex;
	overflow: auto;
}
</style>
