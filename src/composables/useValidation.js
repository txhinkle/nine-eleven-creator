import useRecord from "./useRecord"
import {ref, watch} from 'vue'
const { eligibilityList} = useRecord()

watch(eligibilityList, async () => {
	sanitizedRecords.value = [];
})

const sanitizedRecords = ref([])
const errorList = ref([])

const removeEmptyValuesFromObjects = function (originalObject) {
    // array or objects could end up here
    const object = {...originalObject}
    Object.keys(originalObject).forEach(attribute => {
        if(typeof object[attribute] === 'object') {
            if(Array.isArray(object[attribute])) {
                object[attribute].forEach((ob) => {
                    if(attribute === 'Facility') {
                        if(!ob['EndDate'].length) {
                            ob.EndDate = 'null'
                        }
                    }
                    removeEmptyValuesFromObjects(ob)
                })
            } else {
                object[attribute] = removeEmptyValuesFromObjects(object[attribute])
                if(!Object.keys(object[attribute]).length) {
                    delete object[attribute]
                } 
            }
        } else {
            if(object[attribute] === '' || (Array.isArray(object[attribute]) && !object[attribute].length)) {
                delete object[attribute]
            }
        }
    })
    return object
}

const simplifyObjects = function(dataObject) {
    const simpleObject = {}
    Object.keys(dataObject).forEach((key) => {
        if(key === 'Rac' || key === 'Benefit') {
            const tempArray = [];
            dataObject[key].value.forEach((aspect) => {
                tempArray.push(removeEmptyValuesFromObjects(aspect))
            })
            if(tempArray.length) {
                simpleObject[dataObject[key].path] = tempArray;
            }
        } else if(dataObject[key].value !== '' && dataObject[key].value.length) {
            simpleObject[dataObject[key].path] = dataObject[key].value
        }
    })
    return simpleObject
}

const validateMemberRecords = function(member) {
    const list = []
    Object.keys(member).forEach((item) => {
        if(['', undefined].includes(member[item].value) && member[item].included && member[item].required) {
            list.push(member['MemberId'].value + ' missing required field: ' + item)
        } else if(member[item].type === 'modal' && member[item].required && member[item].value.length < 1) {
            list.push('missing required field: ' + item);
        }
    })
    return list;
}

const validateRecords = function() {

    sanitizedRecords.value = []
    errorList.value = []
    const list = eligibilityList.value
    for(let i = 0; i < list.length; i++) {
        const record = {...list[i]}
        const sanitizedRecord = {}
        let recordErrors = {
            caseDetail: [],
            memberData: {}
        }
        const keys = Object.keys(record);
        for(let j = 0; j < keys.length; j++) {
            const item = record[keys[j]]
            if(item.required && item.value === 'null') {
                recordErrors.caseDetail.push(keys[j] + ' cannot be null');
            } else if(!['', undefined].includes(item.value) && item.type !== 'modal' && item.included) {
                sanitizedRecord[item.path] = item.value
            } else if( 
                (item.type === 'modal' && item.required && item.value.length < 1 && item.included)
                || (item.type !== 'modal' && item.required && item.included)
            ) {
                recordErrors.caseDetail.push('missing required field: ' + keys[j]);
            }
            if(item.type === 'modal' && item.included && item.value.length) {
                if(item.path !== 'MemberData') {
                    const modalValues = []
                    if(item.value.length) {
                        item.value.forEach((modalValue) => {
                            recordErrors = { ... recordErrors, ...validateMemberRecords(modalValue) };
                            modalValue = simplifyObjects(modalValue);
                            modalValues.push(modalValue);
                        })
                    }
                    sanitizedRecord[item.path] = modalValues;
                } else {
                    const members = []
                    if(item.value.length) {
                        item.value.forEach((member) => {
                            const mid = member.MemberId.value;
                            recordErrors = {
                                ... recordErrors,
                                memberData: { ...recordErrors.memberData }
                            };
                            recordErrors.memberData[mid] = validateMemberRecords(member);
                            member = simplifyObjects(member);
                            members.push(member)
                        })
                    }
                    sanitizedRecord[item.path] = members
                }
                
            }
        }
            sanitizedRecords.value.push(sanitizedRecord);
            errorList.value.push(recordErrors);
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

const determineOngoing = function() {
    const todayString = new Date(Date.now())
    let todayMonth = todayString.getMonth() + 2
    const todayYear = todayMonth > 11 ? todayString.getFullYear() + 1 : todayString.getFullYear()
    todayMonth = todayMonth > 11 ? todayMonth = todayMonth - 12 + '' : todayMonth + ''
    todayMonth = todayMonth.length === 1  ? '0' + todayMonth : todayMonth
    
    return todayYear + '-' + todayMonth + '-' + todayString.getDate()
}

const isLeapYear = function(lookup, start) {
    return lookup === '02' && (start.substring(0,4) * 1) % 4 === 0 && (start.substring(0,4) * 1) % 100 !== 0

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
            if(isLeapYear(lookup, currentStart)) {
                lookup = '02l'
            } 
            currentEnd = (end > (currentStart.substring(0,8) + maxDays[lookup])) ? currentStart.substring(0,8) + maxDays[lookup] + '': end
            result.push({
                start: currentStart,
                end: currentEnd
            })
            currentStart = lookup === '12' ? (currentStart.substring(0,4) * 1 + 1) + '-' + nextMonth[currentStart.substring(5,7)] + '-01' : currentStart.substring(0,5) + nextMonth[currentStart.substring(5,7)] + '-01'
        } while (currentEnd < end && currentEnd <= determineOngoing())
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