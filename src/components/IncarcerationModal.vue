<script setup>

import { ref } from 'vue';
import useOptions from '../composables/useOptions';
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

const {incarcerationStatusOptions} = useOptions();


const currentFacilityLoop = ref(null);

const editFacilityLoop = function (index) {
	if(!currentModal.value.object.Facility) {
		currentModal.value.object.Facility = []
	}
	if(!index) {
		currentFacilityLoop.value = {
			FacilityID: '',
			FacilityNPINumber: '',
			StartDate: '',
			EndDate: '',
			FacilityRecordStatus: '',
		}
		currentModal.value.object.Facility.push(currentFacilityLoop.value)
	} else {
		currentFacilityLoop.value = currentModal.value.object.Facility[index];
	}
}
const confirmFacilityLoop = function () {
	currentFacilityLoop.value = null;
}

const deleteLoop = function (index) {
	currentModal.value.object.Facility.splice(index, 1)
}

</script>
<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<label>
				<span>IncarcerationID</span>
				<input
					type="text"
					v-model="currentModal.object.IncarcerationID"
					required
				/>
			</label>
			<label>
				<span>IncarcerationStatus</span>
				<select
					v-model="currentModal.object.IncarcerationStatus"
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
					v-model="currentModal.object.StartDate"
					required
				/>
			</label>
			<label>
				<span>EndDate</span>
				<input
					type="date"
					min="1900-01-01"
					max="2999-12-31"
					v-model="currentModal.object.EndDate"
					required
				/>
			</label>
			<div>
				<label>
					<span>Facility</span>
					<input type="button" value="Add Facility Loop" @click="editFacilityLoop(null)" style="margin-left: 5px;"/>
				</label>
				<div v-if="currentModal.object.Facility && currentModal.object.Facility.length >= 1">
					<div v-for="(loop,index) in currentModal.object.Facility" :key="index">
						<span>{{ loop.FacilityID}}: {{ loop.StartDate }}–{{ loop.EndDate }}</span>
						<input
							type="button"
							value="edit"
							@click="currentFacilityLoop = currentModal.object.Facility[index]"
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
							<span>FacilityID</span>
							<input 
								type="tel"
								v-model="currentFacilityLoop.FacilityID"
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

