<script setup>
import { ref } from 'vue';

const props = defineProps({
	rac: {
		type: Object,
		required: true,
	},
});
const newRac = ref(JSON.parse(JSON.stringify(props.rac)));
// include Booleans to turn on/off required aspect and to show/hide elements
const includePregnancy = ref(false);
const includeIncome = ref(false)
const emit = defineEmits(['submit', 'close']);
const submit = () => {
	emit('submit', newRac);
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
					type="text"
					v-model="newRac.RacBeginDate"
					required
				/>
			</label>
			<label>
				<span>RacEndDate</span>
				<input
					type="text"
					v-model="newRac.RacEndDate"
					required
				/>
			</label>
			<label>
				<span>RacIssuanceDate</span>
				<input
					type="text"
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
						type="text"
						v-model="newRac.Pregnancy.PregnancyStartDate"
					/>
				</label>
				<label>
					<span>PregnancyDueDate</span>
					<input
						type="text"
						v-model="newRac.Pregnancy.PregnancyDueDate"
					/>
				</label>
				<label>
					<span>PregnancyEndDate</span>
					<input
						type="text"
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
			<div v-if="includeCopayExempt">
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
			<div v-if="includeSpenddown"></div>
			<div v-if="includeSpm"></div>
			<div v-if="includeMedicareDualEligibility"></div>
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
