
const baseUrl = 'https://api.rach.io/1/public';
// const getBearerToken = () => '';

/**
 * Retrieve the id for the person entity currently logged in through OAuth.
 * @param token The key to authenticate to the API
 * @returns {Promise<*>} The id of the person entity
 */
const getPersonEntity = async (token: string): Promise<any> => {
  const response = await fetch(`${baseUrl}/person/info`,  {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return new Error(`Error getting person entity: ${response.status}`);
  }

  return response.json();
};


/**
 * Retrieve the information for a person entity
 * @param token The key to authenticate to the API
 * @param entityId The id of the person entity
 * @returns Promise<any>} The person entity information
 */
const getDeviceInfo = async (token: string, entityId: string): Promise<any> => {
  const response = await fetch(`${baseUrl}/person/${entityId}`,  {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return new Error(`Error getting device info: ${response.status}`);
  }

  return await response.json();
};

/**
 * Stop all watering on device
 * @param token The key to authenticate to the API
 * @param deviceId The device's unique id
 */
const deviceStopWater = (token: string, deviceId: string): void => {
  fetch(`${baseUrl}/device/stop_water`,  {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: deviceId
    }),
  }).catch((error) => {
    return new Error(`Error stopping watering: ${error}`);
  });
};

/**
 * Start a zone
 * @param token The key to authenticate to the API
 * @param zoneId The zone's unique id
 * @param duration Duration in seconds (Range is 0 - 10800 (3 Hours) )
 */
const zoneStart = (token: string, zoneId: string, duration: number): void => {
  fetch(`${baseUrl}/zone/start`,  {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: zoneId,
      duration: duration
    }),
  }).catch((error) => {
    return new Error(`Error starting watering: ${error}`);
  });
};

export {
  getPersonEntity,
  getDeviceInfo,
  deviceStopWater,
  zoneStart
}