import useRecord from "./useRecord"
import {ref, watch} from 'vue'
const { eligibilityList, currentRecordSections} = useRecord()

const basicRequiredFields = [ 
    'CaseDetails.ErepCaseId',
    'CaseDetails.HohDetails.HohMemberId',
    'MemberData.MemberId',
    'MemberData.Demographics.LastName',
    'MemberData.Demographics.Details.BirthDate',
    'MemberData.Demographics.Details.Gender',
    'MemberData.Demographics.Details.Citizenship',
    'MemberData.Address[0].AddressType',
    'MemberData.Address[0].Street1',
    'MemberData.Address[0].CityName',
    'MemberData.Address[0].StateCode',
    'MemberData.Address[0].ZipCode',
    'MemberData.Address[0].AddressStartDate',
    'MemberData.Address[0].AddressEndDate'
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
            if(item.value !== '' && item.type !== 'modal') {
                sanitizedRecord[item.path] = item.value
            }
            else if(item.required) {
                recordErrors.push('missing required field:' + keys[j]);
            }
            if(item.path === 'MemberData.Address' && !item.value.length) {
                recordErrors.push('missing required field: Address');
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