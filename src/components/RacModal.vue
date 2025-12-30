<script setup>
import { ref } from 'vue';
import useOptions from '../composables/useOptions';
import useModal from '../composables/useModal'

const {
	currentModal,
	submitObject,
	cancelModal,
} = useModal();

const {racOptions, SPMIndicatorOptions, spenddownIndicatorOptions } = useOptions();

// include Booleans to turn on/off required aspect and to show/hide elements
// will be included in edit if entered and then toggled off previously
const toggleIncluded = function(key) {
	console.log('fill me in', key)
	// turn the includes into an object so that the keys are strings?
	// then you can turn them on and off and also use this to empty out the value
	// alternatively, you could pull in the sanitizedRecord and check the value there
}
const includePregnancy = ref(currentModal.value.edit && currentModal.value.object.Pregnancy.PregnancyStatus !== '');
// this is the only one that I fixed at all
const includeIncome = ref(currentModal.value.object.Countable.Income !== '' );
const includeAssistance = ref(currentModal.value.edit && currentModal.object.value.MemberIdsForAssistanceUnit.ContributingMemberId !== '')
const includeCopayExemptDetails = ref(currentModal.value.edit && currentModal.value.object.CopayExemptDetails.CopayExemptIndicator !== '')
const includePatientLiability = ref(currentModal.value.edit && currentModal.value.object.PatientLiability.Amount !== '')
const includeSpenddown = ref(currentModal.value.edit && currentModal.value.object.Spenddown.Information.SpenddownIndicator !== '')
// spenddownBills is a repeatable loop within spenddown. This is not being implemented at this time. Can be added to "expanded functionality" list
const includeSpm = ref(currentModal.value.edit && currentModal.value.object.SPMDetails.SPMIndicator !== '')
const includeMedicareDualEligibility = ref(currentModal.value.edit && currentModal.value.object.MedicareDualEligibilityStatusCode.MedicareDualEligibilityStatusCode !== '')
const includeSpenddownBill = ref(currentModal.value.edit && currentModal.value.object.Spenddown.SpenddownBills.BillDetails.BillId !== '')

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
				<span>RacCode</span>
				<select
					v-model="currentModal.object.RacCode"
					required
				>
					<option
						v-for="(option, index) in racOptions.labels"
						:key="index"
						:value="racOptions.values[index]"
					>{{ racOptions.labels[index] }}</option>
				</select>
			</label>
			<label>
				<span>RacBeginDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.RacBeginDate"
					required
				/>
			</label>
			<label>
				<span>RacEndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.RacEndDate"
					required
				/>
			</label>
			<label>
				<span>RacIssuanceDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.RacIssuanceDate"
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
						required
					/>
				</label>
				<label>
					<span>RelationshipCode</span>
					<input
						type="text"
						v-model="currentModal.object.MemberIdsForAssistanceUnit.RelationshipCode"
						required
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
					<select
						v-model="currentModal.object.Spenddown.Information.SpenddownIndicator"
						required
					>
						<option
							v-for="(option, index) in spenddownIndicatorOptions.labels"
							:key="index"
							:value="spenddownIndicatorOptions.values[index]"
						>{{ spenddownIndicatorOptions.labels[index] }}</option>
				</select>
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
						/>
					</label>
					<label>
						<span>BillingProviderStreet3</span>
						<input
							type="text"
							v-model="currentModal.object.Spenddown.SpenddownBills.BillDetails.BillingProviderStreet3"
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
					<select
						v-model="currentModal.object.SPMDetails.SPMIndicator"
						required
					>
						<option
							v-for="(option, index) in SPMIndicatorOptions.labels"
							:key="index"
							:value="SPMIndicatorOptions.values[index]"
						>{{ SPMIndicatorOptions.labels[index] }}</option>
				</select>
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

.radios {
	margin-right: 20px;
	padding-right: 10px;
	border-right: solid black 1px;
	height: 50svw;
}

</style>
