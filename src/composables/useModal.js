import {ref} from 'vue'
import useRecord from '@/composables/useRecord';

const {currentEligibilityRecord} = useRecord();
const currentModal = ref(null);

const setModal = function (name, object = null, edit = null, index = null) {
    currentModal.value = {
        name,
        object: JSON.parse(JSON.stringify(object)),
        edit,
        index
    }
}

const insertInArray = function() {
    const index = currentModal.value.index
    const object = currentModal.value.object
	if(index !== null) {
		currentEligibilityRecord.value[currentModal.value.name].value.splice(index, 1, object);
	} else {
		currentEligibilityRecord.value[currentModal.value.name].value.push(object);
	}
}

const cancelModal = function () {
    currentModal.value = null
}

const submitObject = function () {
    if(currentModal.value.name === 'Address') {
        console.log('no')
    } else {
        insertInArray();
    }
    currentModal.value = null;
}

export default function useModal () {
    return {
        currentModal,
        submitObject,
        cancelModal,
        setModal
    };
}