import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from '../redux/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['error']
}
const persistedReducer = persistReducer(persistConfig, loginSliceReducer)

const store = configureStore({
    reducer: {
        userStore: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
}, applyMiddleware);



const Persistor = persistStore(store);

export { Persistor };
export default store;