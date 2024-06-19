import useRecord from "./useRecord"
import {ref, watch} from 'vue'
const { eligibilityList} = useRecord()

const modalRequiredFields = [ 
    'AddressType',
    'Street1',
    'CityName',
    'StateCode',
    'ZipCode',
    'AddressStartDate',
    'AddressEndDate'
]
watch(eligibilityList, async () => {
	sanitizedRecords.value = [];
})

const sanitizedRecords = ref([])
const errorList = ref([])

// other required sets

const validateRecords = function() {
    sanitizedRecords.value = []
    errorList.value = []
    const list = eligibilityList.value
    for(let i = 0; i < list.length; i++) {
        const record = {...list[i]}
        const sanitizedRecord = {}
        const recordErrors = []
        const keys = Object.keys(record);
        for(let j = 0; j < keys.length; j++) {
            const item = record[keys[j]]
            if(item.value !== '' && item.type !== 'modal' && item.included) {
                sanitizedRecord[item.path] = item.value
            }
            else if(item.required && item.included) {
                recordErrors.push('missing required field:' + keys[j]);
            }
            if(item.type === 'modal') {
                item.value.forEach(modalObject => {
                    Object.keys(modalObject).forEach(key => {
                        if(modalObject[key]) {
                               sanitizedRecord[item.path + '.' + key] = modalObject[key]
                        } else if(modalRequiredFields.includes(key)) {
                            recordErrors.push('missing required field:' + key)
                        }
                    })
                })
            }
        }
        if(Object.keys(sanitizedRecord).length) {
            sanitizedRecords.value.push(sanitizedRecord);
            errorList.value.push(recordErrors);
        }
    }
}

// helper functions for validate record to use

export default function useValidation() {
    return {
        validateRecords,
        sanitizedRecords,
        errorList
    }
}