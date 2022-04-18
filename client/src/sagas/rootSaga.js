import { watchRegisterSaga, watchLoginSaga, watchLogoutSaga } from "./authSagas";
import  { all } from 'redux-saga/effects';
import { watchGetContactsSaga, watchNewContactsSaga, watchUpdateContactsSaga, watchDeleteContactsSaga } from "./contactSagas";

export default function* rootSaga() 
{
    yield all([watchRegisterSaga(), watchLoginSaga(), watchLogoutSaga(), watchGetContactsSaga(), watchNewContactsSaga(), watchUpdateContactsSaga(), watchDeleteContactsSaga()]);
}