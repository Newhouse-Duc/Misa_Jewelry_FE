import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/axios'
import { allUser, changeStatus, deleteUser } from '../../services/adminService'

import { message } from 'antd'




export const fetchAllUser = createAsyncThunk(
    'admin/fetchAllUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await allUser()
            const data = response && response.data ? response.data : [];
            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(data)
            }
            return data.DT;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'lỗi không xác định');
        }
    },
)

export const Changestatus = createAsyncThunk(
    'user/change/status',
    async ({ iduser, newStatus }, { rejectWithValue }) => {
        try {

            const res = await changeStatus(iduser, newStatus);
            if (res.data && res.data.EC === 0) {


                return { iduser, newStatus };;
            } else {
                return rejectWithValue(res.data.EM);
            }
        } catch (error) {
            return rejectWithValue(error.res?.data || 'Lỗi không xác định');
        }
    },
)

export const Deleteuser = createAsyncThunk(
    'user/delete/:id',
    async ({ userid }, { rejectWithValue }) => {
        try {
            const response = await deleteUser(userid);
            if (response.data && response.data.EC === 0) {
                return response.data.EM;
            } else {
                return rejectWithValue(response.data.EM);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.EM || 'Lỗi không xác định');
        }
    }
)






const initialState = {
    listUser: [],
    isLoading: false,
    isError: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllUser.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(fetchAllUser.fulfilled, (state, action) => {

            state.listUser = action.payload;
            state.isLoading = false;

        })

        builder.addCase(fetchAllUser.rejected, (state, action) => {
            state.isLoading = false

        })

        // change status
        builder.addCase(Changestatus.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(Changestatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            const { iduser, newStatus } = action.payload;


            state.listUser = state.listUser.map(user =>
                user.id === iduser ? { ...user, status: newStatus } : user
            );
            message.success("thay đổi thành công")

        })
        builder.addCase(Changestatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
        })

        // delete user
        builder.addCase(Deleteuser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(Deleteuser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;

            message.success(action.payload);

        })
        builder.addCase(Deleteuser.rejected, (state, action) => {
            state.isLoading = false;

            message.error(action.payload);
        })



    },
})


export const { } = userSlice.actions

export default userSlice.reducer