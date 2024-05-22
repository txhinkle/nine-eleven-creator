## divisions:
basicSectionOptions = 
Eligibility: {
    CaseDetails: {
        ErepCaseId: '',
        HohDetails: {
            HohMemberId: '',
            SpokenLanguage: ''
        }
    },
    MemberData: {
        MemberId,
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

basicSectionRequiredFields = [
    'CaseDetails.ErepCaseId',
    'CaseDetails.HohDetails.HohMemberId',
    'MemberData.MemberId',
    'MemberData.Demographics.LastName',
    'MemberData.Demographics.Details.BirthDate',
    'MemberData.Demographics.Details.Gender',
    'MemberData.Demographics.Details.Citizenship',
    'MemberData.Address.AddressType',
    'MemberData.Address.Street1',
    'MemberData.Address.CityName',
    'MemberData.Address.StateCode',
    'MemberData.Address.ZipCode',
    'MemberData.Address.AddressStartDate',
    'MemberData.Address.AddressEndDate'
]

/* true/false properties for what optional sections are included, probably in an array to pass to the xml parsing file */


addUnbornLinks = () => {
    Eligibility.CaseDetails['UnbornLinks'] = {
        MotherId: '',
        UnbornId: ''
    };
    requirements.push('CaseDetails.UnbornLinks.MotherId');
    requirements.push('CaseDetails.UnbornLinks.UnbornId');
}

removeUnbornLinks = () {
    // remove requirements from list, switch boolean for including the section to false. This method will need to be added for all sections
}

addChipPremiumDetails = () => {}
addCaseHeadRelationshipDetails = () => {
    // also MemberRelationshipToHoh
}

addRace = () => {
    Eligibilit.MemberData.Demographics['Race'] = {
        RaceCode: ''
    }
    requirements.push('Eligibility.MemberData.Demographics.Race.RaceCode)
}

addEligibilityApplication = () => {}

addShellProgram = () => {}

addLivingArrangement = () => {}

addCommunicationData = () => {}

addMemberEligibility = () => {
    /* major loop with mucho logic. Member Eligibility will need to be an object,  but with an array for RAC segments to loop. Maybe be able to base parsing method off of address solution */
}

addFosterCare

addSubsidizedAdoption

addGuardian

addSsaDisability

addAnotherAddress = () => {} // For basic, perhaps all addresses added are Residential/Mailing combo

addMedicareEligibility // also major

addLinkedMembers

addTobaccoSurveyCessation

addInmate

addUppPremiumInformation

addESIPremiumInformation 
