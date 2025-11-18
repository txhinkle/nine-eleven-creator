<!-- eslint-disable vue/no-parsing-error -->
<script setup>
    import useValidation from '@/composables/useValidation';
    import {computed, onUpdated, onMounted} from 'vue';
    const {validateRecords, sanitizedRecords, errorList, breakMonths} = useValidation();
    const timestamp = Date.now();
    const date = new Date().toISOString().substring(0, 19);
    let path = [];
    let xml = ''
    let tabString = '        '

    // onMounted(() => {
    //     validateRecords();
    // })

    onUpdated(() => {
        xml = ''
        path = []
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
        const hourString = (timestamp + '');
        return 'EREP_MEMBER_ELIGIBILITY_IN_REALTIME_' 
        + dateArray[1] 
        + dateArray[2] 
        + dateArray[0] 
        + '_' 
        + hourString
        + '_T.txt'
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
            // if is array
            if(Array.isArray(value)) {
                value.forEach((modelObject) => {
                    tabString = tabString.substring(0, tabString.length - 4);
                    addTag(key)
                    tabString += '    '
                    Object.keys(modelObject).forEach(item => {
                        writeValue(item, modelObject[item])
                    })
                    closeTag()
                })
            } else {
                tabString = tabString.substring(0, tabString.length - 4);
                addTag(key)
                tabString += '    '
                Object.keys(value).forEach(item => {
                writeValue(item, value[item])
            })
            }
            
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
                    const pathway = currentPathArray[currentPathArray.length - 1];
                     if (typeof sanitizedRecords.value[i][currentPath] === 'object') {
                        let tempArray = sanitizedRecords.value[i][currentPath];
                        tempArray.forEach(modelObj => {
                          tabString = tabString.substring(0, tabString.length - 4);
                          addTag('MemberData');
                          tabString += '    '
                            Object.keys(modelObj).forEach(attribute => {
                                const label = (attribute.includes('.')) ? attribute.split('.').pop() : attribute;
                                if(label === 'Rac' || label === 'Benefit') {
                                    const eligArray = []
                                    modelObj[attribute].forEach(rac => {
                                        const brokenMonths =
                                            (label === 'Rac')
                                            ? breakMonths(rac.RacBeginDate, rac.RacEndDate)
                                            : breakMonths(rac.BenefitSubTypeStartDate, rac.BenefitSubTypeEndDate)
                                        if(label === 'Rac') {
                                            brokenMonths.forEach(month => {
                                                const tempObj = {
                                                    ...rac,
                                                    RacBeginDate: month.start,
                                                    RacEndDate: month.end
                                                }
                                                eligArray.push(tempObj)
                                            })
                                        }
                                        else {
                                            brokenMonths.forEach(month => {
                                                const tempObj = {
                                                    ...rac,
                                                    BenefitSubTypeStartDate: month.start,
                                                    BenefitSubTypeEndDate: month.end
                                                }
                                                eligArray.push(tempObj)
                                            })
                                        }
                                    modelObj[attribute] = [...eligArray];
                                    })
                                }
                                prepPath(attribute.split('.'))
                                if (!Array.isArray(modelObj[attribute])) {
                                  writeValue(label, modelObj[attribute])
                                } else {
                                  Object.keys(modelObj[attribute]).forEach((obj) => {
                                    writeValue(label, modelObj[attribute][obj])
                                  })
                                }
                            })
                          closeTag();
                        })
                        // tempArray.forEach(modelObj => {
                        //     Object.keys(modelObj).forEach(attribute => {
                        //         prepPath(currentPathArray)
                        //         if(Array.isArray(modelObj[attribute])) {
                        //
                        //             modelObj[attribute].forEach((loop)=> {
                        //                 path.push(attribute)
                        //                 xml += tabString + '<' + attribute + '>\n'
                        //                 tabString += '    '
                        //                 Object.keys(loop).forEach((atr) => {
                        //                     writeValue(atr, loop[atr]);
                        //                 })
                        //                 closeTag();
                        //             })
                        //         } else writeValue(attribute, modelObj[attribute])
                        //     })
                        //         tabString = tabString.substring(0, tabString.length - 4);
                        //     xml += tabString + `</${pathway}>\n`
                        // })
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
&lt;?xml version="1.0" encoding="UTF-8" standalone="yes"?&gt;
&lt;StateEligibility xmlns="http://www.utprism.com/dws/eligibility"&gt;
    &lt;Header&gt;
        &lt;TransactionId&gt;{{timestamp}}&lt;/TransactionId&gt;
        &lt;CreationDate&gt;{{date}}&lt;/CreationDate&gt;
        &lt;TransmissionDate&gt;{{date}}&lt;/TransmissionDate&gt;
        &lt;MonthlyIssuanceFlag&gt;N&lt;/MonthlyIssuanceFlag&gt;
    &lt;/Header&gt;
    &lt;EligibilityDetail&gt;
{{actualRecords}}
    &lt;/EligibilityDetail&gt;
    &lt;Trailer&gt;
        &lt;TotalEligibilityRecords&gt;{{sanitizedRecords.length}}&lt;/TotalEligibilityRecords&gt;
    &lt;/Trailer&gt;
&lt;/StateEligibility&gt;</pre>
    </div>
    
    <p v-else>No records have been added yet</p>
 <!-- <pre>{{sanitizedRecords}}</pre> -->
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
