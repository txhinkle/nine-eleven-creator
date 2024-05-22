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

    currentEligibilityRecord.value = {
        'CaseDetails.ErepCaseId': '',
        // 'CaseDetails.HohDetails.HohMemberId': '',
        // 'CaseDetails.HohDetails.SpokenLanguage': '',
        'MemberData.MemberId': '',
        // 'MemberData.Demographics.FirstName': '',
        // 'MemberData.Demographics.MiddleName': '',
        // 'MemberData.Demographics.LastName': '',
        // 'MemberData.Demographics.Suffix': '',
        // 'MemberData.Demographics.Details.Ssn': '',
        // 'MemberData.Demographics.Details.Hispanic': '',
        // 'MemberData.Demographics.Details.BirthDate': '',
        // 'MemberData.Demographics.Details.MaritalStatus': '',
        // 'MemberData.Demographics.Details.Gender': '',
        // 'MemberData.Demographics.Details.Citizenship': '',
        // 'MemberData.Demographics.Details.AlienType': '',
        // 'MemberData.Demographics.Details.MortalityDate': '',
        // 'MemberData.Demographics.Details.DistrictOffice': '',
        // 'MemberData.Demographics.Details.EligibilityReviewDate': '',
        // 'MemberData.Address': []
    }
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