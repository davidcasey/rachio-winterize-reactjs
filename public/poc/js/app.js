;(function() {
  let rachioKey = null;
  let entityId = null;
  let fullName = '';
  let deviceActiveZones = [];
  let activeZoneId = null;
  let activeDevice = false;
  let winterizingInterval = false;

  const inputApiKey = document.querySelector('#api-key');
  const inputTimeToBlow = document.querySelector('#time-to-blow');
  const inputTimeToRecover = document.querySelector('#time-to-recover');
  const inputCycles = document.querySelector('#cycles');
  const buttonFetchApi = document.querySelector('#fetch-api');
  const buttonCancelWinterize = document.querySelector('#cancel-winterize');
  const buttonWinterize = document.querySelector('#run-winterize');

  buttonFetchApi.addEventListener('click', function() {
    rachioKey = inputApiKey.value;
    initializeData(rachioKey);
  });

  buttonCancelWinterize.addEventListener('click', function() {
    if (activeDevice && winterizingInterval) {
      deviceStopWater(rachioKey, activeDevice);
      activeDevice = false;
    }
  });

  buttonWinterize.addEventListener('click', function() {
    if (winterizingInterval) {
      runBlowout(inputTimeToBlow.value, inputTimeToRecover.value, inputCycles.value);
    }
  });

  function runBlowout(duration, recovery, cycles = 1) {
  }

  /**
   * Initialize the data using the API key
   * @param rachioKey String the key to authenticate to the API
   */
  function initializeData(rachioKey) {
    getPersonEntity(rachioKey).then(entity => {
      entityId = entity.id;
      getDeviceInfo(rachioKey, entityId).then(info => {
        fullName = info.fullName;
        deviceActiveZones = info.devices.map(device => {
          return {
            name: device.name,
            id: device.id,
            latitude: device.latitude,
            longitude: device.longitude,
            zones: device.zones.filter(z => z.enabled).sort((a, b) => a.zoneNumber - b.zoneNumber),
          };
        });

        /* console log initialized data
         */
        console.log(entityId);
        console.log(info);
        deviceActiveZones.forEach(device => {
          console.log(fullName, device.name, device.id, device.latitude, device.longitude);
          console.table(device.zones.map(z => {
            return {
              name: z.name, 
              id: z.id
            };
          }));
        });

      });
    });
  }

  /**
   * Retrieve the id for the person entity currently logged in through OAuth.
   * @param rachioKey String The key to authenticate to the API
   * @returns {Promise<*>} Object The id of the person entity
   */
  async function getPersonEntity(rachioKey) {
    const response = await fetch('https://api.rach.io/1/public/person/info',{
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${rachioKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error getting person entity: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Retrieve the information for a person entity
   * @param rachioKey String The key to authenticate to the API
   * @param entityId String The id of the person entity
   * @returns {Promise<any>} Object Promise contains the person entity information
   */
  async function getDeviceInfo(rachioKey, entityId) {
    const response = await fetch(`https://api.rach.io/1/public/person/${entityId}`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${rachioKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error getting device info: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Stop all watering on device
   * @param rachioKey String The key to authenticate to the API
   * @param deviceId String The device's unique id
   * @returns {Promise<void>} TODO: remove async
   */
  async function deviceStopWater(rachioKey, deviceId) {
    const response = await fetch('https://api.rach.io/1/public/device/stop_water', {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${rachioKey}`,
      },
      body: JSON.stringify({
        id: deviceId
      }),
    });

    if (!response.ok) {
      throw new Error(`Error stopping watering: ${response.status}`);
    }
  }

  /**
   * Start a zone
   * @param rachioKey String The key to authenticate to the API
   * @param zoneId String The zone's unique id
   * @param duration Number Duration in seconds (Range is 0 - 10800 (3 Hours) )
   * @returns {Promise<void>} TODO: remove async
   */
  async function zoneStart(rachioKey, zoneId, duration) {
    const response = await fetch('https://api.rach.io/1/public/zone/start', {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${rachioKey}`,
      },
      body: JSON.stringify({
        id: zoneId,
        duration: duration,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error stopping watering: ${response.status}`);
    }
  }
  
}());
