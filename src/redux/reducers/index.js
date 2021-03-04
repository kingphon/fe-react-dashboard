import { combineReducers } from 'redux'
import provinceReducer from './provinceReducer'
import rootReducer from './rootReducer'

export default combineReducers({
    provinceReducer,
    rootReducer,
});
