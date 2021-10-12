export type Zone = {
  name: string;
  id: string;
  imageUrl: string;
};

export type Device = {
  name: string;
  id: string;
  latitude: number;
  longitude: number;
  zones: Zone[];
};

export type Devices = Device[];