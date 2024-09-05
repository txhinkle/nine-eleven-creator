const newAddressTemplate = {
	Street1: '',
	Street2: '',
	Street3: '',
	CityName: '',
	StateCode: '',
	ZipCode: '',
	AddressStartDate: '',
	AddressEndDate: '',
};
const newRacTemplate = {
    RacCode: '',
    RacBeginDate: '',
    RacEndDate: '',
    RacIssuanceDate: '',
    Pregnancy: {
        PregnancyStatus: '',
        PregnancyStartDate: '',
        PregnancyDueDate: '',
        PregnancyEndDate: '',
    },
    Countable: {
        Income: ''
    },
    MemberIdsForAssistanceUnit: {
        ContributingMemberId: '',
        RelationshipCode: '',
    },
    CopayExemptDetails: {
        CopayExemptIndicator: '',
    },
    PatientLiability: {
        Amount: ''
    },
    Spenddown: {
        Information: {
            SpenddownIndicator: '',
            MetDate: '',
            Amount: '',
        },
        SpenddownBills: {
            BillDetails: {
                BillId: '',
                BillAccountNumber: '',
                BillStartDate: '',
                BillEndDate: '',
                ServiceType: '',
                PrescriptionNumber: '',
                ErepCurrentUsedAmount: '',
                TotalBill: '',
                BillingProviderName: '',
                BillingProviderStreet1: '',
                BillingProviderStreet2: '',
                BillingProviderStreet3: '',
                BillingProviderCityName: '',
                BillingProviderStateCode: '',
                BillingProviderZipCode: '',
                BillingProviderZipCodeExtension: '',
                BillingProviderCountyCode: '',
                BilledPersonSuffix: '',
                BilledPersonFirstName: '',
                BilledPersonMiddleName: '',
                BilledPersonLastName: '',
            }
        }
    },
    SPMDetails: {
        SPMIndicator: ''
    },
    MedicareDualEligibilityStatusCode: {
        MedicareDualEligibilityStatusCode: ''
    }
}
const newBenefitTemplate = {
    BenefitSubType: '',
    BenefitSubTypeStartDate: '',
    BenefitSubTypeEndDate: '',
    BenefitSubTypeIssuanceDate: '',
    Pregnancy: {
        PregnancyStatus: '',
        PregnancyStartDate: '',
        PregnancyDueDate: '',
        PregnancyEndDate: '',
    },
    Countable: {
        Income: ''
    },
    MemberIdsForAssistanceUnit: {
        ContributingMemberId: '',
        RelationshipCode: '',
    },
    CopayExemptDetails: {
        CopayExemptIndicator: '',
    },
    PatientLiability: {
        Amount: ''
    },
    Spenddown: {
        Information: {
            SpenddownIndicator: '',
            MetDate: '',
            Amount: '',
        },
        SpenddownBills: {
            BillDetails: {
                BillId: '',
                BillAccountNumber: '',
                BillStartDate: '',
                BillEndDate: '',
                ServiceType: '',
                PrescriptionNumber: '',
                ErepCurrentUsedAmount: '',
                TotalBill: '',
                BillingProviderName: '',
                BillingProviderStreet1: '',
                BillingProviderStreet2: '',
                BillingProviderStreet3: '',
                BillingProviderCityName: '',
                BillingProviderStateCode: '',
                BillingProviderZipCode: '',
                BillingProviderZipCodeExtension: '',
                BillingProviderCountyCode: '',
                BilledPersonSuffix: '',
                BilledPersonFirstName: '',
                BilledPersonMiddleName: '',
                BilledPersonLastName: '',
            }
        }
    },
    SPMDetails: {
        SPMIndicator: ''
    },
    MedicareDualEligibilityStatusCode: {
        MedicareDualEligibilityStatusCode: ''
    }
}

const newIncarcerationTemplate = {
    IncarcerationID: '',
    IncarcerationStatus: '',
    StartDate: '',
    EndDate: '',
}

const newUppTemplate = {
    UppProgramStartDate: '',
    UppProgramEndDate: '',
    BillMonth: '',
    UppPremiumAmt: '',
}

export default function useTEmplates () {
    return {
        newAddressTemplate,
        newRacTemplate,
        newBenefitTemplate,
        newIncarcerationTemplate,
        newUppTemplate,
    }
}