<script setup>
import useRecord from '@/composables/useRecord';
const {eligibilityList, selectRecord} = useRecord();
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
                <tr v-for="(item, index) in eligibilityList">
                    <th><a @click="selectRecord(index)">{{ index }}</a></th>
                    <th>{{ item['MemberData.MemberId'] }}</th>
                    <th>not implemented yet</th>
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