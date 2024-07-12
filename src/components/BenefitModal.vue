<script setup>
import { ref } from 'vue';

const props = defineProps({
	benefit: {
		type: Object,
		required: true,
	},
});
const newBenefit = ref(JSON.parse(JSON.stringify(props.benefit)));
// include Booleans to turn on/off required aspect and to show/hide elements
const includePregnancy = ref(false);
const includeIncome = ref(false)
const includeAssistance = ref(false)
const includeCopayExemptDetails = ref(false)
const includePatientLiability = ref(false)
const includeSpenddown = ref(false)
// spenddownBills is a repeatable loop within spenddown. This is not being implemented at this time. Can be added to "expanded functionality" list
const includeSPM = ref(false)
const includeMedicareDualEligibility = ref(false)
const emit = defineEmits(['submit', 'close']);
const submit = () => {
	emit('submit', newBenefit);
};
const close = () => {
	emit('close');
};
</script>
<template>
	<div class="modal">
		<div>
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
				<input type="checkbox" v-model="includeSPM" />
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
					type="text"
					v-model="newBenefit.BenefitSubTypeStartDate"
					required
				/>
			</label>
			<label>
				<span>BenefitSubTypeEndDate</span>
				<input
					type="text"
					v-model="newBenefit.BenefitSubTypeEndDate"
					required
				/>
			</label>
			<label>
				<span>BenefitSubTypeIssuanceDate</span>
				<input
					type="text"
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
						type="text"
						v-model="newBenefit.Pregnancy.PregnancyStartDate"
					/>
				</label>
				<label>
					<span>PregnancyDueDate</span>
					<input
						type="text"
						v-model="newBenefit.Pregnancy.PregnancyDueDate"
					/>
				</label>
				<label>
					<span>PregnancyEndDate</span>
					<input
						type="text"
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
			<div v-if="includeCopayExempt">
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
						type="text"
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
						v-model="newBenefit.Spenddown.SpenddownBills.BillDetails.BillStartDate"
						required
					/>
				</label>
				<label>
					<span>BillEndDate</span>
					<input
						type="date"
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
