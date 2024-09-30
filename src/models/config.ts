export interface Configuration {
  mqtt: Mqtt;
  chargers: Charger[];
}

export interface Charger {
  name: string;
  host: string;
  api_key: string;
  password?: string;
}

export interface Mqtt {
  server: string;
  base_topic?: string;
  ca?: string;
  key?: string;
  cert?: string;
  user?: string;
  password?: string;
  client_id?: string;
  reject_unauthorized?: boolean;
  keepalive?: number;
  version?: number;
}
