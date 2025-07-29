<script setup>

import { ref } from 'vue';


const props = defineProps({
	relationship: {
		type: Object,
		required: true,
	},
});

const newRelationship = ref(JSON.parse(JSON.stringify(props.relationship)));

const emit = defineEmits(['submit', 'close']);
const submit = () => {
	emit('submit', newRelationship.value);
};
const close = () => {
	emit('close');
};
</script>
<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<label v-for="attribute in Object.keys(newRelationship)" :key="attribute">
				<span>{{ attribute }}: </span>
				<select v-if="newRelationship[attribute].options"
					v-model="newRelationship[attribute].value"
				>
					<option
						v-for="(option, index) in newRelationship[attribute].options.labels"
						:key="index"
						:value="newRelationship[attribute].options.values[index]"
						:required="newRelationship[attribute].required"
					>{{ newRelationship[attribute].options.labels[index] }}</option>
				</select>
				<input
					v-else
					:type="newRelationship[attribute].type"
					v-model="newRelationship[attribute].value"
					:required="newRelationship[attribute].required"
					:pattern="newRelationship[attribute].pattern"
				/>
			</label>
			<button type="submit">Update</button>
			<button @click="close">Cancel</button>
		</form>
	</div>
</template>

<style scoped>
div, form, label, span {
	background-color: #bfc;
	padding-left: 5px;
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
