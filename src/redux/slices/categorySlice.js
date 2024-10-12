import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allCategory, createCategory, deletecategory, editCurrentcategory } from "../../services/adminService";


// all category
export const fetchAllcategory = createAsyncThunk(
    'admin/fetch/Category',
    async (_, { rejectWithValue }) => {
        try {
            const response = await allCategory();
            const data = response && response.data ? response.data : [];
            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(data)
            }
            return data.DT;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Lỗi không xác định')
        }
    }

)


// create category
export const createnewCategory = createAsyncThunk(
    'admin/create/Category',
    async ({ categoryName }, { rejectWithValue }) => {
        try {
            const res = await createCategory(categoryName);

            if (res.data && res.data.EC === 0) {
                return [res.data.DT, res.data.EM];
            } else {
                return rejectWithValue(res.data.EM);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Lỗi không xác định');
        }
    }
);




//delete category

export const delcategory = createAsyncThunk(
    'admin/delete/Category',
    async ({ category }, { rejectWithValue }) => {
        try {
            const res = await deletecategory(category)
            if (res.data && res.data.EC === 0) {
                return [res.data.DT, res.data.EM];
            } else {
                return rejectWithValue(res.data.EM);
            }


        } catch (error) {
            return rejectWithValue(error.response?.data || 'Lỗi không xác định');
        }
    }
)
// update category 

export const updatecategory = createAsyncThunk(
    'admin/update/Category',
    async ({ datacategory, editcategory }, { rejectWithValue }) => {
        try {
            const res = await editCurrentcategory(datacategory, editcategory)
            if (res.data && res.data.EC === 0) {
                return [res.data.DT, res.data.EM];
            } else {
                return rejectWithValue(res.data.EM);
            }


        } catch (error) {
            return rejectWithValue(error.response?.data || 'Lỗi không xác định');
        }
    }
)





const initialState = {
    listCategory: [],
    isLoading: false
}

export const categorySlice = createSlice({

    name: 'category ',
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        // all category
        builder.addCase(fetchAllcategory.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(fetchAllcategory.fulfilled, (state, action) => {

            state.listCategory = action.payload;
            state.isLoading = false;


        })

        builder.addCase(fetchAllcategory.rejected, (state, action) => {
            state.isLoading = false

        })


        // create category

        builder.addCase(createnewCategory.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(createnewCategory.fulfilled, (state, action) => {

            state.listCategory = action.payload;
            state.isLoading = false;




        })

        builder.addCase(createnewCategory.rejected, (state, action) => {
            state.isLoading = false

        })

        // delete category
        builder.addCase(delcategory.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(delcategory.fulfilled, (state, action) => {

            state.listCategory = action.payload;
            state.isLoading = false;




        })

        builder.addCase(delcategory.rejected, (state, action) => {
            state.isLoading = false

        })


        // update category 
        builder.addCase(updatecategory.pending, (state, action) => {
            state.isLoading = true

        })

        builder.addCase(updatecategory.fulfilled, (state, action) => {

            state.listCategory = action.payload;
            state.isLoading = false;




        })

        builder.addCase(updatecategory.rejected, (state, action) => {
            state.isLoading = false

        })

    }
})

export const { } = categorySlice.actions
export default categorySlice.reducer