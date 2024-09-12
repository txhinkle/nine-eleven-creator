<!-- eslint-disable vue/no-parsing-error -->
<script setup>
    import useValidation from '@/composables/useValidation';
    import {computed, onUpdated} from 'vue';
    const {validateRecords, sanitizedRecords, errorList} = useValidation();
    const timestamp = Date.now();
    const date = new Date().toISOString().substring(0, 19);
    let path = [];
    let xml = ''
    let tabString = '        '

    onUpdated(() => {
        xml = ''
        path = []
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

    const title = computed(() => {
        const dateString = date.substring(0, 10)
        const dateArray = dateString.split('-');
        return 'EREP_MEMBER_ELIGIBILITY_IN_REALTIME_' + dateArray[1] + dateArray[2] + dateArray[0] +'.txt'
    })

    const closeTag = function() {
            tabString = tabString.substring(0, tabString.length - 4);
        const endTag = path.pop()
        xml += tabString + '</' + endTag + '>\n'
    }
    const addTag = function(segment) {
        tabString += '    '
        path.push(segment)
        xml += tabString + '<' + segment + '>\n'
    }

    const prepPath = function(currentPathArray) {
        while (path.length && !currentPathArray.includes(path[path.length - 1])) {
                    closeTag()
                }
        currentPathArray.forEach((element) => {
            if(!path.includes(element) && element !== currentPathArray[currentPathArray.length - 1]) {
                    tabString = tabString.substring(0, tabString.length - 4);
                addTag(element)
                tabString += '    '
            }
        })
    }

    const writeValue = function(key, value) {
        if(typeof value === 'object') {
                tabString = tabString.substring(0, tabString.length - 4);
            addTag(key)
            tabString += '    '
            Object.keys(value).forEach(item => {
                writeValue(item, value[item])
            })
            closeTag()
        } else if (!['', null, undefined].includes(value)) {
            if (value === 'null') {
                value = ''
            }
            xml += tabString + '<' + key + '>' + (value + '').trim()
        + '</' + key + '>\n'
        }
    }

    const actualRecords = computed(() => {

        for(let i = 0; i < sanitizedRecords.value.length; i++) {
            const items = Object.keys(sanitizedRecords.value[i]);
            xml += tabString + '<Eligibility>\n'
            tabString += '    '
            for(let k = 0; k < items.length; k++) {
                const currentPath = items[k]
                const currentPathArray = currentPath.split('.')
                prepPath(currentPathArray);

                if(currentPathArray[currentPathArray.length - 2] === path[path.length - 1]) {
                    const pathway = currentPathArray[currentPathArray.length - 1]
                    if(pathway === 'Address') {
                        sanitizedRecords.value[i]['MemberData.Address'].forEach(element => {
                            xml += tabString + '<Address>\n'
                            tabString += '    '
                            Object.keys(element).forEach(attribute => {
                                writeValue(attribute, element[attribute]);
                            });
                                tabString = tabString.substring(0, tabString.length - 4);
                            xml += tabString + '</Address>\n'
                        });
                        
                     } else if (['Rac', 'Benefit', 'MedicareCoverageDetails','Incarceration', 'UppPremiumInformation', 'ESIPremiumInformation'].includes(pathway)) {
                        // standardized modal logic
                        sanitizedRecords.value[i][currentPath].forEach(rac => {
                            xml += tabString + `<${pathway}>\n`;
                            tabString = tabString + '    ';
                            Object.keys(rac).forEach(attribute => {
                                prepPath(currentPathArray)
                                writeValue(attribute, rac[attribute])
                            })
                                tabString = tabString.substring(0, tabString.length - 4);
                            xml += tabString + `</${pathway}>\n`
                        })
                    } else {
                        writeValue(pathway, sanitizedRecords.value[i][currentPath]);
                    }
                }
            }
            while(path.length) {
                closeTag()
            }
            xml += '        </Eligibility>\n'
            tabString = '        '
        }
        return xml
    }) 
</script>
<template>
    <div style="background-color: red; color: white;" v-if="errorCount">This XML contains errors</div>
    <div v-if="sanitizedRecords.length" >
        <p>Suggested Filename: {{ title }}</p>
        <p>File Contents:</p>
       <pre>
&lt?xml version="1.0" encoding="UTF-8" standalone="yes"?&gt
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
&lt/StateEligibility&gt</pre>
    </div>
    
    <p v-else>No records have been added yet</p>
    <!-- <p>---------------Sent Object:---------------------</p>
    <pre>{{ sanitizedRecords }}</pre> -->
</template>
<style scoped>
    *:first-child {
        margin-top: 5%;
    }
    pre {
        border: 1px solid black;
        padding: 2px;
        width: 90%;
    }
</style>