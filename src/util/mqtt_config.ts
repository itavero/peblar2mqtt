import {Mqtt} from '../models/config';
import * as fs from 'fs';
import mqtt from 'mqtt';

export function convertConfigForMqttOptions(config: Mqtt): mqtt.IClientOptions {
  const options: mqtt.IClientOptions = {};
  if (
    config.version &&
    (config.version === 3 || config.version === 4 || config.version === 5)
  ) {
    options.protocolVersion = config.version;
  } else {
    console.debug('Using default MQTT protocol version: 5');
    options.protocolVersion = 5;
  }

  if (config.keepalive) {
    console.debug(`Using MQTT keepalive: ${config.keepalive}`);
    options.keepalive = config.keepalive;
  }

  if (config.ca) {
    console.debug(`MQTT SSL/TLS: Path to CA certificate = ${config.ca}`);
    options.ca = fs.readFileSync(config.ca);
  }

  if (config.key && config.cert) {
    console.debug(`MQTT SSL/TLS: Path to client key = ${config.key}`);
    console.debug(`MQTT SSL/TLS: Path to client certificate = ${config.cert}`);
    options.key = fs.readFileSync(config.key);
    options.cert = fs.readFileSync(config.cert);
  }

  if (config.user && config.password) {
    options.username = config.user;
    options.password = config.password;
  }

  if (config.client_id) {
    console.debug(`Using MQTT client ID: '${config.client_id}'`);
    options.clientId = config.client_id;
  }

  if (config.reject_unauthorized !== undefined && !config.reject_unauthorized) {
    console.debug(
      'MQTT reject_unauthorized set false, ignoring certificate warnings.',
    );
    options.rejectUnauthorized = false;
  }

  if (!config.base_topic) {
    throw new Error('MQTT base topic must be set');
  }

  options.will = {
    topic: `${config.base_topic}/bridge_availability`,
    payload: Buffer.from('offline'),
    qos: 0,
    retain: true,
  };

  return options;
}
