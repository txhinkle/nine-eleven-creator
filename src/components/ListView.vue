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
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in eligibilityList" :key="index">
                    <td><a @click="select(index)">{{ index }}</a></td>
                    <td><a @click="select(index)">{{ item['MemberId'].value }}</a></td>
                    <td style="max-width: 300px;"><a @click="select(index)">{{ errorList[index] }}</a></td>
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