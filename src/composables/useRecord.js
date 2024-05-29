import {ref} from 'vue'
const eligibilityList = ref([]);
const currentEligibilityRecord = ref({});
const currentRecordSections = ref([]);
const currentRecordValidationObject = ref({})
// flattened keys... what do you need to rebuild? XML needs to know what level to build

const addNewRecord = () => {
    currentRecordValidationObject.value = {
        // add booleans for sections
        includeUnborn: false,
        includeChipPremium: false,
        includeRace: false,
        includeEligibiilityApplication: false,
        includeShellProgram: false,
        includeLivingArrangement: false,
        includeCommunicationData: false,
        includeMemberEligibility: false,
        includeFosterCare: false,
        includeSubsidizedAdoption: false,
        includeGuardian: false,
        includeSsaDisability: false,
        includeMedicareEligibility: false,
        includeLinkedMembers: false,
        includeTobaccoSurveyCessation: false,
        includeInmate: false,
        includeUppPremiumInformation: false,
        includeEsiPremiumInformation: false,
    };

    const recordConfigurationBasic = {
        ErepCaseId: {
            path: 'CaseDetails.ErepCaseId',
            type: 'number',
            value: '',
            required: true
        },
        HohMemberId: {
            path: 'CaseDetails.HohDetails.HohMemberId',
            type: 'number',
            value: '',
            required: true
        },
        SpokenLanguage: {
            path: 'CaseDetails.HohDetails.SpokenLanguage',
            type: 'text',
            value: '',
            required: false
        },
        MemberId: {
            path: 'MemberData.MemberId',
            type: 'number',
            value: '',
            required: true
        },
        FirstName: {
            path: 'MemberData.Demographics.FirstName',
            type: 'text',
            value: '',
            required: false
        },
        MiddleName: {
            path: 'MemberData.Demographics.MiddleName',
            type: 'text',
            value: '',
            required: false
        },
        LastName: {
            path: 'MemberData.Demographics.LastName',
            type: 'text',
            value: '',
            required: true
        },
        Suffix: {
            path: 'MemberData.Demographics.Suffix',
            type: 'text',
            value: '',
            required: false
        },
        Ssn: {
            path: 'MemberData.Demographics.Details.Ssn',
            type: 'text',
            value: '',
            required: false
        },
        Hispanic: {
            path: 'MemberData.Demographics.Details.Hispanic',
            type: 'text',
            value: '',
            required: false
        },
        BirthDate: {
            path: 'MemberData.Demographics.Details.BirthDate',
            type: 'text',
            value: '',
            required: true
        },
        MaritalStatus: {
            path: 'MemberData.Demographics.Details.MaritalStatus',
            type: 'text',
            value: '',
            required: false
        },
        Gender: {
            path: 'MemberData.Demographics.Details.Gender',
            type: 'text',
            value: '',
            required: false
        },
        Citizenship: {
            path: 'MemberData.Demographics.Details.Citizenship',
            type: 'text',
            value: '',
            required: false
        },
        AlienType: {
            path: 'MemberData.Demographics.Details.AlienType',
            type: 'text',
            value: '',
            required: false
        },
        MortalityDate: {
            path: 'MemberData.Demographics.Details.MortalityDate',
            type: 'text',
            value: '',
            required: false
        },
        DistrictOffice: {
            path: 'MemberData.Demographics.Details.DistrictOffice',
            type: 'text',
            value: '',
            required: false
        },
        EligibilityReviewDate: {
            path: 'MemberData.Demographics.Details.EligibilityReviewDate',
            type: '',
            value: '',
            required: false
        },
        Address: {
            path: 'MemberData.Address',
            type: 'modal',
            value: [],
            required: false
        }
    };

    currentEligibilityRecord.value = {...recordConfigurationBasic};
    
    // {
    //     'CaseDetails.ErepCaseId': '',
    //     'CaseDetails.HohDetails.HohMemberId': '',
    //     'CaseDetails.HohDetails.SpokenLanguage': '',
    //     'MemberData.MemberId': '',
    //     'MemberData.Demographics.FirstName': '',
    //     'MemberData.Demographics.MiddleName': '',
    //     'MemberData.Demographics.LastName': '',
    //     'MemberData.Demographics.Suffix': '',
    //     'MemberData.Demographics.Details.Ssn': '',
    //     'MemberData.Demographics.Details.Hispanic': '',
    //     'MemberData.Demographics.Details.BirthDate': '',
    //     'MemberData.Demographics.Details.MaritalStatus': '',
    //     'MemberData.Demographics.Details.Gender': '',
    //     'MemberData.Demographics.Details.Citizenship': '',
    //     'MemberData.Demographics.Details.AlienType': '',
    //     'MemberData.Demographics.Details.MortalityDate': '',
    //     'MemberData.Demographics.Details.DistrictOffice': '',
    //     'MemberData.Demographics.Details.EligibilityReviewDate': '',
    //     'MemberData.Address': []
    // }
    eligibilityList.value.push(currentEligibilityRecord.value);
    currentRecordSections.value.push(currentRecordValidationObject.value)
}

const selectRecord = function(index) {
    // eligibilityList = ref([]);
    // currentEligibilityRecord = ref({});
    // currentRecordSections = ref([]);
    // currentRecordValidationObject = ref({})
    currentEligibilityRecord.value = eligibilityList.value[index];
    currentRecordValidationObject.value = currentRecordSections.value[index];
}

export default function useRecord() {
    return {
        addNewRecord,
        eligibilityList,
        currentEligibilityRecord,
        selectRecord
    }
}