import useRecord from "./useRecord"
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

// other required sets

const validateRecords = function() {
    for(let i = 0; i < eligibilityList.length; i++) {
        // bad logic below, replace
        const requiredFields = {
            'sections': currentRecordSections[i],
            ...basicRequiredFields
        }
        return requiredFields
    }
}

// helper functions for validate record to use

export default useValidation = function() {
    return {
        validateRecords
    }
}