import {ref} from 'vue'
import useOptions from './useOptions';

const {
    YNOptions, denialClosureOptions, 
    districtOfficeOptions, languageOptions,
    raceCodeOptions, relationshipCodeOptions,
    eligibilityProgramStatusOptions
} = useOptions();
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
        'IdEndDate',
        'MedicareCoverageDetails'
    ],
    // includeMedicareCoverageDetailsPartA: [
    //     'MedicareCoverageType-PartA',
    //     'MedicareCoverageStartDate-PartA',
    //     'MedicareCoverageEndDate-PartA',
    // ],
    // includeMedicareCoverageDetailsPartB: [
    //     'MedicareCoverageType-PartB',
    //     'MedicareCoverageStartDate-PartB',
    //     'MedicareCoverageEndDate-PartB'
    // ],
    includeMedicareBuyInPartA: [
        'FileLoadDate-PartA',
        'AccretionCode-PartA',
        'AccretionStartDate-PartA',
        'AccretionEndDate-PartA',
        'DeletionCode-PartA',
        'DeletionStartDate-PartA',
        'DeletionEndDate-PartA',
        'BuyinEligibilityCode-PartA',
        'PremiumAmount-PartA',
        'BillMonth-PartA',
        'StatusDescription-PartA'
    ],
    includeMedicarePartARicA: [
        'MedicareId-PartARicA',
        'LastName-PartARicA',
        'FirstName-PartARicA',
        'MiddleInitial-PartARicA',
        'Gender-PartARicA',
        'DateOfBirth-PartARicA',
        'Ssn-PartARicA',
        'AgencyCode-PartARicA',
        'RecordIdentifier-PartARicA',
        'TransactionCode-PartARicA',
        'SsiStartDate-PartARicA',
        'SsiStopDate-PartARicA',
        'MedicareEntitlementDate-PartARicA',
        'PostalCode-PartARicA',
        'CountyCode-PartARicA',
        'SsiLivingArrangementCode-PartARicA',
        'SsiStatusCode-PartARicA',
    ],
    includeMedicarePartARicB: [
        'MedicareId-PartARicB',
        'LastName-PartARicB',
        'FirstName-PartARicB',
        'MiddleInitial-PartARicB',
        'Gender-PartARicB',
        'DateOfBirth-PartARicB',
        'Ssn-PartARicB',
        'ReducedPartAIndicator-PartARicB',
        'PartAPremiumSurchargeIndicator-PartARicB',
        'AgencyCode-PartARicB',
        'RecordIdentifier-PartARicB',
        'TransactionCode-PartARicB',
        'TransactionSubCode-PartARicB',
        'BillingPeriodStartDate-PartARicB',
        'BillingPeriodEndDate-PartARicB',
        'PremiumAmountDueOrRefund-PartARicB',
        'BillMonth-PartARicB',
        'CurrentMonthlyPremiumRate-PartARicB',
        'CreditIndicator-PartARicB',
        'PostalCode-PartARicB',
        'CountyCode-PartARicB',
        'AgencyClientId-PartARicB',
    ],
    includeMedicareBuyInPartB: [
        'FileLoadDate-PartB',
        'AccretionCode-PartB',
        'AccretionStartDate-PartB',
        'AccretionEndDate-PartB',
        'DeletionCode-PartB',
        'DeletionStartDate-PartB',
        'DeletionEndDate-PartB',
        'BuyinEligibilityCode-PartB',
        'PremiumAmount-PartB',
        'BillMonth-PartB',
        'StatusDescription-PartB',
    ],
    includeMedicarePartBRicA: [
        'MedicareId-PartBRicA',
        'LastName-PartBRicA',
        'FirstName-PartBRicA',
        'MiddleInitial-PartBRicA',
        'Gender-PartBRicA',
        'DateOfBirth-PartBRicA',
        'Ssn-PartBRicA',
        'BuyinEligCode-PartBRicA',
        'AgencyCode-PartBRicA',
        'RecordIdentifier-PartBRicA',
        'TransactionCode-PartBRicA',
        'SsiStartDate-PartBRicA',
        'SsiStopDate-PartBRicA',
        'MedicareEntitlementDate-PartBRicA',
        'PostalCode-PartBRicA',
        'CountyCode-PartBRicA',
        'SsiLivingArrangementCode-PartBRicA',
        'SsiStatusCode-PartBRicA',
    ],
    includeMedicarePartBRicB: [
        'MedicareId-PartBRicB',
        'LastName-PartBRicB',
        'FirstName-PartBRicB',
        'MiddleInitial-PartBRicB',
        'Gender-PartBRicB',
        'DateOfBirth-PartBRicB',
        'Ssn-PartBRicB',
        'BuyinEligCode-PartBRicB',
        'AgencyCode-PartBRicB',
        'RecordIdentifier-PartBRicB',
        'TransactionCode-PartBRicB',
        'TransactionSubCode-PartBRicB',
        'BillingPeriodStartDate-PartBRicB',
        'BillingPeriodEndDate-PartBRicB',
        'PremiumAmountDueOrRefund-PartBRicB',
        'BillMonth-PartBRicB',
        'CurrentMonthlyPremiumRate-PartBRicB',
        'CreditIndicator-PartBRicB',
        'PostalCode-PartBRicB',
        'CountyCode-PartBRicB',
        'SsiStatusCode-PartBRicB',
        'AgencyClientId-PartBRicB',
    ],
    includeLinkedMembers: [
        'PrimaryMemberId',
        'SecondaryMemberId'
    ],
    includeTobaccoSurveyCessation: [
        'Indicator',
        'ResponseDate'
    ],
    includeIncarceration: ['Incarceration'],
    includeUppPremiumInformation: ['UppPremiumInformation'],
    includeEsiPremiumInformation: ['ESIPremiumInformation'],
}

const addNewRecord = () => {
    currentRecordValidationObject.value = {
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
        includeMedicareEligibility: false,
        // includeMedicareCoverageDetailsPartA: false,
        // includeMedicareCoverageDetailsPartB: false,
        includeMedicareBuyInPartA: false,
        includeMedicarePartARicA: false,
        includeMedicarePartARicB: false,
        includeMedicareBuyInPartB: false,
        includeMedicarePartBRicA: false,
        includeMedicarePartBRicB: false,
        // end Medicare Sections
        includeLinkedMembers: false,
        includeTobaccoSurveyCessation: false,
        includeIncarceration: false,
        includeUppPremiumInformation: false,
        includeEsiPremiumInformation: false,
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
            pattern: '\\d{10}',
        },
        SpokenLanguage: {
            path: 'CaseDetails.HohDetails.SpokenLanguage',
            type: 'text',
            value: '',
            required: false,
            included: true,
            options: languageOptions,
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
            options: relationshipCodeOptions,
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
            pattern: '\\d{10}',
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
            options: raceCodeOptions,
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
            options: YNOptions,
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
            options: districtOfficeOptions,
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
            options: eligibilityProgramStatusOptions
        },
        DenialClosureReason: {
            path: 'MemberData.Demographics.EligibilityApplication.DenialClosureReason',
            type: '',
            value: '',
            required: false,
            included: false,
            options: denialClosureOptions,
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
            handler: conditionalRequirementToggle,
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
            options: {
                labels: ['1', '2','3','4', '5', '6'],
                values: [1, 2, 3, 4, 5, 6]
            }
        },
        IdStartDate: {
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
        'MedicareCoverageDetails': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails',
            type: 'modal',
            value: [],
            required: false,
            included: false,
        },
        // 'MedicareCoverageType-PartA': {
        //     path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageType',
        //     type: 'text',
        //     value: '',
        //     required: true,
        //     included: false,
        // },
        // 'MedicareCoverageStartDate-PartA': {
        //     path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageStartDate',
        //     type: 'date',
        //     value: '',
        //     required: true,
        //     included: false,
        // },
        // 'MedicareCoverageEndDate-PartA': {
        //     path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageEndDate',
        //     type: 'date',
        //     value: '',
        //     required: false,
        //     included: false,
        // },
        // 'MedicareCoverageType-PartB': {
        //     path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageType',
        //     type: 'text',
        //     value: '',
        //     required: true,
        //     included: false,
        // },
        // 'MedicareCoverageStartDate-PartB': {
        //     path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageStartDate',
        //     type: 'date',
        //     value: '',
        //     required: true,
        //     included: false,
        // },
        // 'MedicareCoverageEndDate-PartB': {
        //     path: 'MemberData.MedicareEligibility.MedicareIdDetails.MedicareCoverageDetails.MedicareCoverageEndDate',
        //     type: 'date',
        //     value: '',
        //     required: false,
        //     included: false,
        // },
        'FileLoadDate-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.FileLoadDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'AccretionCode-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.AccretionCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'AccretionStartDate-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.AccretionStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'AccretionEndDate-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.AccretionEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'DeletionCode-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.DeletionCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'DeletionStartDate-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.DeletionStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'DeletionEndDate-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.DeletionEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'BuyinEligibilityCode-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.BuyinEligibilityCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'PremiumAmount-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.PremiumAmount',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'BillMonth-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.BillMonth',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'StatusDescription-PartA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.StateAgencyToCms.StatusDescription',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'MedicareId-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.MedicareId',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'LastName-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.LastName',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'FirstName-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.FirstName',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'MiddleInitial-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.MiddleInitial',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'Gender-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.Gender',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'DateOfBirth-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.DateOfBirth',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'Ssn-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.Ssn',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'AgencyCode-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.AgencyCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'RecordIdentifier-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.RecordIdentifier',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'TransactionCode-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.TransactionCode',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'SsiStartDate-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.SsiStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'SsiStopDate-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.SsiStopDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'MedicareEntitlementDate-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.MedicareEntitlementDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'PostalCode-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.PostalCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'CountyCode-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.CountyCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'SsiLivingArrangementCode-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.SsiLivingArrangementCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'SsiStatusCode-PartARicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicA.SsiStatusCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'MedicareId-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.MedicareId',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'LastName-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.LastName',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'FirstName-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.FirstName',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'MiddleInitial-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.MiddleInitial',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'Gender-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.Gender',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'DateOfBirth-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.DateOfBirth',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'Ssn-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.Ssn',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'ReducedPartAIndicator-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.ReducedPartAIndicator',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'PartAPremiumSurchargeIndicator-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.PartAPremiumSurchargeIndicator',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'AgencyCode-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.AgencyCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'RecordIdentifier-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.RecordIdentifier',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'TransactionCode-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.TransactionCode',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'TransactionSubCode-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.TransactionSubCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'BillingPeriodStartDate-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.BillingPeriodStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'BillingPeriodEndDate-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.BillingPeriodEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'PremiumAmountDueOrRefund-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.PremiumAmountDueOrRefund',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'BillMonth-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.BillMonth',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'CurrentMonthlyPremiumRate-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.CurrentMonthlyPremiumRate',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'CreditIndicator-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.CreditIndicator',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'PostalCode-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.PostalCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'CountyCode-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.CountyCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'AgencyClientId-PartARicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartA.RicB.AgencyClientId',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'FileLoadDate-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.FileLoadDate',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'AccretionCode-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.AccretionCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'AccretionStartDate-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.AccretionStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'AccretionEndDate-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.AccretionEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'DeletionCode-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.DeletionCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'DeletionStartDate-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.DeletionStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'DeletionEndDate-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.DeletionEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'BuyinEligibilityCode-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.BuyinEligibilityCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'PremiumAmount-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.PremiumAmount',
            type: 'number',
            value: '',
            required: false,
            included: false,
        },
        'BillMonth-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.BillMonth',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'StatusDescription-PartB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.StateAgencyToCms.StatusDescription',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'MedicareId-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.MedicareId',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'LastName-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.LastName',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'FirstName-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.FirstName',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'MiddleInitial-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.MiddleInitial',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'Gender-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.Gender',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'DateOfBirth-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.DateOfBirth',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'Ssn-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.Ssn',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'BuyinEligCode-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.BuyinEligCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'AgencyCode-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.AgencyCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'RecordIdentifier-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.RecordIdentifier',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'TransactionCode-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.TransactionCode',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'SsiStartDate-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.SsiStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'SsiStopDate-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.SsiStopDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'MedicareEntitlementDate-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.MedicareEntitlementDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'PostalCode-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.PostalCode',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'CountyCode-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.CountyCode',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'SsiLivingArrangementCode-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.SsiLivingArrangementCode',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'SsiStatusCode-PartBRicA': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicA.SsiStatusCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'MedicareId-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.MedicareId',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'LastName-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.LastName',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'FirstName-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.FirstName',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'MiddleInitial-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.MiddleInitial',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'Gender-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.Gender',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'DateOfBirth-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.DateOfBirth',
            type: 'date',
            value: '',
            required: true,
            included: false,
        },
        'Ssn-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.Ssn',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'BuyinEligCode-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.BuyinEligCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'AgencyCode-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.AgencyCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'RecordIdentifier-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.RecordIdentifier',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'TransactionCode-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.TransactionCode',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'TransactionSubCode-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.TransactionSubCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'BillingPeriodStartDate-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.BillingPeriodStartDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'BillingPeriodEndDate-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.BillingPeriodEndDate',
            type: 'date',
            value: '',
            required: false,
            included: false,
        },
        'PremiumAmountDueOrRefund-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.PremiumAmountDueOrRefund',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'BillMonth-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.BillMonth',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        'CurrentMonthlyPremiumRate-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.CurrentMonthlyPremiumRate',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'CreditIndicator-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.CreditIndicator',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'PostalCode-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.PostalCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'CountyCode-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.CountyCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'SsiStatusCode-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.SsiStatusCode',
            type: 'text',
            value: '',
            required: false,
            included: false,
        },
        'AgencyClientId-PartBRicB': {
            path: 'MemberData.MedicareEligibility.MedicareIdDetails.BuyIn.PartB.RicB.AgencyClientId',
            type: 'text',
            value: '',
            required: true,
            included: false,
        },
        // end medicare fields
        ExemptDuplicateIndicator: {
            path: 'MemberData.ExemptDuplicateIndicator',
            type: 'text',
            value: '',
            options: YNOptions,
            required: true,
            included: true,
        },
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
    // console.log('eligibilityList.value', eligibilityList.value.length)
    currentRecordSections.value.push(currentRecordValidationObject.value);
}

const selectRecord = function(index) {
    currentEligibilityRecord.value = eligibilityList.value[index];
    currentRecordValidationObject.value = currentRecordSections.value[index];
}

const incrementRecord = function(index) {
    const copyValidationObject = { ...currentRecordSections.value[index] }
    const revisedRecord = {}
    Object.keys(eligibilityList.value[index]).forEach(key => {
        if(!Array.isArray(eligibilityList.value[index][key].value)) {
            revisedRecord[key] = {...eligibilityList.value[index][key]}
        }
        else {
            revisedRecord[key] = {...eligibilityList.value[index][key]}
            revisedRecord[key].value = [...eligibilityList.value[index][key].value]
        }
})
    const midLeadingZero = eligibilityList.value[index].MemberId.value[0] === '0'
    const hohLeadingZero = eligibilityList.value[index].MemberId.value[0] === '0'
    revisedRecord.FirstName = {...eligibilityList.value[index].FirstName, value: eligibilityList.value[index].FirstName.value + 1},
    revisedRecord.MemberId = {...eligibilityList.value[index].MemberId, value: eligibilityList.value[index].MemberId.value * 1 + 1 + ''},
    revisedRecord.HohMemberId = {...eligibilityList.value[index].HohMemberId, value: eligibilityList.value[index].HohMemberId.value * 1 + 1 + ''},
    revisedRecord.ErepCaseId = {...eligibilityList.value[index].ErepCaseId, value: eligibilityList.value[index].ErepCaseId.value * 1 + 1 + ''},
    revisedRecord['MemberId-RelationshipDetails'] = (eligibilityList.value[index]['MemberId-RelationshipDetails'].value !== '') ? 
            { ...eligibilityList.value[index]['MemberId-RelationshipDetails'],
                value: eligibilityList.value[index].MemberId.value * 1 + 1 + ''} :
            { ...eligibilityList.value[index]['MemberId-RelationshipDetails'] }
    revisedRecord['HohMemberId-RelationshipDetails'] = (eligibilityList.value[index]['HohMemberId-RelationshipDetails'].value !== '') ? 
            { ...eligibilityList.value[index]['HohMemberId-RelationshipDetails'],
                value: eligibilityList.value[index].HohMemberId.value * 1 + 1 + ''} :
            { ...eligibilityList.value[index]['HohMemberId-RelationshipDetails'] }
        if(midLeadingZero) {
            revisedRecord.MemberId.value = '0' + revisedRecord.MemberId.value
        }
        if(hohLeadingZero) {
            revisedRecord.HohMemberId.value = '0' + revisedRecord.HohMemberId.value
        }
    currentRecordSections.value.push(copyValidationObject)
    eligibilityList.value.push(revisedRecord)
    selectRecord(eligibilityList.value.length - 1)
};

const deleteRecord = function(index) {
    console.log('index', index)
    eligibilityList.value.splice(index, 1)
    currentRecordSections.value.splice(index, 1)
    if(eligibilityList.value.length) {
        selectRecord(0)
    } else {
        currentEligibilityRecord.value = {}
        currentRecordValidationObject.value = {}
    }
}

const toggleIncluded = function(section) {
    currentRecordValidationObject.value[section] = !currentRecordValidationObject.value[section];
    
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

const conditionalRequirementToggle = function(item, value) {
    if(item.path.includes('MedicareIdType') && value ==='MBI') {
        currentEligibilityRecord.value.IdOccurrence.required = true;
        currentRecordValidationObject.value['IdOccurrence'] = !currentRecordValidationObject.value['IdOccurrence']
    } else {
        currentEligibilityRecord.value.IdOccurrence.required = false;
    }
}

const createRandomRecord = function() {
    currentEligibilityRecord.value['ErepCaseId'].value = Math.floor(Math.random() * 100000) + ''
    currentEligibilityRecord.value['HohMemberId'].value = Math.floor(Date.now() / 1000) + ''
    currentEligibilityRecord.value['MemberId'].value = currentEligibilityRecord.value['HohMemberId'].value
    currentEligibilityRecord.value['FirstName'].value = eligibilityList.value.length  + 'first'
    currentEligibilityRecord.value['LastName'].value = eligibilityList.value.length  + 'last'
    currentEligibilityRecord.value['RaceCode'].value = 'UN'
    currentEligibilityRecord.value['BirthDate'].value = '2000-01-01'
    currentEligibilityRecord.value['Gender'].value = Math.floor((Math.random() * 10) % 2) === 0 ? 'M' : 'F'
    currentEligibilityRecord.value['Citizenship'].value = Math.floor((Math.random() * 10) % 2) === 0 ? 'Y' : 'N'
    currentEligibilityRecord.value['ExemptDuplicateIndicator'].value = 'N'
    currentEligibilityRecord.value['Address'].value = []
    currentEligibilityRecord.value['Address'].value.push({
        AddressType: 'Mailing',
        Street1: '55 N Main St',
        CityName: 'SALT LAKE CITY',
        StateCode: 'UT',
        ZipCode: '84150',
        CountyCode: 'CT117',
        AddressStartDate: '2000-01-01',
        AddressEndDate: '2999-12-31',
    })
    currentEligibilityRecord.value['Address'].value.push({
        AddressType: 'Residential',
        Street1: '55 N Main St',
        CityName: 'SALT LAKE CITY',
        StateCode: 'UT',
        ZipCode: '84150',
        CountyCode: 'CT117',
        AddressStartDate: '2000-01-01',
        AddressEndDate: '2999-12-31',
    })
}

export default function useRecord() {
    return {
        addNewRecord,
        incrementRecord,
        eligibilityList,
        currentEligibilityRecord,
        currentRecordValidationObject,
        toggleIncluded,
        selectRecord,
        deleteRecord,
        createRandomRecord,
    }
}