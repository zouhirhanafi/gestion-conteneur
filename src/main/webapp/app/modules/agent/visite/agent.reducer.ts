import axios from 'axios';
import { createAsyncThunk, isFulfilled } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IConteneur, defaultValue } from 'app/shared/model/conteneur.model';

const initialState: EntityState<IConteneur> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'api/conteneurs';

// Actions

export const partialUpdateEntity = createAsyncThunk(
  'visite/partial_update_entity',
  async (entity: IConteneur, thunkAPI) => {
    return axios.patch<IConteneur>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError }
);

// slice

export const ConteneurSlice = createEntitySlice({
  name: 'visite',
  initialState,
  extraReducers(builder) {
    builder.addMatcher(isFulfilled(partialUpdateEntity), (state, action) => {
      state.updating = false;
      state.loading = false;
      state.updateSuccess = true;
      state.entity = action.payload.data;
    });
  },
});

export const { reset } = ConteneurSlice.actions;

// Reducer
export default ConteneurSlice.reducer;
