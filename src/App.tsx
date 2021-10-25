import React, { useState } from 'react';

import { Entity } from './models/entity';
import { Devices } from './models/devices';
import { getDeviceInfo } from './services/Rachio';

import { InputToken } from './components/InputToken';
import { InputTime } from './components/InputTime';
import { InputCycles } from './components/InputCycles';

function App() {
  const [entity, setEntity] = useState({});
  const [devices, setDevices] = useState({});
  const [duration, setDuration] = useState(60);
  const [recovery, setRecovery] = useState(420);
  const [cycles, setCycles] = useState(1);

  // Must keep the browser open: run on server: create an account or just a service that runs? build an app?
  // best to try and time the recovery is close to exact not to lose air via leaks
  // Need to make custom for each zone: duration and recovery
  // Cycles are not a loop. Cycles need to be appended to an array to iterate
  // Manual run the first time. Next button to skip to next stage: blowout, recharge
  // log that shows completed work and times

  // maybe make the first recovery dynamic, start and hit a button to set the recovery time
  // some way to micro adjust duration and recovery
  // URL to autofill fields
  // Minutes elapsed/remaining, Estimated time completion
  // Try out with a "Stop watering after date"

  const initializeData = (entity: Entity) => {
    getDeviceInfo(entity.token, entity.id).then((info:any) => {
      setEntity({
        ...entity,
        fullName: info.fullName
      });

      const deviceActiveZones = info.devices.map((device:any) => {
        return {
          name: device.name,
          id: device.id,
          latitude: device.latitude,
          longitude: device.longitude,
          zones: device.zones.filter((z:any) => z.enabled).sort((a:any, b:any) => a.zoneNumber - b.zoneNumber),
        };
      });

      setDevices(deviceActiveZones);
    });
  };

  const runWinterize = () => {
    console.log('ENTITY', entity);
    console.log('DEVICES', devices);
  };

  const cancelWinterize = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <InputToken onValidToken={initializeData} />
      </header>
      <main>
        <div className="row">
          <InputTime
            id="time-to-blow"
            label="Time to blow out each zone"
            initialValue={duration}
            onInputChange={setDuration}
          />
        </div>

        <div className="row">
          <InputTime
            id="time-to-recover"
            label="Time for air compressor recovery"
            initialValue={recovery}
            onInputChange={setRecovery}
          />
        </div>

        <div className="row">
          <InputCycles
            id="time-to-recover"
            label="Cycles to run"
            initialValue={cycles}
            onInputChange={setCycles}
          />
        </div>

        <button
          type="button"
          id="run-winterize"
          onClick={runWinterize}
        >
          Winterize
        </button>

        <button
          type="button"
          id="cancel-winterize"
          onClick={cancelWinterize}
        >
          Cancel
        </button>

        {/*
        <table>
          <caption>Irrigation zones</caption>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Zone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" id="" /></td>
              <td>Name of zone</td>
            </tr>
          </tbody>
        </table>
        */}

      </main>
    </div>
  );
}

export default App;
