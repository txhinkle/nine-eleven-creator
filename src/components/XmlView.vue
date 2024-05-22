<script setup>
    import useRecord from '@/composables/useRecord';
    const {eligibilityList} = useRecord();
</script>
<template>
    <p v-if="eligibilityList.length">XML</p>
    <p v-else>No records have been added yet</p>
</template>