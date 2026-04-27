<script setup>
import useModal from '../composables/useModal'

const {
	currentModal,
	submitObject,
	cancelModal,
} = useModal();

const submit = () => {
	submitObject();
};
const close = () => {
	cancelModal();
};
</script>
<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<label>
				<span>Coverage Type</span>
				<select
					name="part"
					v-model="currentModal.object.MedicareCoverageType"
					required
				>
                    <option value="PARTA">PartA</option>
                    <option value="PARTB">PartB</option>
                </select>
			</label>
			<label>
				<span>MedicareCoverageStartDate</span>
				<input
					type="date"
					v-model="currentModal.object.MedicareCoverageStartDate"
                    required
				/>
			</label>
			<label>
				<span>MedicareCoverageEndDate</span>
				<input
					type="date"
					v-model="currentModal.object.MedicareCoverageEndDate"
                    required
				/>
			</label>
			<button type="submit">Update</button>
			<button @click="close">Cancel</button>
		</form>
	</div>
</template>

