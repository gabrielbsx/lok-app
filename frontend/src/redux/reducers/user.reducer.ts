import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../@types/User';

type IState = {
    user: IUser | null;
}

const initialState: IState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;