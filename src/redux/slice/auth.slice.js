const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: () => {
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;