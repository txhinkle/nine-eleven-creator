<!-- eslint-disable vue/no-parsing-error -->
<script setup>
    import useValidation from '@/composables/useValidation';
    import {computed, onUpdated} from 'vue';
    const {validateRecords, sanitizedRecords, errorList} = useValidation();
    const timestamp = Date.now();
    const date = new Date().toISOString().substring(0, 10);
    let path = [];
    let xml = ''
    let tabString = '\t\t'

    onUpdated(() => {
        validateRecords();
    })

    const errorCount = computed(() => {
        let count = 0;
        for(let i = 0; i < errorList.value.length; i++) {
            if(errorList.value[i].length) {
                count++
            }
        }
        return count;
    });

    const closeTag = function() {
        tabString = tabString.substring(0, tabString.length - 1);
        const endTag = path.pop()
        xml += tabString + '</' + endTag + '>\n'
    }
    const addTag = function(segment) {
        tabString += '\t'
        path.push(segment)
        xml += tabString + '<' + segment + '>\n'
    }

    const prepPath = function(currentPathArray) {
        while (path.length && !currentPathArray.includes(path[path.length - 1])) {
                    closeTag()
                }
        currentPathArray.forEach((element) => {
            if(!path.includes(element) && element !== currentPathArray[currentPathArray.length - 1]) {
                tabString = tabString.substring(0, tabString.length - 1);
                addTag(element)
                tabString += '\t'
            }
        })
    }

    const writeValue = function(path, value) {
        xml += tabString + '<' + path + '>' + value
        + '</' + path + '>\n'
    }

    const actualRecords = computed(() => {

        for(let i = 0; i < sanitizedRecords.value.length; i++) {
            const items = Object.keys(sanitizedRecords.value[i]);
            xml += '\t<Eligibility>\n'
            for(let k = 0; k < items.length; k++) {
                const currentPath = items[k]
                const currentPathArray = currentPath.split('.')
                prepPath(currentPathArray);

                if(currentPathArray[currentPathArray.length - 2] === path[path.length - 1]) {
                    // console.log(currentPathArray[currentPathArray.length - 2])
                    if(currentPathArray[currentPathArray.length - 1] === 'Address') {
                        sanitizedRecords.value[i]['MemberData.Address'].forEach(element => {
                            console.log('currentPath', sanitizedRecords.value[i][currentPath])
                            xml += tabString + '<Address>\n'
                            tabString += '\t'
                            Object.keys(element).forEach(attribute => {
                                writeValue(attribute, element[attribute]);
                            });
                            tabString = tabString.substring(0, tabString.length - 1);
                            xml += tabString + '</Address>\n'
                        });
                        
                    } else {
                        writeValue(currentPathArray[currentPathArray.length - 1], sanitizedRecords.value[i][currentPath]);
                    }
                }
            }
            while(path.length) {
                closeTag()
            }
            xml += '\t</Eligibility>\n'
            tabString = '\t\t'
        }
        return xml
    }) 
</script>
<template>
    <div style="background-color: red; color: white;" v-if="errorCount">This XML contains errors</div>
    <pre v-if="sanitizedRecords.length">
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
        &ltTotalEligibilityRecords&gt{{sanitizedRecords.length}}&lt/TotalEligibilityRecords&gt
    &lt/Trailer&gt
&lt/StateEligibility&gt
    </pre>
    <p v-else>No records have been added yet</p>
    <p>---------------Sent Object:---------------------</p>
    <pre>{{ sanitizedRecords }}</pre>
</template>