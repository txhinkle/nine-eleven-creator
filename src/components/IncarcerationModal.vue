<script setup>

import { ref } from 'vue';
import useOptions from '../composables/useOptions';

const props = defineProps({
	incarceration: {
		type: Object,
		required: true,
	},
});
const {incarcerationStatusOptions} = useOptions();
const newIncarceration = ref(JSON.parse(JSON.stringify(props.incarceration)));

const emit = defineEmits(['submit', 'close']);
const submit = () => {
	emit('submit', newIncarceration.value);
};
const close = () => {
	emit('close');
};
</script>
<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<label>
				<span>IncarcerationID</span>
				<input
					type="text"
					v-model="newIncarceration.IncarcerationID"
					required
				/>
			</label>
			<label>
				<span>IncarcerationStatus</span>
				<select
					v-model="newIncarceration.IncarcerationStatus"
					required
				>
					<option
						v-for="(option, index) in incarcerationStatusOptions.labels"
						:key="index"
						:value="incarcerationStatusOptions.values[index]"
					>{{ incarcerationStatusOptions.labels[index] }}</option>
				</select>
			</label>
			<label>
				<span>FacilityNPI</span>
				<input
					type="tel"
					v-model="newIncarceration.FacilityNPI"
					pattern="[0-9]{10}"
				/>
			</label>
			<label>
				<span>StartDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newIncarceration.StartDate"
					required
				/>
			</label>
			<label>
				<span>EndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="newIncarceration.EndDate"
					required
				/>
			</label>
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
