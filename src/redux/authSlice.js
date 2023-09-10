import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../axios/API';
import { toast } from 'react-toastify';
import { APILogin } from '../axios/APILogin';

//TODO:handle when I use multiple http request

const initialState = {
    user: null,
    loading: false,
    error: false,
    theme: "light",
}

export const getAccountInfo = createAsyncThunk('getAccountInfo', async () => {
    const result = await API.get('/api/account').then(res => {
        return res.data;
    }).catch(err => {
        console.log('accountget error ', err);
    });
    return result;
});

export const loginUser = createAsyncThunk('loginUser', async (user, { dispatch }) => {
    const result = await APILogin.post('/api/authentication', user).then(res => {
        //toast.success('Sikeresen bejelentkeztél!')
        dispatch(getAccountInfo());
    }).then(res => {
        
    });
});

export const logoutUser = createAsyncThunk('logoutUser', async () => {
    const result = await API.post('/api/logout',{}).then().then(res => {
        window.location.href = '/login'
        //toast.success('Sikeres kijelentkezés');
    });
    return result;
});

export const updateUserApi = createAsyncThunk("updateUser", async (user ,{dispatch}) => {
    const result = await API.post('/api/account', user).then(res => {
    }).then(res => dispatch(getAccountInfo()));
});

const loginSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        loadingTrue(state) {
            state.loading = true;
        },
        loadingFalse(state) {
            state.loading = false;
        },
        toggleTheme(state, action) {
            state.theme = action.payload;
        },
        updateUser(state, action) {
            state.user = {...state.user, [action.payload.name]: action.payload.value}
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            // getaccout endpoint status handlink
            .addCase(getAccountInfo.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAccountInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getAccountInfo.rejected, (state, action) => {
                state.loading = false
            })
            // logout endpoint handling
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
            })
            //update user handling
            .addCase(updateUserApi.fulfilled, (state, action) => {
                toast.success("Sikeren frissítettük az adataidat!");
            })
            .addCase(updateUserApi.rejected, (state, action) => {
                console.log("updateerror", state)
                console.log("updateerror", action)
            })
    }
});

export const { loadingTrue, loadingFalse, toggleTheme, updateUser} = loginSlice.actions;

export default loginSlice.reducer;