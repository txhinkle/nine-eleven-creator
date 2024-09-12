import useRecord from "./useRecord"
import {ref, watch} from 'vue'
const { eligibilityList} = useRecord()

watch(eligibilityList, async () => {
	sanitizedRecords.value = [];
})

const sanitizedRecords = ref([])
const errorList = ref([])

const removeEmptyValuesFromObjects = function (originalObject) {
    const object = {...originalObject}
    Object.keys(originalObject).forEach(attribute => {
        if(typeof object[attribute] === 'object') {
            object[attribute] = removeEmptyValuesFromObjects(object[attribute])
            if(!Object.keys(object[attribute]).length) {
                delete object[attribute]
            } 
        } else {
            if(object[attribute] === '') {
                delete object[attribute]
            }
        }
    })
    return object
}
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
            if(item.required && item.value === 'null') {
                recordErrors.push(keys[j] + ' cannot be null');
            } else if(!['', undefined].includes(item.value) && item.type !== 'modal' && item.included) {
                sanitizedRecord[item.path] = item.value
            } else if(
                (item.type === 'modal' && item.required && item.value.length < 1)
                || (item.type !== 'modal' && item.required && item.included)
            ) {
                recordErrors.push('missing required field: ' + keys[j]);
            } 
            if(item.type === 'modal' && item.included && item.value.length) {
                sanitizedRecord[item.path] = []
                item.value.forEach(modalObject => {
                    modalObject = removeEmptyValuesFromObjects(modalObject)
                    const tempObject = {}
                    Object.keys(modalObject).forEach(key => {
                        if(modalObject[key] !== '') {
                            tempObject[key] = modalObject[key]
                        } 
                    })
                    sanitizedRecord[item.path].push(tempObject);
                })
            }
        }
        if(Object.keys(sanitizedRecord).length) {
            sanitizedRecords.value.push(sanitizedRecord);
            errorList.value.push(recordErrors);
        }
    }
}


export default function useValidation() {
    return {
        validateRecords,
        removeEmptyValuesFromObjects,
        sanitizedRecords,
        errorList
    }
}