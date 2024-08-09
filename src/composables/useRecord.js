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
        'LivingArrangementType',
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
    includeFosterCare: [
        'FosterCareParentName'
    ],
    includeSubsidizedAdoption: [
        'SubsidizedParentFirstName',
        'SubsidizedParentLastName',
        'SubsidizedParentPhoneNumber',
    ],
    includeGuardian: [
        'GuardianParentFirstName',
        'GuardianParentLastName',
        'GuardianParentPhoneNumber',
    ],
    includeRac: ['Rac'],
    includeBenefit: ['Benefit'],
    includeSsaDisability: [
        'DisabilityInitialEntitlementDate',
        'DisabilityDeterminedBy'
    ],
    includeMedicareEligibility: [
        'MedicareIdType',
        'Id',
        'IdOccurrence',
        'IdStartDate',
        'IdEndDate'
    ],
    includeMedicareCoverageDetailsPartA: [
        'MedicareCoverageType (PartA)',
        'MedicareCoverageStartDate (PartA)',
        'MedicareCoverageEndDate (PartA)'
    ],
    includeMedicareCoverageDetailsPartB: [
        'MedicareCoverageType (PartB)',
        'MedicareCoverageStartDate (PartB)',
        'MedicareCoverageEndDate (PartB)'
    ],
    includeMedicareBuyinPartA: [
        'FileLoadDate',
        'AccretionCode',
        'AccretionStartDate',
        'AccretionEndDate',
        'DeletionCode',
        'DeletionStartDate',
        'DeletionEndDate',
        'BuyinEligibilityCode',
        'PremiumAmount',
        'BillMonth',
        'StatusDescription'
        // Ric and such still needs to be added. waiting to see if I need to change my approach
    ],
    includeLinkedMembers: [
        'PrimaryMemberId',
        'SecondaryMemberId'
    ],
    includeTobaccoSurveyCessation: [
        'Indicator',
        'ResponseDate'
    ],
    includeIncarceration: [],
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
        includeRac: false,
        includeBenefit:false,
        includeFosterCare: false,
        includeSubsidizedAdoption: false,
        includeGuardian: false,
        includeSsaDisability: false,
        // Medicare Sections
        // includeMedicareEligibility: false,
        // includeMedicareCoverageDetailsPartA: false,
        // includeMedicareCoverageDetailsPartB: false,
        // includeMedicareBuyinPartA: false
        includeLinkedMembers: false,
        includeTobaccoSurveyCessation: false,
        // includeIncarceration: false,
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
            path: 'CaseDetails.UnbornLinks.MotherId',
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
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        IssuanceDate: {
            path: 'CaseDetails.ChipPremiumDetails.IssuanceDate',
            type: 'date',
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
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        RelationshipEndDate: {
            path: 'CaseDetails.CaseHeadRelationshipDetails.MemberRelationshipToHoh.RelationshipEndDate',
            type: 'date',
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
            type: 'date',
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
            required: true,
            included: true,
        },
        Citizenship: {
            path: 'MemberData.Demographics.Details.Citizenship',
            type: 'text',
            value: '',
            required: true,
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
            type: 'date',
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
            type: 'date',
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
            type: 'date',
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
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        ShellProgramEndDate: {
            path: 'MemberData.Demographics.ShellProgram.ShellProgramEndDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'LivingArrangementType': {
            path: 'MemberData.Demographics.LivingArrangement.Type',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'StartDate-LivingArrangement': {
            path: 'MemberData.Demographics.LivingArrangement.StartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'EndDate-LivingArrangement': {
            path: 'MemberData.Demographics.LivingArrangement.EndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'CommunicationType': {
            path: 'MemberData.CommunicationData.CommunicationType',
            type: '',
            value: '',
            required: true,
            included: false,
        },
        'CommunicationValue': {
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
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        CommunicationEndDate: {
            path: 'MemberData.CommunicationData.CommunicationEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        Rac: {
            path: 'MemberData.MemberEligibility.Rac',
            type: 'modal',
            value: [],
            required: false,
            included: false,
        },
        Benefit: {
            path: 'MemberData.MemberEligibility.Benefit',
            type: 'modal',
            value: [],
            required: false,
            included: false,
        },
        Address: {
            path: 'MemberData.Address',
            type: 'modal',
            value: [],
            required: true,
            included: true,
        },
        ExemptDuplicateIndicator: {
            path: 'MemberData.ExemptDuplicateIndicator',
            type: 'text',
            value: '',
            required: true,
            included: true,
        },
        FosterCareParentName: {
            path: 'MemberData.FosterCare.FosterCareParentName',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        SubsidizedParentFirstName: {
            path: 'MemberData.SubsidizedAdoption.SubsidizedParentFirstName',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        SubsidizedParentLastName: {
            path: 'MemberData.SubsidizedAdoption.SubsidizedParentLastName',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        SubsidizedParentPhoneNumber: {
            path: 'MemberData.SubsidizedAdoption.SubsidizedParentPhoneNumber',
            type: 'tell',
            value: '',
            required: false,
            included: false,
        },
        GuardianParentFirstName: {
            path: 'MemberData.Guardian.GuardianParentFirstName',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        GuardianParentLastName: {
            path: 'MemberData.Guardian.GuardianParentLastName',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        GuardianParentPhoneNumber: {
            path: 'MemberData.Guardian.GuardianParentPhoneNumber',
            type: 'tell',
            value: '',
            required: false,
            included: false,
        },
        DisabilityInitialEntitlementDate: {
            path: 'MemberData.SsaDisability.DisabilityInitialEntitlementDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        DisabilityDeterminedBy: {
            path: 'MemberData.SsaDisability.DisabilityDeterminedBy',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        //Medicare start
        MedicareIdType: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareIdType',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        Id: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Id',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        IdOccurrence: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.IdOccurrence',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        IdStartDated: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.IdStartDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        IdEndDate: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.IdEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'MedicareCoverageType (PartA)': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageType',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'MedicareCoverageStartDate (PartA)': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageStartDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'MedicareCoverageEndDate (PartA)': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'MedicareCoverageType (PartB)': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageType',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'MedicareCoverageStartDate (PartB)': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageStartDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'MedicareCoverageEndDate (PartB)': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        FileLoadDate: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.FileLoadDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        AccretionCodeA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.AccretionCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        AccretionStartDateA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.AccretionStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        AccretionEndDateA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.AccretionEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        DeletionCodeA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.DeletionCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        DeletionStartDateA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.DeletionStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        DeletionEndDateA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.DeletionEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        BuyinEligibilityCodeA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.BuyinEligibilityCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        PremiumAmountA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.PremiumAmount',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        BillMonthA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.BillMonth',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        StatusDescriptionA: {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.Buyin.PartA.StateAgencyToCms.StatusDescription',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        // Skipping past other Medicare fields for now
        PrimaryMemberId: {
            path: 'MemberData.LinkedMembers.PrimaryMemberId',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        SecondaryMemberId: {
            path: 'MemberData.LinkedMembers.SecondaryMemberId',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        Indicator: {
            path: 'MemberData.TobaccoSurveyCessation.Indicator',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        ResponseDate: {
            path: 'MemberData.TobaccoSurveyCessation.ResponseDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        Incarceration: {
            path: 'MemberData.Inmate.Incarceration',
            type: 'modal',
            value: [],
            required: false,
            included: false,
        },
        UppPremiumInformation: {
            path: 'MemberData.UppPremiumInformation',
            type: 'modal',
            value: [],
            required: false,
            included: false,
        },
        ESIPremiumInformation: {
            path: 'MemberData.ESIPremiumInformation',
            type: 'modal',
            value: [],
            required: false,
            included: false,
        },

    };

    currentEligibilityRecord.value = {...recordConfigurationBasic};
    
    eligibilityList.value.push(currentEligibilityRecord.value);
    currentRecordSections.value.push(currentRecordValidationObject.value)
}

const selectRecord = function(index) {
    currentEligibilityRecord.value = eligibilityList.value[index];
    currentRecordValidationObject.value = currentRecordSections.value[index];
}

const deleteRecord = function(index) {
    eligibilityList.value.splice(index, 1)
}

const toggleIncluded = function(section) {
    currentRecordValidationObject.value[section] = !currentRecordValidationObject.value[section];
    
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
            const elementArray = currentEligibilityRecord.value[element]['path'].split('.');
            if(elementArray[elementArray.length - 1] === 'MemberId') {
                currentEligibilityRecord.value[element].value = currentEligibilityRecord.value.MemberId.value
            }
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
        selectRecord,
        deleteRecord,
    }
}