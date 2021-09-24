;(function() {
  let rachioKey = null;
  let entityId = null;
  let entityInformation = null;

  const apiKeyInput = document.querySelector('#api-key');
  const buttonFetchApi = document.querySelector('#fetch-api');

  buttonFetchApi.addEventListener('click', function() {
    rachioKey = apiKeyInput.value;
    getPersonEntity(rachioKey).then(id => {
      entityId = id;
      getDeviceInfo(rachioKey, entityId).then(info => {
        entityInformation = info;
        console.log(entityInformation);
      });
    });
  });

  async function getPersonEntity(rachioKey) {
    const response = await fetch('https://api.rach.io/1/public/person/info',{
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${rachioKey}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error getting person entity: ${response.status}`);
    }

    const entity = await response.json();

    return entity.id;
  }

  async function getDeviceInfo(rachioKey, entityId) {
    const response = await fetch(`https://api.rach.io/1/public/person/${entityId}`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${rachioKey}`,
      } 
    });

    if (!response.ok) {
      throw new Error(`Error getting device info: ${response.status}`);
    }

    return await response.json();
  }
}());
