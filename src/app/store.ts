import { configureStore, ThunkAction, Action, AsyncThunkPayloadCreator, Dispatch, AsyncThunkOptions, AsyncThunk } from '@reduxjs/toolkit';
import userReducer from '../api/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

declare module "@reduxjs/toolkit" {
  type AsyncThunkConfig = {
      state?: unknown;
      dispatch?: Dispatch;
      extra?: unknown;
      rejectValue?: unknown;
      serializedErrorType?: unknown;
  };

  function createAsyncThunk<
      Returned,
      ThunkArg = void,
      ThunkApiConfig extends AsyncThunkConfig = { state: RootState } // here is the magic line
  >(
      typePrefix: string,
      payloadCreator: AsyncThunkPayloadCreator<
          Returned,
          ThunkArg,
          ThunkApiConfig
      >,
      options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>,
  ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
}