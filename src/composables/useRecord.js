import {ref} from 'vue'
const eligibilityList = ref([]);
const currentEligibilityRecord = ref({});
const currentRecordSections = ref([]);
const currentRecordValidationObject = ref({})

const optionalSections = {
    'includeUnborn': [
        'MotherId',
        'UnbornId'
    ],
    'includeChipPremium': [
       'Chip5Percent',
       'LateFeeAssessedAmount',
       'DueProcessIndicator',
       'CertificationStartDate',
       'CertificationEndDate',
       'IssuanceDate'
    ],
    'includeCaseHeadRelationshipDetails': [
        'HohMemberId-RelationshipDetails',
        'MemberId-RelationshipDetails',
        'RelationshipCode',
        'RelationshipStartDate',
        'RelationshipEndDate'
    ],
    includeEligibilityApplication: [
        'EligibilityProgramStatus',
        'DenialClosureReason',
        'ApplicationDate'
    ]
}

const addNewRecord = () => {
    currentRecordValidationObject.value = {
        // add booleans for sections
        includeUnborn: false,
        includeChipPremium: false,
        includeCaseHeadRelationshipDetails: false,
        includeEligibilityApplication: false,
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
        LateFeeAssessedAmount: {
            path: 'CaseDetails.ChipPremiumDetails.LateFeeAssessedAmount',
            type: 'number',
            value: '',
            required: false,
            included: false,
        },
        DueProcessIndicator: {
            path: 'CaseDetails.ChipPremiumDetails.DueProcessIndicator',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        CertificationStartDate: {
            path: 'CaseDetails.ChipPremiumDetails.CertificationStartDate',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        CertificationEndDate: {
            path: 'CaseDetails.ChipPremiumDetails.CertificationEndDate',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        IssuanceDate: {
            path: 'CaseDetails.ChipPremiumDetails.IssuanceDate',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        'HohMemberId-RelationshipDetails': {
            path: 'CaseDetails.CaseHeadRelationshipDetails.HohMemberId',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        'MemberId-RelationshipDetails': {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.MemberId',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        RelationshipCode: {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.RelationshipCode',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        RelationshipStartDate: {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.RelationshipStartDate',
            type: 'number',
            value: '',
            required: true,
            included: false,
        },
        RelationshipEndDate: {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.RelationshipEndDate',
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
        RaceCode: {
            path: 'MemberData.Demographics.Race.RaceCode',
            type: 'text',
            value: '',
            required: true,
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
        EligibilityProgramStatus: {
            path: 'MemberData.Demographics.EligibilityApplication.EligibilityProgramStatus',
            type: '',
            value: '',
            required: false,
            included: false,
        },
        DenialClosureReason: {
            path: 'MemberData.Demographics.EligibilityApplication.DenialClosureReason',
            type: '',
            value: '',
            required: false,
            included: false,
        },
        ApplicationDate: {
            path: 'MemberData.Demographics.EligibilityApplication.ApplicationDate',
            type: '',
            value: '',
            required: false,
            included: false,
        },
        //
        Address: {
            path: 'MemberData.Address',
            type: 'modal',
            value: [],
            required: true,
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