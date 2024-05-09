import { configureStore } from '@reduxjs/toolkit';
import { loaderReducer } from '../features/loader/loader';
import { adminApi } from '../pages/admin/utility/services/admin.service';
import { signUpApi } from '../core/utility/services/signUp.service';
import { authReducer } from '../features/auth/auth';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
    auth: authReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([adminApi.middleware, signUpApi.middleware]),
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();