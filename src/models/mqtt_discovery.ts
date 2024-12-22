export interface DeviceDiscoveryPayload {
  device: DeviceInfo;
  origin: DeviceOrigin;
  availability: DeviceAvailability[];
  availability_mode?: 'all' | 'any' | 'latest';
  components: Map<string, EntityPlatform>;
}

export interface DeviceOrigin {
  /**
   * Name of the integration that created the device.
   */
  name: string;

  /**
   * Software version of the integration that created the device.
   */
  sw?: string;

  /**
   * URL to the documentation of the integration that created the device.
   */
  url?: string;
}

export interface DeviceInfo {
  identifiers: string[];
  name: string;
  manufacturer?: string;
  model?: string;
  mdl_id?: string;
  serial_number?: string;
  hw_version?: string;
  sw_version?: string;

  /**
   * A link to the webpage that can manage the configuration of this device.
   */
  configuration_url?: string;

  /**
   * A list of connections of the device to the outside world as a list of
   * tuples [connection_type, connection_identifier].
   *
   * For example the MAC address of a network interface:
   * "connections": [["mac", "02:5b:26:a8:dc:12"]].
   */
  connections?: Array<[string, string]>;
}

export interface DeviceAvailability {
  topic: string;
}

export interface EntityPlatform {
  platform: string;
  device_class: string | null;
  unique_id: string;
  object_id?: string;
  name?: string;
  icon?: string;
  enabled_by_default?: boolean;
}

export interface SensorPlatform extends EntityPlatform {
  platform: 'sensor';
  force_update?: boolean;
  state_topic: string;
  value_template: string;
  device_class: 'current' | 'energy' | 'enum' | 'power' | 'voltage';
  unit_of_measurement?: 'mA' | 'V' | 'W' | 'Wh';
  state_class?: 'total_increasing' | 'measurement';
}

export interface BinarySensorPlatform extends EntityPlatform {
  platform: 'binary_sensor';
  force_update?: boolean;
  state_topic: string;
  value_template: string;
  device_class: 'plug';
}
