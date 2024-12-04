import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const productSlice=createSlice({
    name:'product',
    initialState:{
        loading:null,
        product:{}
    },
    reducers:{
       
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
          })
          .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.product=action.payload;
          });
      },
});
const fetchProductById=createAsyncThunk(
    'product/fetchProductById',
    async (productId, thunkAPI) => {
      try {
        const API = `https://api.escuelajs.co/api/v1/products/${productId}`;
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const product = await response.json();
        return product;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

export {fetchProductById}
export default productSlice.reducer;