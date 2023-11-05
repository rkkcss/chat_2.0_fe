import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from '../redux/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import roomSlice from "../redux/roomSlice";
import activeUsersSlice from "../redux/activeUsersSlice";


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['error']
}

const roomPersistConfig = {
    key: 'room',
    storage,
    blacklist: [],
};

const activeUsersPersistConfig = {
    key: 'activeUsers',
    storage,
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, loginSliceReducer);
const roomPersistReducer = persistReducer(roomPersistConfig, roomSlice);
const activeUsersPersistReducer = persistReducer(activeUsersPersistConfig, activeUsersSlice);

const store = configureStore({
    reducer: {
        roomStore: roomPersistReducer,
        userStore: persistedReducer,
        activeUsersStore: activeUsersPersistReducer,
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