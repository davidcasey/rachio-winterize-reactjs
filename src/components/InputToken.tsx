import React, {ChangeEvent, useEffect, useReducer} from 'react';
import { Entity } from '../models/entity';

import { getPersonEntity } from '../services/Rachio';

const SET_TOKEN_INPUT = 'SET_TOKEN_INPUT';
const SET_TOKEN_VALID = 'SET_TOKEN_VALID';

const tokenReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_TOKEN_INPUT:
      return { ...state, value: action.payload };
    case SET_TOKEN_VALID:
      return { ...state, isValid: action.payload };
    default:
      return { ...state };
  }
};

export type InputTokenProps = {
  initialToken?: string;
  onValidToken: (entity: Entity) => void;
};

export const InputToken = ({ initialToken, onValidToken }: InputTokenProps) => {
  const [tokenState, tokenDispatch] = useReducer(tokenReducer, { value: initialToken || '', isValid: null });

  const apiTokenInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    tokenDispatch({
      type: SET_TOKEN_INPUT,
      payload: e.target.value,
    });
  };

  const validateToken = () => {
    getPersonEntity(tokenState.value).then(({ id }: any) => {
      if (id) {
        tokenDispatch({
          type: SET_TOKEN_VALID,
          payload: true,
        });
        onValidToken({
          token: tokenState.value,
          id,
          fullName: ''
        });
        return;
      }
      tokenDispatch({
        type: SET_TOKEN_VALID,
        payload: false,
      });
    });
  };

  useEffect(() => {
    if (initialToken) {
      validateToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateToken();
  };

  return (
    <form className="container" onSubmit={onSubmitToken}>
      <label htmlFor="api-token">
        API Token <a href="https://rachio.readme.io/docs/authentication" className="locate-token"
                     target="_blank" rel="noreferrer">Locate your token</a>
      </label>
      <input
        id="api-token"
        type="text"
        className={tokenState.isValid === false ? 'invalid' : ''}
        value={tokenState.value}
        onChange={apiTokenInputChange}
      />
      <button
        type="submit"
        id="fetch-api"
      >
        Fetch
      </button>
      {tokenState.isValid === false &&
        <p className="invalid">Invalid token</p>
      }
      <p className="disclaimer">Your Rachio API token is never stored on our server and only used for the duration of your session.
        Accessing the site over a public network is not recommended.</p>
    </form>
  );
};
