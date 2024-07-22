import useRecord from "./useRecord"
import {ref, watch} from 'vue'
const { eligibilityList} = useRecord()

watch(eligibilityList, async () => {
	sanitizedRecords.value = [];
})

const sanitizedRecords = ref([])
const errorList = ref([])

// other required sets
const removeEmptyValuesFromObjects = function (originalObject) {
    const object = {...originalObject}
    Object.keys(originalObject).forEach(attribute => {
        if(typeof object[attribute] === 'object') {
            object[attribute] = removeEmptyValuesFromObjects(object[attribute])
            console.log('attribute', attribute)
            console.log('attribute length', Object.keys(object[attribute]).length)
            if(!Object.keys(object[attribute]).length) {
                delete object[attribute]
            } 
        } else {
            if(object[attribute] === '') {
                console.log('actually removing')
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
            if(item.value !== '' && item.type !== 'modal' && item.included) {
                sanitizedRecord[item.path] = item.value
            }
            else if(item.required && item.included) {
                recordErrors.push('missing required field:' + keys[j]);
            }
            if(item.type === 'modal' && item.included && item.value.length) {
                // console.log('item.value', item.value);
                sanitizedRecord[item.path] = []
                item.value.forEach(modalObject => {
                    const tempObject = {}
                    Object.keys(modalObject).forEach(key => {
                        if(modalObject[key] !== '') {
                            tempObject[key] = modalObject[key]
                        } 
                    })
                    // console.log('item.path', item.path)
                    sanitizedRecord[item.path].push(tempObject);
                })
                // console.log('modal result', sanitizedRecord[item.path])
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
        removeEmptyValuesFromObjects,
        sanitizedRecords,
        errorList
    }
}