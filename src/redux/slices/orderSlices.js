import { allOrder, getdetailorder, deleteOrder, changeStatusOrder, getAllDetail } from "../../services/adminService";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from "antd";


export const getallorder = createAsyncThunk(
    'admin/fetchAllOrder',
    async (_, { rejectWithValue }) => {
        try {
            const response = await allOrder()
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


export const getdetailbyid = createAsyncThunk(
    'admin/get/detail',
    async ({ orderid }, { rejectWithValue }) => {
        try {


            let response = await getdetailorder(orderid);


            const data = response && response.data ? response.data : [];
            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(data);
            }



            return data.DT;



        } catch (error) {

            return rejectWithValue(error.message);
        }
    }
)

export const delOrder = createAsyncThunk(
    'admin/delete/order',
    async ({ order }, { rejectWithValue }) => {
        try {

            let response = await deleteOrder(order);
            const data = response && response.data ? response.data : [];
            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(data);
            }


            return data.DT;
        } catch (error) {

            return rejectWithValue(error.message);
        }
    }
)

export const ChangeNewStatusOrder = createAsyncThunk(
    'order/:id/status',
    async ({ idorder, newStatus }, { rejectWithValue }) => {
        try {
            let res = await changeStatusOrder(idorder, newStatus);
            if (res.data && res.data.EC === 0) {


                return res.data.EM;
            } else {
                return rejectWithValue(res.data.EM);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const getAlldetail = createAsyncThunk(
    'order/alldetail',
    async (_, { rejectWithValue }) => {
        try {
            let res = await getAllDetail();
            if (res.data && res.data.EC === 0) {


                return res.data.DT;
            } else {
                return rejectWithValue(res.data.EM);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const initialState = {
    listdetail: [],
    listOrder: [],
    isLoading: false,
    isError: false,
    allDetail: []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getallorder.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(getallorder.fulfilled, (state, action) => {

            state.listOrder = action.payload;
            state.isLoading = false;


        })

        builder.addCase(getallorder.rejected, (state, action) => {
            state.isLoading = false

        })


        builder.addCase(getdetailbyid.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(getdetailbyid.fulfilled, (state, action) => {
            state.listdetail = action.payload
            state.isLoading = false;
            state.issuccess = true;


        })

        builder.addCase(getdetailbyid.rejected, (state, action) => {
            state.isLoading = false

        })
        // del order
        builder.addCase(delOrder.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(delOrder.fulfilled, (state, action) => {
            state.listdetail = action.payload
            state.isLoading = false;
            state.issuccess = true;


        })

        builder.addCase(delOrder.rejected, (state, action) => {
            state.isLoading = false

        })
        // all detail 
        builder.addCase(getAlldetail.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(getAlldetail.fulfilled, (state, action) => {
            state.allDetail = action.payload
            state.isLoading = false;
            state.issuccess = true;


        })

        builder.addCase(getAlldetail.rejected, (state, action) => {
            state.isLoading = false

        })

        // change status order
        builder.addCase(ChangeNewStatusOrder.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(ChangeNewStatusOrder.fulfilled, (state, action) => {
            const { idorder, newStatus } = action.meta.arg;

            const order = state.listOrder.find(order => order.id === idorder);
            if (order) {
                order.status = newStatus;
            }
            message.success("thay đổi thành công")
            state.isLoading = false;
            state.issuccess = true;


        })

        builder.addCase(ChangeNewStatusOrder.rejected, (state, action) => {
            state.isLoading = false
            message.error(action.payload)
        })


    },
})

export const selectTotalRevenue = (state) => {
    return state.order.listOrder.reduce((total, order) => {
        return total + order.total_price;
    }, 0);
};


export const { } = orderSlice.actions

export default orderSlice.reducer