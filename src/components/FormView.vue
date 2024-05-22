<script setup>
    import useRecord from '@/composables/useRecord';
    const {currentEligibilityRecord, addNewRecord} = useRecord();
</script>
<template>
    <button @click="addNewRecord">Add Record</button>
    <label v-for="item in Object.keys(currentEligibilityRecord)">
        <span>{{ item }}</span>
        <input type="text" v-model="currentEligibilityRecord[item]"/>
    </label>
    <pre v-if="currentEligibilityRecord">{{ currentEligibilityRecord }}</pre>
    <p v-else>No Records Yet, Add Record to start</p>
</template>
<style scoped>
label {
    display: block;
}
</style>