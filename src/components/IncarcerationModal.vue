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

const currentFacilityLoop = ref(null);

const editFacilityLoop = function (index) {
	if(!newIncarceration.value.Facility) {
		newIncarceration.value.Facility = []
	}
	if(!index) {
		currentFacilityLoop.value = {
			FacilityId: '',
			FacilityNPINumber: '',
			StartDate: '',
			EndDate: '',
			FacilityRecordStatus: '',
		}
		newIncarceration.value.Facility.push(currentFacilityLoop.value)
	} else {
		currentFacilityLoop.value = newIncarceration.value.Facility[index];
	}
}
const confirmFacilityLoop = function () {
	currentFacilityLoop.value = null;
}

const deleteLoop = function (index) {
	newIncarceration.value.Facility.splice(index, 1)
}

const emit = defineEmits(['submit', 'close']);
const submit = () => {
	// make sure that end date is included no matter what
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
			<div>
				<label>
					<span>Facility</span>
					<input type="button" value="Add Facility Loop" @click="editFacilityLoop(null)" style="margin-left: 5px;"/>
				</label>
				<div v-if="newIncarceration.Facility && newIncarceration.Facility.length >= 1">
					<div v-for="(loop,index) in newIncarceration.Facility" :key="index">
						<span>{{ loop.FacilityId}}: {{ loop.StartDate }}–{{ loop.EndDate }}</span>
						<input
							type="button"
							value="edit"
							@click="currentFacilityLoop = newIncarceration.Facility[index]"
							style="margin-left: 5px; margin-right: 5px;"
						/>
						<input type="button" value="delete" @click="deleteLoop(index)" />
					</div>
				</div>
				<form
						v-if="currentFacilityLoop"
						@submit.prevent="submit"
					>
						<label>
							<span>FacilityId</span>
							<input 
								type="tel"
								v-model="currentFacilityLoop.FacilityId"
								required
							/>
						</label>
						<label>
							<span>FacilityNPINumber</span>
							<input 
								type="tel"
								v-model="currentFacilityLoop.FacilityNPINumber"
							/>
						</label>
						<label>
							<span>StartDate</span>
							<input 
								type="date"
								v-model="currentFacilityLoop.StartDate"
								required
							/>
						</label>
						<label>
							<span>EndDate</span>
							<input 
								type="date"
								v-model="currentFacilityLoop.EndDate"
							/>
						</label>
						<label>
							<span>FacilityRecordStatus</span>
							<input 
								type="text"
								v-model="currentFacilityLoop.FacilityRecordStatus"
							/>
						</label>
						<input type="submit" @click="confirmFacilityLoop" value="Confirm Facility" style="margin-bottom: 10px;"/>
					</form>
			</div>
			<button type="submit">Update</button>
			<button @click="close">Cancel</button>
		</form>
	</div>
</template>

<style scoped>
div, form, label, span, p {
	background-color: #bfc;
}
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
}
</style>
