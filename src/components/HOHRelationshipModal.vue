<script setup>
// import { ref } from 'vue';
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
			<label v-for="attribute in Object.keys(currentModal.object)" :key="attribute">
				<span>{{ attribute }}: </span>
				<select v-if="currentModal.object[attribute].options"
					v-model="currentModal.object[attribute].value"
				>
					<option
						v-for="(option, index) in currentModal.object[attribute].options.labels"
						:key="index"
						:value="currentModal.object[attribute].options.values[index]"
						:required="currentModal.object[attribute].required"
					>{{ currentModal.object[attribute].options.labels[index] }}</option>
				</select>
				<input
					v-else
					:type="currentModal.object[attribute].type"
					v-model="currentModal.object[attribute].value"
					:required="currentModal.object[attribute].required"
					:pattern="currentModal.object[attribute].pattern"
				/>
			</label>
			<button type="submit">Update</button>
			<button @click="close">Cancel</button>
		</form>
	</div>
</template>

