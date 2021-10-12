import React, { useState, ChangeEvent } from 'react';
import { Entity } from '../models/entity';

import { getPersonEntity } from '../services/Rachio';

export type InputTokenProps = {
  initialToken?: string;
  onTokenSuccess: (entity: Entity) => void;
};

export const InputToken = ({ initialToken, onTokenSuccess }: InputTokenProps) => {
  const [token, setToken] = useState(initialToken || '');
  const [tokenError, setTokenError] = useState(false);

  const apiTokenInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const onSubmitToken = () => {
    getPersonEntity(token).then(({ id }: any) => {
      if (id) {
        setTokenError(false);
        onTokenSuccess({
          token,
          id,
          fullName: ''
        });
        return;
      }
      setTokenError(true);
    });
  };

  return (
    <div className="container">
      <label htmlFor="api-token">
        API Token <a href="https://rachio.readme.io/docs/authentication" className="locate-token"
                     target="_blank" rel="noreferrer">Locate your token</a>
      </label>
      <input
        id="api-token"
        type="text"
        className={tokenError ? 'invalid' : ''}
        value={token}
        onChange={apiTokenInputChange}
      />
      <button
        type="button"
        id="fetch-api"
        onClick={onSubmitToken}
      >
        Fetch
      </button>
      {tokenError &&
        <p className="invalid">Invalid token</p>
      }
      <p className="disclaimer">Your Rachio API token is never stored on our server and only used for the duration of your session.
        Accessing the site over a public network is not recommended.</p>
    </div>
  );
};
