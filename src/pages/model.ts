import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { post } from './service';
import { message } from 'antd';

export interface IndexDataState {
  url: string;
  short_uri: string;
  code: string;
  created_at: string;
}

export interface StateType {
  data?: IndexDataState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    post: Effect;
  };
  reducers: {
    save: Reducer<StateType, AnyAction>;
  };
}

const Model: ModelType = {
  namespace: 'index',

  state: {},

  effects: {
    * post({ payload, callback }, { call, put }) {
      const response = yield call(post, payload);
      if (!response) {
        return;
      }
      if (response.error) {
        message.error(response.error);
        return;
      }
      yield put({
        type: 'save',
        payload: {
          data: response.data,
        },
      });

      if (callback) { callback(); }
    },
  },

  reducers: {
    save(state?: StateType, action?: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default Model;
