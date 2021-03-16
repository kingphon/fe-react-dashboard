import { combineReducers } from 'redux'
import provinceReducer from './provinceReducer'
import districtReducer from './districtReducer'
import rootReducer from './rootReducer'

export default combineReducers({
    provinceReducer,
    districtReducer,
    rootReducer,
});
