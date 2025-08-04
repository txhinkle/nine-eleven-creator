<script setup>
import useRecord from '@/composables/useRecord';
import { ref, onUpdated } from 'vue';
import MemberData from './MemberData.vue';
import useValidation from '@/composables/useValidation';
import HOHRelationshipModal from './HOHRelationshipModal.vue';
import useTemplates from '@/composables/useTemplates';
const {validateRecords} = useValidation();
const {caseHeadRelationshipDetailsObject} = useTemplates();
const {
	currentEligibilityRecord,
	addNewRecord,
	addMemberToRecord,
	selectMember,
	currentMemberIndex,
	currentRecordValidationObject,
	toggleIncluded,
	createRandomRecord,
	currentMemberValidationObject,
	toggleMemberIncludes,
	deleteMember,
} = useRecord();

onUpdated(() => {
	validateRecords();
})
const edit = ref(false);
const newRelationship = ref(null);
const oldRelationshipIndex = ref(null);

const insertInArray = function(object, name, index) {
	if(index !== null) {
		currentEligibilityRecord.value[name].value.splice(index, 1, object);
	} else {
		currentEligibilityRecord.value[name].value.push(object);
	}
}

const deleteFromArray = function (arrayName, index) {
	currentEligibilityRecord.value[arrayName].value.splice(index, 1);
};

const cancelModal = function () {
	newRelationship.value = null;
	oldRelationshipIndex.value = null;
	edit.value = false
};

const addRelationship = function(relationship, index) {
	newRelationship.value = relationship;
	if(index !== null) {
		oldRelationshipIndex.value = index;
		edit.value = true;
	}
}

const submitRelationship = function (relationship) {
	const index = oldRelationshipIndex.value;
	insertInArray(relationship, 'MemberRelationshipToHoh', index);
	oldRelationshipIndex.value = null;
	edit.value = false
	newRelationship.value = null
}

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
				<div v-if=" item === 'HohMemberId-RelationshipDetails'">
					<label>
						<span>HOH Member ID</span>
						<input type="text" v-model="currentEligibilityRecord[item].value" />
					</label>
				</div>
				<div
					id="relathipship-details"
					v-if="currentEligibilityRecord['HohMemberId-RelationshipDetails'].included"
				>
					<button
						@click="addRelationship({...caseHeadRelationshipDetailsObject}, null)"
						style="margin-top: 10px;"
					>
						Add Case Head Relationship Details
					</button>
					<div>
						<div v-for="(relationship, index) in currentEligibilityRecord['MemberRelationshipToHoh'].value" :key="index">
							<pre>{{ relationship.MemberId.value }}: {{ relationship.RelationshipCode.value }}</pre>
							<button @click="deleteFromArray('MemberRelationshipToHoh', index)">Delete</button>
							<button @click="addRelationship(relationship, index)">Edit</button>
						</div>
					</div>
				</div>
			</div>
			<div v-else-if="item === 'MemberData'">
				<input type="button" @click="addMemberToRecord" value="Add Member" style="margin-top: 5px;">
				<div  v-if="currentEligibilityRecord['MemberData'].value.length > 1">
					<p>Members</p>
					<p v-for="(member, index) in currentEligibilityRecord['MemberData'].value" :key="index">
						<a
							@click="selectMember(index)"
							:style="(index === currentMemberIndex) ? 'color: red; margin-right: 10px;' : 'color: blue; margin-right: 10px;'"
						>{{ index + 1 }}: {{ member.MemberId.value || '' }}</a>
						<input type="button" value="X" @click="deleteMember(index)" />
					</p>
					<!-- <span>
						<a
						v-for="(member, index) in currentEligibilityRecord['MemberData'].value" :key="index"
						@click="selectMember(index)"
						:style="(index === currentMemberIndex) ? 'color: red; margin-right: 10px;' : 'color: blue; margin-right: 10px;'"
						>{{ index }}</a>
					</span> -->
				</div>
				<MemberData  />
			</div>
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
		<!-- <div v-for="item in Object.keys(currentEligibilityRecord)" :key="item">
			<div v-if="currentEligibilityRecord[item].included">{{ currentEligibilityRecord[item].path }} : {{ currentEligibilityRecord[item].value }}</div>
		</div> -->
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
	<HOHRelationshipModal
		v-if="newRelationship"
		:relationship="newRelationship"
		:edit="edit"
		@submit="submitRelationship"
		@close="cancelModal"
	/>
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
