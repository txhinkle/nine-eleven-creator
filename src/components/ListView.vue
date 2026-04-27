<script setup>
import useRecord from '@/composables/useRecord';
import useValidation from '@/composables/useValidation';
import { onMounted } from 'vue';
const {eligibilityList, selectRecord, deleteRecord, incrementRecord} = useRecord();
const {errorList, validateRecords} = useValidation();
const emit = defineEmits(['form'])
const select = (index) => {
    selectRecord(index);
    emit('form');
}
onMounted(() => {
    validateRecords();
})

const removeRecord = function (index) {
    deleteRecord(index);
    validateRecords();
}

const copyRecord = function (index) {
    incrementRecord(index);
    validateRecords();
}

</script>

<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th scope="col">Index</th>
                    <th scope="col">CaseId</th>
                    <th scope="col">MemberIds</th>
                    <th scope="col">Errors</th>
                    <th scope="col">Copy</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in eligibilityList" :key="index">
                    <td><a @click="select(index)">{{ index }}</a></td>
                    <td><a @click="select(index)">{{ item['ErepCaseId'].value }}</a></td>
                    <td>
                        <p v-for="member in item.MemberData.value" :key="member">{{ member.MemberId.value }}</p>
                    </td>
                    <td style="max-width: 300px;">
                        <p>{{ (errorList[index]?.caseDetail.length) ? errorList[index].caseDetail : ''}}</p>
                        <p v-for="error in errorList[index]?.memberData" :key="error">{{ (error.length) ? error : '' }}</p>
                    </td>
                    <td>
                        <input type="button" @click="copyRecord(index)" value="Increment" />
                    </td>
                    <td>
                        <input type="button" @click="removeRecord(index)" value="delete" />
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <pre>{{ errorList }}</pre> -->
    </div>
</template>
<style scoped>
*{
    margin-top: 5%;
}

</style>