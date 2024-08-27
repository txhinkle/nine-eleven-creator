<script setup>
import useRecord from '@/composables/useRecord';
import useValidation from '@/composables/useValidation';
import { onMounted } from 'vue';
const {eligibilityList, selectRecord, deleteRecord} = useRecord();
const {errorList, validateRecords} = useValidation();
const emit = defineEmits(['form'])
const select = (index) => {
    selectRecord(index);
    emit('form');
}
onMounted(() => {
    validateRecords();
})

</script>

<template>
    <div>
        <table v-if="eligibilityList.length">
            <thead>
                <tr>
                    <th scope="col">Index</th>
                    <th scope="col">MemberID</th>
                    <th scope="col">Errors</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in eligibilityList" :key="index">
                    <a @click="select(index)"><td>{{ index }}</td></a>
                    <a @click="select(index)"><td>{{ item['MemberId'].value }}</td></a>
                    <a @click="select(index)"><td style="max-width: 300px;">{{ errorList[index] }}</td></a>
                    <td>
                        <input type="button" @click="deleteRecord(index)" value="delete" /></td>
                </tr>
            </tbody>
        </table>
        <p v-else>No records</p>
    </div>
</template>
<style scoped>
*{
    margin-top: 5%;
}
a {
    color: blue;
    text-decoration: underline;
}
</style>