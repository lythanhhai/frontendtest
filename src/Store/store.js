import { combineReducers } from 'redux'
import getSelectedPrefCodeReducer from '../Reducer/getSelectedPrefCodeReducer'

const store = combineReducers({
    getSelectedPrefCodeReducer: getSelectedPrefCodeReducer
})

export default store