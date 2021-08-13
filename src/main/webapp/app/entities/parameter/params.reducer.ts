import axios from 'axios';
import { createSelector } from 'reselect';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { normalize, schema, denormalize } from 'normalizr';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, IPayload } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IParameter, defaultValue } from 'app/shared/model/parameter.model';
import { entitiesSelector, entitySelector } from 'app/shared/reducers/entities.reducer';

export const ACTION_TYPES = {
  FETCH_PARAMETER_FORM_LIST: 'parameter/FETCH_PARAMETER_FORM_LIST',
};

// const initialState = {
//   loading: false,
//   errorMessage: null,
//   updating: false,
//   updateSuccess: false,
//   entities: {},
// };

const initialState: EntityState<IParameter> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  // totalItems: 0,
  updateSuccess: false,
};

export type ParamsState = Readonly<typeof initialState>;

// Reducer

// export default (state: ParamsState = initialState, action): ParamsState => {
//   switch (action.type) {
//     case REQUEST(ACTION_TYPES.FETCH_PARAMETER_FORM_LIST):
//       return {
//         ...state,
//         errorMessage: null,
//         updateSuccess: false,
//         loading: true,
//       };
//     case FAILURE(ACTION_TYPES.FETCH_PARAMETER_FORM_LIST):
//       return {
//         ...state,
//         loading: false,
//         updating: false,
//         updateSuccess: false,
//         errorMessage: action.payload,
//       };
//     case SUCCESS(ACTION_TYPES.FETCH_PARAMETER_FORM_LIST):
//       return {
//         ...state,
//         loading: false,
//         entities: action.payload.data,
//       };
//     default:
//       return state;
//   }
// };

export const parameterSchema = new schema.Entity(
  'parameters',
  {},
  {
    processStrategy: (value, parent, key) => ({
      ...value,
      parent: parent && parent.id,
    }),
  }
);
export const parameterListSchema = [parameterSchema];
export const parameterValuesSchema = new schema.Values(parameterListSchema);

const apiUrl = 'api/ano/parameters';
// Actions

export const loadEntities = createAsyncThunk('params/fetch_entity_list', async () => {
  const requestUrl = `${apiUrl}/forms?cacheBuster=${new Date().getTime()}`;
  // return axios.get<IParameter[]>(requestUrl);
  return axios.get<IParameter>(`${requestUrl}`).then(({ data }) => {
    const { entities, result } = normalize(data, parameterValuesSchema);
    return { entities, data: result };
  });
});

export const paramsSelector = name => state => {
  const {
    params: { entities },
  } = state;
  return entities && entities[name] ? entities[name] : [];
};

export const paramSelector = id => state => {
  return entitySelector('parameters', id)(state);
};

export const selectAllParams = (state: any) => state.params.entities;

export const selectParams = createSelector(
  selectAllParams,
  (_, name) => name,
  (entities, name) => {
    return entities && entities[name] ? entities[name] : [];
  }
);

export const selectParamsDeno = createSelector(selectParams, entitiesSelector, (params, entities) => {
  return denormalize(params, parameterListSchema, entities);
});

export const ParameterSlice = createEntitySlice({
  name: 'parameter',
  initialState,
  extraReducers(builder) {
    builder.addMatcher(isFulfilled(loadEntities), (state, action) => {
      return {
        ...state,
        loading: false,
        entities: action.payload['data'],
      };
    });
  },
});

export const { reset } = ParameterSlice.actions;

// Reducer
export default ParameterSlice.reducer;
