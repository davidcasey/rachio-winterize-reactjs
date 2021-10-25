import React, { useState, ChangeEvent } from 'react';
import { Entity } from '../models/entity';

import { getPersonEntity } from '../services/Rachio';

export type InputTokenProps = {
  initialToken?: string;
  onValidToken: (entity: Entity) => void;
};

export const InputToken = ({ initialToken, onValidToken }: InputTokenProps) => {
  const [token, setToken] = useState(initialToken || '');
  const [invalidToken, setInvalidToken] = useState(false);

  const apiTokenInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const onSubmitToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getPersonEntity(token).then(({ id }: any) => {
      if (id) {
        setInvalidToken(false);
        onValidToken({
          token,
          id,
          fullName: ''
        });
        return;
      }
      setInvalidToken(true);
    });
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
        className={invalidToken ? 'invalid' : ''}
        value={token}
        onChange={apiTokenInputChange}
      />
      <button
        type="submit"
        id="fetch-api"
      >
        Fetch
      </button>
      {invalidToken &&
        <p className="invalid">Invalid token</p>
      }
      <p className="disclaimer">Your Rachio API token is never stored on our server and only used for the duration of your session.
        Accessing the site over a public network is not recommended.</p>
    </form>
  );
};
