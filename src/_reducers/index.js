import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { buckets } from './bucket.reducer';

const rootReducer = combineReducers({
    buckets,
    form: formReducer
});

export default rootReducer;