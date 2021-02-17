
export const setValuesForm = (values) => {
    return {
        type: 'valuesForm/setValuesForm',
        payload: values
    };
}

export const clearValuesForm = () => {
    return {
        type: 'valuesForm/clearValuesForm'
    }
}

export const selectValuesForm = (state) => state.valuesForm;
const initialValuesForm = {title: '', description:''};

export const valuesFormReducer = (valuesForm = initialValuesForm, action) => {
    switch(action.type){
        case 'valuesForm/setValuesForm':
            return action.payload;
        case 'valuesForm/clearValuesForm':
            return '';
        default:
            return valuesForm;

    }
} 