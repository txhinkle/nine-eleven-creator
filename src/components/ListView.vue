<script setup>
import useRecord from '@/composables/useRecord';
const {eligibilityList} = useRecord();
</script>
<template>
    <p>List</p>
    <p>List size: {{ eligibilityList.length }}</p>
</template>