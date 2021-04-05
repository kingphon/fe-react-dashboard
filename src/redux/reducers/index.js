import { combineReducers } from 'redux'

import provinceReducer from './location/provinceReducer'
import districtReducer from './location/districtReducer'
import wardReducer from './location/wardReducer'
import categoryReducer from './classification/categoryReducer'
import typeGroupReducer from './classification/typeGroupReducer'
import typeReducer from './classification/typeReducer'
import rootReducer from './rootReducer'

export default combineReducers({
    provinceReducer,
    districtReducer,
    wardReducer,
    categoryReducer,
    typeGroupReducer,
    typeReducer,
    rootReducer,
});
