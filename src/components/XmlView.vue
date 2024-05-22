<script setup>
    import useRecord from '@/composables/useRecord';
    import {computed} from 'vue';
    const {eligibilityList} = useRecord();
    const timestamp = Date.now();
    const date = new Date().toISOString().substring(0, 10);
    let path = [];
    let xml = ''
    let tabIndex = 2
    let tabString = '\t\t'

    const closeTag = function() {
        tabString = tabString.substring(0, tabString.length - 1);
        tabIndex--;
        xml += tabString + '</' + path[path.length - 1] + '>\n'
        path.pop()
    }
    const addTag = function(segment) {
        tabIndex++
        tabString += '\t'
        path.push(segment)
        xml += tabString + '<' + segment + '>\n'
    }
    const actualRecords = computed(() => {

        for(let i = 0; i < eligibilityList.value.length; i++) {
            const items = Object.keys(eligibilityList.value[i]);
            xml += '\t<Eligibility>\n'
            for(let k = 0; k < items.length; k++) {
                const currentPath = items[k]
                const currentPathArray = items[k].split('.')
                while (path.length && !currentPathArray.includes(path[path.length - 1])) {
                    closeTag()
                }
                if(!path.length) {
                    path = [...currentPathArray];
                    path.pop()
                    tabIndex = 2
                    tabString = '\t\t'
                    xml += tabString +'<' + path[0] + '>' + '\n'
                    tabString += '\t'
                }
                if(!path.includes(currentPathArray[currentPathArray.length - 2])) {
                    tabString = tabString.substring(0, tabString.length - 1);
                    addTag(currentPathArray[currentPathArray.length - 2])
                    tabString += '\t'
                }

                if(currentPathArray[currentPathArray.length - 2] === path[path.length - 1]) {
                    tabIndex++;
                    xml += tabString + '<' + currentPathArray[currentPathArray.length - 1] + '>' + eligibilityList.value[i][currentPath]
                    + '</' + currentPathArray[currentPathArray.length - 1] + '>\n'
                }
            }
            while(path.length) {
                closeTag()
            }
            xml += '\t</Eligibility>\n'
            tabIndex = 2
            tabString = '\t\t'
        }
        return xml
    }) 
</script>
<template>
    <pre v-if="eligibilityList.length">
&lt?xml version="1.0" encoding-"UTF-8" standalone="yes"?&gt
&ltStateEligibility xmlns="http://www.utprism.com/dws/eligibility"&gt
    &ltHeader&gt
        &ltTransactionId&gt{{timestamp}}&lt/TransactionId&gt
        &ltCreationDate&gt{{date}}&lt/CreationDate&gt
        &ltTransmissionDate&gt{{date}}&lt/TransmissionDate&gt
        &ltMonthlyIssuanceFlag&gtN&lt/MonthlyIssuanceFlag&gt
    &lt/Header&gt
    &ltEligibilityDetail&gt
    {{actualRecords}}
    &lt/EligibilityDetail&gt
    &ltTrailer&gt
        &ltTotalEligibilityRecords&gt{{eligibilityList.length}}&lt/TotalEligibilityRecords&gt
    &lt/Trailer&gt
&lt/StateEligibility&gt
    </pre>
    <p v-else>No records have been added yet</p>
</template>