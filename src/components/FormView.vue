<script setup>
import useRecord from '@/composables/useRecord';
import { ref, onUpdated } from 'vue';
import MemberData from './MemberData.vue';
import useValidation from '@/composables/useValidation';
import useTemplates from '@/composables/useTemplates';
import useModal from '@/composables/useModal'

const {validateRecords} = useValidation();
const {caseHeadRelationshipDetailsObject} = useTemplates();
const { setModal } = useModal()
const {
	currentEligibilityRecord,
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

const deleteFromArray = function (arrayName, index) {
	currentEligibilityRecord.value[arrayName].value.splice(index, 1);
};

const addRelationship = function(relationship, index) {
	setModal('MemberRelationshipToHoh', relationship, !!index, index)
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
					id="relationship-details"
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
		<!-- <pre>{{ currentEligibilityRecord }}</pre> -->
		<!-- <div v-for="item in Object.keys(currentEligibilityRecord)" :key="item">
			<div v-if="currentEligibilityRecord[item].included">{{ currentEligibilityRecord[item].path }} : {{ currentEligibilityRecord[item].value }}</div>
		</div> -->
	</div>
	<div class="section-right">
		<p><button @click="toggleFaq">{{ showFaq ? 'Hide' : 'Show' }} tips for using this form</button></p>
		
		<div class="faq"
			v-if="showFaq"
		>		
			<p>If you want to make a formerly populated record value empty, put 'null' as the new value</p>
			<p>You can navigate between records on the Summary Tab</p>
			<p>To generate new values for all required fields for members on this eligibility record, use the Generate Values button</p>
		</div>
		<div class="section-booleans">
			<div v-if="Object.keys(currentRecordValidationObject).length">
				<input
					type="button"
					value="Generate Values"
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
