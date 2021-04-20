import { PROJECT_FORM } from '../../types/index';

export default (state, action) => {
    switch(action.type) {
        case PROJECT_FORM:
            return {
                ...state,
                projectForm: true
            }
        default:
            return state;
    }
}