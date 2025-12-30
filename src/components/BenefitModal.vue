<script setup>
import { ref } from 'vue';
import useOptions from '../composables/useOptions';
import useModal from '../composables/useModal'

const {
	currentModal,
	submitObject,
	cancelModal,
} = useModal();

// include Booleans to turn on/off required aspect and to show/hide elements
const includePregnancy = ref(currentModal.value.edit && currentModal.value.object.benefit.Pregnancy.PregnancyStatus !== '');
const includeIncome = ref(currentModal.value.edit && currentModal.value.object.benefit.Countable.Income !== '')
const includeAssistance = ref(currentModal.value.edit && currentModal.value.object.benefit.MemberIdsForAssistanceUnit.ContributingMemberId !== '')
const includeCopayExemptDetails = ref(currentModal.value.edit && currentModal.value.object.benefit.CopayExemptDetails.CopayExemptIndicator !== '')
const includePatientLiability = ref(currentModal.value.edit && currentModal.value.object.benefit.PatientLiability.Amount !== '')
const includeSpenddown = ref(currentModal.value.edit && currentModal.value.object.benefit.Spenddown.Information.SpenddownIndicator !== '')
// spenddownBills is a repeatable loop within spenddown. This is not being implemented at this time. Can be added to "expanded functionality" list
const includeSpm = ref(currentModal.value.edit && currentModal.value.object.benefit.SPMDetails.SPMIndicator !== '')
const includeMedicareDualEligibility = ref(currentModal.value.edit && currentModal.value.object.benefit.MedicareDualEligibilityStatusCode.MedicareDualEligibilityStatusCode !== '')
const includeSpenddownBill = ref(currentModal.value.edit && currentModal.value.object.benefit.Spenddown.SpenddownBills.BillDetails.BillId !== '')


const submit = () => {
	submitObject();
};
const close = () => {
	cancelModal();
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
				<select
					v-model="currentModal.object.BenefitSubType"
					required
				>
					<option
						v-for="(option, index) in benefitSubTypeOptions.labels"
						:key="index"
						:value="benefitSubTypeOptions.values[index]"
					>{{ benefitSubTypeOptions.labels[index] }}</option>
				</select>
			</label>
			<label>
				<span>BenefitSubTypeStartDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.BenefitSubTypeStartDate"
					required
				/>
			</label>
			<label>
				<span>BenefitSubTypeEndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.BenefitSubTypeEndDate"
					required
				/>
			</label>
			<label>
				<span>BenefitSubTypeIssuanceDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.BenefitSubTypeIssuanceDate"
					required
				/>
			</label>
			<div v-if="includePregnancy">
				<label>
					<span>PregnancyStatus</span>
					<input
						type="text"
						v-model="currentModal.object.Pregnancy.PregnancyStatus"
						required
					/>
				</label>
				<label>
					<span>PregnancyStartDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="currentModal.object.Pregnancy.PregnancyStartDate"
					/>
				</label>
				<label>
					<span>PregnancyDueDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="currentModal.object.Pregnancy.PregnancyDueDate"
					/>
				</label>
				<label>
					<span>PregnancyEndDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="currentModal.object.Pregnancy.PregnancyEndDate"
					/>
				</label>
			</div>
			<div v-if="includeIncome">
				<label>
					<span>Income</span>
					<input
						type="text"
						v-model="currentModal.object.Countable.Income"
						required
					/>
				</label>
			</div>
			<div v-if="includeAssistance">
				<label>
					<span>ContributingMemberId</span>
					<input
						type="text"
						v-model="currentModal.object.MemberIdsForAssistanceUnit.ContributingMemberId"
					/>
				</label>
				<label>
					<span>RelationshipCode</span>
					<input
						type="text"
						v-model="currentModal.object.MemberIdsForAssistanceUnit.RelationshipCode"
					/>
				</label>
			</div>
			<div v-if="includeCopayExemptDetails">
				<label>
					<span>CopayExemptIndicator</span>
					<input
						type="text"
						v-model="currentModal.object.CopayExemptDetails.CopayExemptIndicator"
						required
					/>
				</label>
			</div>
			<div v-if="includePatientLiability">
				<label>
					<span>Amount</span>
					<input
						type="text"
						v-model="currentModal.object.PatientLiability.Amount"
						required
					/>
				</label>
			</div>
			<div v-if="includeSpenddown">
				<label>
					<span>SpenddownIndicator</span>
					<input
						type="text"
						v-model="currentModal.object.Spenddown.Information.SpenddownIndicator"
						required
					/>
				</label>
				<label>
					<span>MetDate</span>
					<input
						type="date"
					min="1900-01-01"
					max="2999-12-31"
						v-model="currentModal.object.Spenddown.Information.MetDate"
					/>
				</label>
				<label>
					<span>Amount</span>
					<input
						type="text"
						v-model="currentModal.object.Spenddown.Information.Amount"
						required
					/>
				</label>
				<label>
					<span>Include Spenddown Bill</span>
					<input type="checkbox" v-model="includeSpenddownBill" />
				</label>
				<div v-if="includeSpenddownBill">
					<label>
						<span>BillId</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillId"
							required
						/>
					</label>
					<label>
						<span>BillAccountNumber</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillAccountNumber"
							required
						/>
					</label>
					<label>
						<span>BillStartDate</span>
						<input
							type="date"
						min="1900-01-01"
						max="2999-12-31"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillStartDate"
							required
						/>
					</label>
					<label>
						<span>BillEndDate</span>
						<input
							type="date"
						min="1900-01-01"
						max="2999-12-31"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillEndDate"
							required
						/>
					</label>
					<label>
						<span>ServiceType</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.ServiceType"
							required
						/>
					</label>
					<label>
						<span>PrescriptionNumber</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.PrescriptionNumber"
						/>
					</label>
					<label>
						<span>ErepCurrentUsedAmount</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.ErepCurrentUsedAmount"
							required
						/>
					</label>
					<label>
						<span>TotalBill</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.TotalBill"
							required
						/>
					</label>
					<label>
						<span>BillingProviderName</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderName"
							required
						/>
					</label>
					<label>
						<span>BillingProviderStreet1</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet1"
							required
						/>
					</label>
					<label>
						<span>BillingProviderStreet2</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet2"
							required
						/>
					</label>
					<label>
						<span>BillingProviderStreet3</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet3"
							required
						/>
					</label>
					<label>
						<span>BillingProviderCityName</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderCityName"
							required
						/>
					</label>
					<label>
						<span>BillingProviderStateCode</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderStateCode"
							required
						/>
					</label>
					<label>
						<span>BillingProviderZipCode</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderZipCode"
							required
						/>
					</label>
					<label>
						<span>BillingProviderZipCodeExtension</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderZipCodeExtension"
						/>
					</label>
					<label>
						<span>BillingProviderCountyCode</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderCountyCode"
						/>
					</label>
					<label>
						<span>BilledPersonSuffix</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BilledPersonSuffix"
						/>
					</label>
					<label>
						<span>BilledPersonFirstName</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BilledPersonFirstName"
							required
						/>
					</label>
					<label>
						<span>BilledPersonMiddleName</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BilledPersonMiddleName"
						/>
					</label>
					<label>
						<span>BilledPersonLastName</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BilledPersonLastName"
							required
						/>
					</label>
				</div>
			</div>
			<div v-if="includeSpm">
				<label>
					<span>SPMIndicator</span>
					<input
						type="text"
						v-model="currentModal.object.SPMDetails.SPMIndicator"
						required
					/>
				</label>
			</div>
			<div v-if="includeMedicareDualEligibility">
				<label>
					<span>MedicareDualEligibilityStatusCode</span>
					<input
						type="text"
						v-model="currentModal.object.MedicareDualEligibilityStatusCode.MedicareDualEligibilityStatusCode"
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
div, form, label, span {
	background-color: #bfc;
}
label {
	display: block;
}
.radios {
	margin-right: 20px;
	padding-right: 10px;
	border-right: solid black 1px;
	height: 50svw;
}
.modal {
	z-index: 5;
	position: fixed;
	top: 0;
	left: 0;
	padding-top: 3svw;
	padding-left: 10svw;
	padding-bottom: 5svw;
	width: 100%;
	height: 100%;
	display: flex;
	max-height: calc(100vh - 150px);
    overflow-y: auto;
}
</style>
