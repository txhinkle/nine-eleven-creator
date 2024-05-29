<script setup>
import useRecord from '@/composables/useRecord';
import useValidation from '@/composables/useValidation';
import { onMounted } from 'vue';
const {eligibilityList, selectRecord} = useRecord();
const {errorList, validateRecords} = useValidation();
console.log('errorList', errorList.value);
onMounted(() => {
    validateRecords();
})
</script>

<template>
    <div>
        <table v-if="eligibilityList.length">
            <thead>
                <tr>
                    <th>Index</th>
                    <th>MemberID</th>
                    <th>Errors</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in eligibilityList" :key="index">
                    <a @click="selectRecord(index)">
                        <th>{{ index }}</th>
                        <th>{{ item['MemberId'].value }}</th>
                        <th style="max-width: 300px;">{{ errorList[index] }}</th>
                    </a>
                </tr>
            </tbody>
        </table>
        <p v-else>No records</p>
    </div>
</template>
<style scoped>
a {
    color: blue;
    text-decoration: underline;
}
</style>