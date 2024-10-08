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

const maxDays = {
    '01': '31',
    '02': '28',
    '02l': '29',
    '03': '31',
    '04': '30',
    '05': '31',
    '06': '30',
    '07': '31',
    '08': '31',
    '09': '30',
    '10': '31',
    '11': '30',
    '12': '31'
}

const nextMonth = {
    '01': '02',
    '02': '03',
    '03':'04',
    '04':'05',
    '05':'06',
    '06' : '07',
    '07': '08',
    '08': '09',
    '09':'10',
    '10':'11',
    '11': '12',
    '12':'01'
}

const breakMonths = function(start, end) {
    const startArray = start.split('-');
    const endArray = end.split('-');
    if(startArray[0] === endArray[0] && startArray[1] === endArray[1]) {
        return [{
            start,
            end
        }]
    } else {
        const result = [];
        let currentStart = start;
        let currentEnd = start;
        do {
            let lookup = currentStart.substring(5,7)    
            if(lookup === '02' && (currentStart.substring(0,4) * 1) % 4 === 0 && (currentStart.substring(0,4) * 1) % 100 !== 0) {
                lookup = '02l'
            } 
            currentEnd = (end > (currentStart.substring(0,8) + maxDays[lookup])) ? currentStart.substring(0,8) + maxDays[lookup] + '': end
            result.push({
                start: currentStart,
                end: currentEnd
            })
            currentStart = currentStart.substring(5,7) === '12' ? (currentStart.substring(0,5) * 1 + 1) + nextMonth[currentStart.substring(5,7)] + currentStart.substring(7) : currentStart.substring(0,5) + nextMonth[currentStart.substring(5,7)] + currentStart.substring(7)
        } while (currentEnd < end)
        return result;
    }
}

export default function useValidation() {
    return {
        validateRecords,
        removeEmptyValuesFromObjects,
        sanitizedRecords,
        errorList,
        breakMonths,
    }
}