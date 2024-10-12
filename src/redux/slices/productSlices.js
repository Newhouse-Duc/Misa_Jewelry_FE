import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { createNewProduct, allProduct, deleteproduct, getproductID, updateProduct } from '../../services/adminService';

export const createProduct = createAsyncThunk(
    'admin/create/product',
    async ({ newProduct }, { rejectWithValue }) => {
        try {
            let response = await createNewProduct(newProduct);
            return response.data;
        } catch (error) {
            console.log("lỗi : ", error)
        }
    }
)

export const getproduct = createAsyncThunk(
    'admin/get/product',
    async (_, { rejectWithValue }) => {
        try {
            let response = await allProduct();
            const data = response && response.data ? response.data : [];
            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(data)
            }
            return data.DT;

        } catch (error) {
            console.log("lỗi : ", error)
        }
    }
)

export const delproduct = createAsyncThunk(
    'admin/delete/product',
    async ({ product }, { rejectWithValue }) => {
        try {
            let res = await deleteproduct(product);

            if (res.data && res.data.EC === 0) {
                return [res.data.DT, res.data.EM];
            } else {
                return rejectWithValue(res.data.EM);
            }
        } catch (error) {
            console.log("lỗi : ", error)
        }
    }
)


export const getproductbyId = createAsyncThunk(
    'user/product/:id',
    async ({ id }, { rejectWithValue }) => {
        try {


            let response = await getproductID(id);

            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(response.data);
            }
            return response.data.DT;



        } catch (error) {

            return rejectWithValue(error.message);
        }
    }
)

export const updateProductadmin = createAsyncThunk(
    'admin/update/product',
    async ({ productId, datanewproduct }, { rejectWithValue }) => {
        try {

            const response = await updateProduct(productId, datanewproduct)


            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(response.data);
            }
            return response.data;
        } catch (error) {

            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    listproduct: [],
    product: null,
    isLoading: false,
    issuccess: false
}
export const productSlices = createSlice({

    name: 'product ',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        // get product


        builder.addCase(getproduct.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(getproduct.fulfilled, (state, action) => {

            state.listproduct = action.payload;
            state.isLoading = false;


        })

        builder.addCase(getproduct.rejected, (state, action) => {
            state.isLoading = false

        })

        //  create product
        builder.addCase(createProduct.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(createProduct.fulfilled, (state, action) => {

            state.product = action.payload.DT;
            state.isLoading = false;


        })

        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false

        })
        // delete product 
        builder.addCase(delproduct.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(delproduct.fulfilled, (state, action) => {

            state.listproduct = action.payload;
            state.isLoading = false;
            state.issuccess = true;


        })

        builder.addCase(delproduct.rejected, (state, action) => {
            state.isLoading = false

        })
        // get product by id 
        builder.addCase(getproductbyId.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(getproductbyId.fulfilled, (state, action) => {

            state.product = action.payload;
            state.isLoading = false;
            state.issuccess = true;


        })

        builder.addCase(getproductbyId.rejected, (state, action) => {
            state.isLoading = false

        })
        // update product
        builder.addCase(updateProductadmin.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(updateProductadmin.fulfilled, (state, action) => {

            message.success(action.payload.EM)
            state.isLoading = false;
            state.issuccess = true;


        })

        builder.addCase(updateProductadmin.rejected, (state, action) => {
            state.isLoading = false

        })
    }
})

export const { } = productSlices.actions
export default productSlices.reducer