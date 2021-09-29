import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IConteneur, defaultValue } from 'app/shared/model/conteneur.model';

const initialState: EntityState<IConteneur> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/conteneurs';

export const exportCsv = ({ sort, query }: IQueryParams) => {
  const requestUrl = `${apiUrl}/csv${sort ? `?sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios
    .get(requestUrl, {
      responseType: 'blob',
      params: query,
    })
    .then(res => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fileDownload = require('js-file-download');
      fileDownload(res.data, 'inventaire.csv');
    });
};
// Actions

export const getEntities = createAsyncThunk('inventaire/fetch_entity_list', async ({ page, size, sort, query }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<IConteneur[]>(requestUrl, { params: query });
});

export const getEntity = createAsyncThunk(
  'inventaire/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IConteneur>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'inventaire/update_entity',
  async (entity: IConteneur, thunkAPI) => {
    return axios.put<IConteneur>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError }
);

// slice
export const ConteneurSlice = createEntitySlice({
  name: 'inventaire',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const links = parseHeaderForLinks(action.payload.headers.link);
        return {
          ...state,
          loading: false,
          links,
          entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
          totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(updateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(updateEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = ConteneurSlice.actions;

// Reducer
export default ConteneurSlice.reducer;
