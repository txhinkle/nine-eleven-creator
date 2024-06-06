import {ref} from 'vue'
const eligibilityList = ref([]);
const currentEligibilityRecord = ref({});
const currentRecordSections = ref([]);
const currentRecordValidationObject = ref({})
// flattened keys... what do you need to rebuild? XML needs to know what level to build
const optionalSections = {
    'includeUnborn': [
        'MotherId',
        'UnbornId'
    ]
}

const addNewRecord = () => {
    currentRecordValidationObject.value = {
        // add booleans for sections
        includeUnborn: false,
        // includeChipPremium: false,
        // includeRace: false,
        // includeEligibiilityApplication: false,
        // includeShellProgram: false,
        // includeLivingArrangement: false,
        // includeCommunicationData: false,
        // includeMemberEligibility: false,
        // includeFosterCare: false,
        // includeSubsidizedAdoption: false,
        // includeGuardian: false,
        // includeSsaDisability: false,
        // includeMedicareEligibility: false,
        // includeLinkedMembers: false,
        // includeTobaccoSurveyCessation: false,
        // includeInmate: false,
        // includeUppPremiumInformation: false,
        // includeEsiPremiumInformation: false,
    };

    const recordConfigurationBasic = {
        ErepCaseId: {
            path: 'CaseDetails.ErepCaseId',
            type: 'number',
            value: '',
            required: true,
            included: true,
        },
        HohMemberId: {
            path: 'CaseDetails.HohDetails.HohMemberId',
            type: 'number',
            value: '',
            required: true,
            included: true,
        },
        SpokenLanguage: {
            path: 'CaseDetails.HohDetails.SpokenLanguage',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        MotherId: {
            path: 'CaseDetails.UnbornLinks.MotherID',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        UnbornId: {
            path: 'CaseDetails.UnbornLinks.UnbornId',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        Chip5Percent: {
            path: 'CaseDetails.ChipPremiumDetails.Chip5Percent',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        MemberId: {
            path: 'MemberData.MemberId',
            type: 'number',
            value: '',
            required: true,
            included: true,
        },
        FirstName: {
            path: 'MemberData.Demographics.FirstName',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        MiddleName: {
            path: 'MemberData.Demographics.MiddleName',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        LastName: {
            path: 'MemberData.Demographics.LastName',
            type: 'text',
            value: '',
            required: true,
            included: true,
        },
        Suffix: {
            path: 'MemberData.Demographics.Suffix',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        Ssn: {
            path: 'MemberData.Demographics.Details.Ssn',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        Hispanic: {
            path: 'MemberData.Demographics.Details.Hispanic',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        BirthDate: {
            path: 'MemberData.Demographics.Details.BirthDate',
            type: 'text',
            value: '',
            required: true,
            included: true,
        },
        MaritalStatus: {
            path: 'MemberData.Demographics.Details.MaritalStatus',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        Gender: {
            path: 'MemberData.Demographics.Details.Gender',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        Citizenship: {
            path: 'MemberData.Demographics.Details.Citizenship',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        AlienType: {
            path: 'MemberData.Demographics.Details.AlienType',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        MortalityDate: {
            path: 'MemberData.Demographics.Details.MortalityDate',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        DistrictOffice: {
            path: 'MemberData.Demographics.Details.DistrictOffice',
            type: 'text',
            value: '',
            required: false,
            included: true,
        },
        EligibilityReviewDate: {
            path: 'MemberData.Demographics.Details.EligibilityReviewDate',
            type: '',
            value: '',
            required: false,
            included: true,
        },
        Address: {
            path: 'MemberData.Address',
            type: 'modal',
            value: [],
            required: false,
            included: true,
        }
    };

    currentEligibilityRecord.value = {...recordConfigurationBasic};
    
    eligibilityList.value.push(currentEligibilityRecord.value);
    currentRecordSections.value.push(currentRecordValidationObject.value)
}

const selectRecord = function(index) {
    currentEligibilityRecord.value = eligibilityList.value[index];
    currentRecordValidationObject.value = currentRecordSections.value[index];
}

const toggleIncluded = function(section) {
    currentRecordValidationObject.value[section] = !currentRecordValidationObject.value[section];
    optionalSections[section].forEach(element => {
        const attribute = {...currentEligibilityRecord.value[element]};
        currentEligibilityRecord.value[element] = {
            ...currentEligibilityRecord.value[element],
            included: !attribute.included
        }
    });
    console.log('added', section);
}

export default function useRecord() {
    return {
        addNewRecord,
        eligibilityList,
        currentEligibilityRecord,
        currentRecordValidationObject,
        toggleIncluded,
        selectRecord
    }
}