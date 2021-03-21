import { combineReducers } from 'redux'

import provinceReducer from './location/provinceReducer'
import districtReducer from './location/districtReducer'
import wardReducer from './location/wardReducer'
import rootReducer from './rootReducer'

export default combineReducers({
    provinceReducer,
    districtReducer,
    wardReducer,
    rootReducer,
});
