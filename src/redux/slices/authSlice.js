import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/userService";
import { registerUser, methodpayment, userOrder, userOrderMomo } from "../../services/userService";
import { loginAdmin } from "../../services/adminService";
import { userListOrder } from '../../services/userService'
import { toast } from 'react-toastify';
import { message } from 'antd'




// login user
export const userLogin = createAsyncThunk(
    'user/userLogin',
    async ({ valueLogin, password }, { rejectWithValue }) => {
        try {
            const response = await loginUser(valueLogin, password)

            if (response.data && response && +response.data.EC === 0) {
                return response.data.DT;
            } else {

                return rejectWithValue(response.data.EM);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || 'lỗi không xác định');
        }
    },
)

//login admin 
export const AdminLogin = createAsyncThunk(
    'user/admin/login',
    async ({ valueLogin, password }, { rejectWithValue }) => {
        try {

            const response = await loginAdmin(valueLogin, password)

            if (response.data && response && +response.data.EC === 0) {
                return response.data.DT;
            } else {

                return rejectWithValue(response.data.EM);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || 'lỗi không xác định');
        }
    },
)


// register user


export const userRegister = createAsyncThunk(
    'user/userRegister',
    async ({ email, phone, username, password }, { rejectWithValue }) => {
        try {
            const res = await registerUser(email, phone, username, password);
            if (res.data && res.data.EC === 0) {
                return [res.data.DT, res.data.EM]
            } else {
                return rejectWithValue(res.data.EM);
            }
        } catch (error) {
            return rejectWithValue(error.res?.data || 'Lỗi không xác định');
        }
    },
)


export const fetchMethodPayment = createAsyncThunk(
    'user/show/payment',
    async (_, { rejectWithValue }) => {
        try {
            const response = await methodpayment();
            const data = response && response.data ? response.data : [];
            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(data)
            }
            return data.DT;

        } catch (error) {
            const statusCode = error.response?.status || 'Lỗi không xác định';



            return rejectWithValue(statusCode);
        }
    }
)


export const Order = createAsyncThunk(
    'user/order',
    async ({ valueoder, orderDetails }, { rejectWithValue }) => {
        try {

            const response = await userOrder(valueoder, orderDetails);
            return response.data;
        } catch (error) {
            const statusCode = error.response?.status || 'Lỗi không xác định';



            return rejectWithValue(statusCode);
        }
    }
)
export const OrderMomo = createAsyncThunk(
    'user/order/payment/momo',
    async ({ valueoder, orderDetails }, { rejectWithValue }) => {
        try {
            const response = await userOrderMomo(valueoder, orderDetails);
            return response.data;
        } catch (error) {
            const statusCode = error.response?.status || 'Lỗi không xác định';



            return rejectWithValue(statusCode);
        }

    }
)
export const ShowlistOrerUser = createAsyncThunk(
    'use/list order',
    async ({ iduser }, { rejectWithValue }) => {
        try {
            const response = await userListOrder(iduser);
            if (response.data && response.data.EC === 0) {
                return response.data.DT;
            } else {
                return rejectWithValue(response.data.EM);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.EM || 'Lỗi không xác định');
        }
    }
)


const initialState = {
    admin: null,
    user: null,
    isLoading: false,
    isError: false,
    listpayment: [],
    token: null,
    token_admin: null,
    listOrderbyUser: [],
    orderreturn: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token_admin = null;
            localStorage.removeItem('jwt');
            message.success("Bạn đã đăng xuất");


        },
        logoutAdmin: (state) => {
            state.admin = null;
            state.token = null;
            localStorage.removeItem('ACCESS_TOKEN_ADMIN');
            message.success("Bạn đã đăng xuất");


        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {

        // admin login 
        builder.addCase(AdminLogin.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(AdminLogin.fulfilled, (state, action) => {

            if (action.payload && action.payload.access_token_admin) {
                state.admin = action.payload.admin;
                state.token_admin = action.payload.access_token_admin;
                state.isLoading = false;
                localStorage.setItem('ACCESS_TOKEN_ADMIN', action.payload.access_token_admin);
                toast.success("Đăng nhập thành công");
            } else {

                toast.error("Kiêm tra lại tài khoản mật khẩu");
                state.isLoading = false;
            }

        })

        builder.addCase(AdminLogin.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload || "Sai thông tin đăng nhập");

        })


        // user login 
        builder.addCase(userLogin.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(userLogin.fulfilled, (state, action) => {

            if (action.payload && action.payload.access_token) {
                state.user = action.payload.users;
                state.token = action.payload.access_token;
                state.isLoading = false;
                localStorage.setItem('jwt', action.payload.access_token);
                toast.success("Đăng nhập thành công");
            } else {

                toast.error("Kiêm tra lại tài khoản mật khẩu");
                state.isLoading = false;
            }

        })

        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload || "Sai thông tin đăng nhập");

        })
        // user register
        builder.addCase(userRegister.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.isLoading = false;

            state.isError = false

        })
        builder.addCase(userRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
        })




        // user Order
        builder.addCase(Order.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(Order.fulfilled, (state, action) => {
            state.isLoading = false;
            message.success(action.payload.EM)
            state.orderreturn = action.payload.DT
            state.isError = false

        })
        builder.addCase(Order.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
        })
        // order momo
        builder.addCase(OrderMomo.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(OrderMomo.fulfilled, (state, action) => {
            state.isLoading = false;

            if (action.payload.EC === 0) {

                window.location.href = action.payload.payUrl;
            }
            message.success(action.payload.EM)
            state.isError = false

        })
        builder.addCase(OrderMomo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
        })


        // get payment method

        builder.addCase(fetchMethodPayment.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchMethodPayment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listpayment = action.payload;

            state.isError = false

        })
        builder.addCase(fetchMethodPayment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        })

        // showwlissuser
        builder.addCase(ShowlistOrerUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(ShowlistOrerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.listOrderbyUser = action.payload


        })
        builder.addCase(ShowlistOrerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;

            message.error(action.payload);
        })
    },
})


export const { logout, setUser, logoutAdmin } = authSlice.actions

export default authSlice.reducer