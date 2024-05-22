import {ref} from 'vue'
const eligibilityList = ref([]);
const currentEligibilityRecord = ref({});
const currentRecordRequireFields = ref([]);
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
        requiredFields: [ 
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
        ],
    };

    currentEligibilityRecord.value = {
        CaseDetails: {
            ErepCaseId: '',
            HohDetails: {
                HohMemberId: '',
                SpokenLanguage: ''
            }
        },
        MemberData: {
            MemberId: '',
            Demographics: {
                FirstName: '',
                MiddleName: '',
                LastName: '',
                Suffix: '',
                Details: {
                    Ssn: '',
                    Hispanic: '',
                    BirthDate: '',
                    MaritalStatus: '',
                    Gender: '',
                    Citizenship: '',
                    AlienType: '',
                    MortalityDate: '',
                    DistrictOffice: '',
                    EligibilityReviewDate: ''
                }
            },
            Address: [
                {
                    AddressType: '',
                    Street1: '',
                    Street2: '',
                    Street3: '',
                    CityName: '',
                    StateCode: '',
                    ZipCode: '',
                    ZipCodeExtension: '',
                    CountyCode: '',
                    AddressStartDate: '',
                    AddressEndDate: ''
                }
            ]
        }
    }
    eligibilityList.value.push(currentEligibilityRecord);
}

export default function useRecord() {
    return {
        addNewRecord,
        eligibilityList,
        currentEligibilityRecord
    }
}