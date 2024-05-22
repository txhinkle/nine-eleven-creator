<script setup>
    import useRecord from '@/composables/useRecord';
    const {currentEligibilityRecord} = useRecord();
</script>
<template>
    <label v-for="item in Object.keys(currentEligibilityRecord)">
        <span>{{ item }}</span>
        <input type="text" :name="item" />
    </label>
    <pre v-if="currentEligibilityRecord">{{ currentEligibilityRecord }}</pre>
    <p v-else>No Records Yet, Add Record to start</p>
</template>
<style scoped>
label {
    display: block;
}
</style>