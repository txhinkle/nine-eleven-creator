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
    ],
    includeShellProgram: [
        'ShellProgramType',
        'ShellProgramStatus',
        'ShellProgramStartDate',
        'ShellProgramEndDate'
    ],
    includeLivingArrangement: [
        'Type',
        'StartDate-LivingArrangement',
        'EndDate-LivingArrangement'
    ],
    includeCommunicationData: [
        'CommunicationType',
        'CommunicationValue',
        'ContactName',
        'CommunicationStartDate',
        'CommunicationEndDate',
    ],
    includeMemberEligibility: [
        'RacCode',
        'RacBeginDate',
        'RacEndDate',
        'RacIssuanceDate',
        'PregnancyStatus',
        'PregnancyStartDate',
        'PregnancyDueDate',
        'PregnancyEndDate',
        'Income',
        'ContributingMemberId',
        'RelationshipCode',
        'CopayExemptIndicator',
        'Amount-PatientLiability',
        // break for spenddown
        'SPMIndicator',
        'MedicareDualEligibilityStatusCode',
    ],
    includeSpenddown: [
        'SpenddownIndicator',
        'MetDate',
        'Amount-Spenddown',
        'BillId',
        'BillAccountNumber',
        'BillStartDate',
        'BillEndDate',
        'ServiceType',
        'PrescriptionNumber',
        'ErepCurrentUsedAmount',
        'TotalBill',
        'BillingProviderName',
        'BillingProviderStreet1',
        'BillingProviderStreet2',
        'BillingProviderStreet3',
        'BillingProviderCityName',
        'BillingProviderStateCode',
        'BillingProviderZipCode',
        'BillingProviderZipCodeExtension',
        'BillingProviderCountyCode',
        'BilledPersonSuffix',
        'BilledPersonFirstName',
        'BilledPersonMiddleName',
        'BilledPersonLastName',
    ],
    includeBenefit: [],
    includeFosterCare: [],
    includeSubsidizedAdoption: [],
    includeGuardian: [],
    includeSsaDisability: [],
    includeMedicareEligibility: [],
    includeLinkedMembers: [],
    includeTobaccoSurveyCessation: [],
    includeInmate: [],
    includeUppPremiumInformation: [],
    includeEsiPremiumInformation: [],
}

const addNewRecord = () => {
    currentRecordValidationObject.value = {
        // add booleans for sections
        includeUnborn: false,
        includeChipPremium: false,
        includeCaseHeadRelationshipDetails: false,
        includeEligibilityApplication: false,
        includeShellProgram: false,
        includeLivingArrangement: false,
        includeCommunicationData: false,
        // includeMemberEligibility: false,
        // includeSpenddown: false,
        // includeBenefit:false,
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
            type: 'tel',
            value: '',
            required: true,
            included: true,
        },
        HohMemberId: {
            path: 'CaseDetails.HohDetails.HohMemberId',
            type: 'tel',
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
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        UnbornId: {
            path: 'CaseDetails.UnbornLinks.UnbornId',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        Chip5Percent: {
            path: 'CaseDetails.ChipPremiumDetails.Chip5Percent',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        LateFeeAssessedAmount: {
            path: 'CaseDetails.ChipPremiumDetails.LateFeeAssessedAmount',
            type: 'tel',
            value: '',
            required: false,
            included: false,
        },
        DueProcessIndicator: {
            path: 'CaseDetails.ChipPremiumDetails.DueProcessIndicator',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        CertificationStartDate: {
            path: 'CaseDetails.ChipPremiumDetails.CertificationStartDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        CertificationEndDate: {
            path: 'CaseDetails.ChipPremiumDetails.CertificationEndDate',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        IssuanceDate: {
            path: 'CaseDetails.ChipPremiumDetails.IssuanceDate',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        'HohMemberId-RelationshipDetails': {
            path: 'CaseDetails.CaseHeadRelationshipDetails.HohMemberId',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        'MemberId-RelationshipDetails': {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.MemberId',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        RelationshipCode: {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.RelationshipCode',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        RelationshipStartDate: {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.RelationshipStartDate',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        RelationshipEndDate: {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.RelationshipEndDate',
            type: 'tel',
            value: '',
            required: true,
            included: false,
        },
        MemberId: {
            path: 'MemberData.MemberId',
            type: 'tel',
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
            type: 'text',
            value: '',
            required: true,
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
            required: true,
            included: false,
        },
        ShellProgramType: {
            path: 'MemberData.Demographics.ShellProgram.ShellProgramType',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        ShellProgramStatus: {
            path: 'MemberData.Demographics.ShellProgram.ShellProgramStatus',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        ShellProgramStartDate: {
            path: 'MemberData.Demographics.ShellProgram.ShellProgramStartDate',
            type: '',
            value: '',
            required: true,
            included: false,
        },
        ShellProgramEndDate: {
            path: 'MemberData.Demographics.ShellProgram.ShellProgramEndDate',
            type: '',
            value: '',
            required: true,
            included: false,
        },
        Type: {
            path: 'MemberData.Demographics.LivingArrangement.Type',
            type: '',
            value: '',
            required: true,
            included: false,
        },
        StartDate: {
            path: 'MemberData.Demographics.LivingArrangement.StartDate',
            type: '',
            value: '',
            required: false,
            included: false,
        },
        EndDate: {
            path: 'MemberData.Demographics.LivingArrangement.EndDate',
            type: '',
            value: '',
            required: false,
            included: false,
        },
        CommunicationType: {
            path: 'MemberData.CommunicationData.CommunicationType',
            type: '',
            value: '',
            required: true,
            included: false,
        },
        CommunicationValue: {
            path: 'MemberData.CommunicationData.CommunicationValue',
            type: '',
            value: '',
            required: true,
            included: false,
        },
        ContactName: {
            path: 'MemberData.CommunicationData.ContactName',
            type: '',
            value: '',
            required: false,
            included: false,
        },
        CommunicationStartDate: {
            path: 'MemberData.CommunicationData.CommunicationStartDate',
            type: '',
            value: '',
            required: false,
            included: false,
        },
        CommunicationEndDate: {
            path: 'MemberData.CommunicationData.CommunicationEndDate',
            type: '',
            value: '',
            required: false,
            included: false,
        },
        Rac: {
            path: 'MemberData.MemberEligibility.Rac',
            type: 'modal',
            value: [],
            required: true,
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
    if(section === 'includeMemberEligibility') {
        currentRecordValidationObject.value[section] === false
            ? delete currentRecordValidationObject.value.includeSpenddown
            : currentRecordValidationObject.value.includeSpenddown = false
    }
    // populate MemberId or HohMemberId?
    optionalSections[section].forEach(element => {
        const attribute = {...currentEligibilityRecord.value[element]};
        currentEligibilityRecord.value[element] = {
            ...currentEligibilityRecord.value[element],
            included: !attribute.included
        }
        if(element.includes('HohMemberId') && currentEligibilityRecord.value.HohMemberId.value) {
            currentEligibilityRecord.value[element].value = currentEligibilityRecord.value.HohMemberId.value
        } else if(element.includes('MemberId') && currentEligibilityRecord.value.MemberId.value) {
            currentEligibilityRecord.value[element].value = currentEligibilityRecord.value.MemberId.value
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