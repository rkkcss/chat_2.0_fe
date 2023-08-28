import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../axios/API';
import { toast } from 'react-toastify';
import { APILogin } from '../axios/APILogin';

const initialState = {
    user: null,
    loading: false,
    msg: "",
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
    console.log('logout',result)
    return result;
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
        }
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
    }
});

export const { loadingTrue, loadingFalse, toggleTheme} = loginSlice.actions;

export default loginSlice.reducer;