<script setup>
import useRecord from '@/composables/useRecord';
import { ref, onUpdated } from 'vue';
import MemberData from './MemberData.vue';
import useValidation from '@/composables/useValidation';
const {validateRecords} = useValidation();

const {
	currentEligibilityRecord,
	addNewRecord,
	currentRecordValidationObject,
	toggleIncluded,
	createRandomRecord,
	currentMemberValidationObject,
	toggleMemberIncludes,
} = useRecord();

onUpdated(() => {
	validateRecords();
})
// const edit = ref(false);

const showFaq = ref(false);


const toggleFaq = function () {
	showFaq.value = !showFaq.value;
};

const labelStyle = function(object) {
	return object.required && (object.value === '' || object.value?.length === 0)
		? 'color: red;'
		: 'color: automatic'
}

</script>
<template>
	<button
		@click="addNewRecord"
		id="record-button"
		style="z-index: 2;"
	>
		+
	</button>
	<div class="section-left">
		<div v-for="item in Object.keys(currentEligibilityRecord)" :key="item">
			<h3 v-if="item === 'ErepCaseId'">Basic Fields</h3>
			<h3 v-else-if="item === 'MotherId' && currentEligibilityRecord['MotherId'].included">Unborn Links</h3>
			<h3 v-else-if="item === 'Chip5Percent' && currentEligibilityRecord['Chip5Percent'].included">Chip Premium Details</h3>
			<h3 v-else-if="item === 'HohMemberId-RelationshipDetails' && currentEligibilityRecord['HohMemberId-RelationshipDetails'].included">Case Head Releationship Details</h3>
			<label
				v-if="currentEligibilityRecord[item].included && item !== 'MemberData' && currentEligibilityRecord[item].type !=='modal'"
				:style="labelStyle(currentEligibilityRecord[item])"
			>
				<span>{{ item.includes('-') ? item.substring(0, item.indexOf('-')) : item }}</span>
				<span v-if="currentEligibilityRecord[item].required">*</span>
			</label>
			<div  v-else-if="currentEligibilityRecord[item].included && item !== 'MemberData'">
				<div v-for="(key, index) in currentEligibilityRecord['HohMemberId-RelationshipDetails'].value" :key="index">
					<label  v-for="thing in Object.keys(key)" :key="thing">
						<span>{{ thing }}</span>
						<input type="text" v-model="currentEligibilityRecord[item].value[index][thing].value" />
					</label>	
				</div>
			</div>
			<MemberData v-else-if="item === 'MemberData'" />
			<select
				v-if="currentEligibilityRecord[item].included && currentEligibilityRecord[item].options"
				v-model="currentEligibilityRecord[item].value"
			>
				<option
					v-for="(option, index) in currentEligibilityRecord[item].options.labels"
					:value="currentEligibilityRecord[item].options.values[index]"
					:key="index"
				>{{ currentEligibilityRecord[item].options.labels[index] }}</option>
			</select>
			<input
				v-else-if="currentEligibilityRecord[item].included && currentEligibilityRecord[item].type !== 'modal'"
				:type="currentEligibilityRecord[item].type"
				v-model="currentEligibilityRecord[item].value"
				:pattern="currentEligibilityRecord[item].pattern"
				:required="currentEligibilityRecord[item].required"
				@input="(currentEligibilityRecord[item].handler) ? currentEligibilityRecord[item].handler(currentEligibilityRecord[item], currentEligibilityRecord[item].value) : null"
			/>
		</div>
		<!-- <pre v-if="currentEligibilityRecord">{{ currentEligibilityRecord }}</pre> -->
		<div v-for="item in Object.keys(currentEligibilityRecord)" :key="item">
			<div v-if="currentEligibilityRecord[item].included">{{ currentEligibilityRecord[item].path }} : {{ currentEligibilityRecord[item].value }}</div>
		</div>
		<!-- <p v-else>No Records Yet, Add Record to start</p> -->
	</div>
	<div class="section-right">
		<p><button @click="toggleFaq">{{ showFaq ? 'Hide' : 'Show' }} tips for using this form</button></p>
		
		<div class="faq"
			v-if="showFaq"
		>		
			<p>If you want to make a formerly populated record value empty, put 'null' as the new value</p>
			<p>You can navigate between records on the List Tab</p>
		</div>
		<div class="section-booleans">
			<div v-if="Object.keys(currentRecordValidationObject).length">
				<input
					type="button"
					value="Populate Default Required Fields"
					@click="createRandomRecord"
				/>
			</div>
			<label
				v-for="item in Object.keys(currentRecordValidationObject)" :key="item"
				@click="toggleIncluded(item)"
			>
				<input v-if="item !=='memberData'" type="checkbox" v-model="currentRecordValidationObject[item]"/>
				<span v-if="item !=='memberData'" >{{ item }}</span>
			</label>
			<label
				v-for="item in Object.keys(currentMemberValidationObject)" :key="item"
				@click="toggleMemberIncludes(item)"
			>
				<input v-if="item !=='memberData'" type="checkbox" v-model="currentMemberValidationObject[item]"/>
				<span v-if="item !=='memberData'" >{{ item }}</span>
			</label>
		</div>
	</div>
</template>
<style scoped>
label {
	display: block;
}

#record-button {
	position: fixed;
	top: 2%;
	border-radius: 50%;
	background-color: lightgreen;
	font-size: larger;
	margin-left: 50svw;
	padding: 10px 15px;
}

.section {
	display: inline-block;
}
.section-left {
	position: absolute;
	top: 10%;
	width: 85%;
	padding-bottom: 1svw;
}
.section-right {
	width: 25%;
	position: absolute;
	top: 15%;
	right: 5%;
	margin: 0;
}

</style>
