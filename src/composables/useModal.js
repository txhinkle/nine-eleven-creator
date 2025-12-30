import {ref} from 'vue'
import useRecord from '@/composables/useRecord';
import useValidation from '@/composables/useValidation';
// consider importing useValidation and adding the validateRecord into the cancel/submit functions
const {currentEligibilityRecord, currentMemberRecord} = useRecord();
const currentModal = ref(null);
const { validateRecords } = useValidation();

const setModal = function (name, object = null, edit = null, index = null) {
    currentModal.value = {
        name,
        object: JSON.parse(JSON.stringify(object)),
        edit,
        index
    }
    console.log(currentModal.value)
}

const insertInArray = function() {
    
    const index = currentModal.value.index
    const object = currentModal.value.object
    const memberData = currentModal.value.name !== 'MemberRelationshipToHoh'
	if(index !== null) {
        if(memberData) {
            currentMemberRecord.value[currentModal.value.name].value.splice(index, 1, object);
        } else {
            currentEligibilityRecord.value[currentModal.value.name].value.splice(index, 1, object);
        }        
	} else {
        if(memberData) {
            currentMemberRecord.value[currentModal.value.name].value.push(object);
        } else {
            currentEligibilityRecord.value[currentModal.value.name].value.push(object);
        }
	}
}

const cancelModal = function () {
    currentModal.value = null;
    validateRecords();
}

const submitObject = function () {
    if(currentModal.value.name === 'Address') {
        console.log('no')
    } else {
        insertInArray();
    }
    cancelModal();
}

export default function useModal () {
    return {
        currentModal,
        submitObject,
        cancelModal,
        setModal
    };
}