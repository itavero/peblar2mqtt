import {ChargerMonitor, MqttEndpoint} from './peblar_charger';
import {loadConfig} from './util/config_loader';
import {convertConfigForMqttOptions} from './util/mqtt_config';
import {getVersion} from './util/version';
import mqtt from 'mqtt';

const daemon_version = getVersion();

console.log(`Peblar2MQTT v${daemon_version} is starting...`);

// Load configuration YAML file and parse according to Config model
const config = loadConfig();
if (!config) {
  throw new Error('No (valid) configuration found. Exiting...');
}

// Connect MQTT client
if (!config.mqtt.base_topic || config.mqtt.base_topic.trim() === '') {
  config.mqtt.base_topic = 'p2m';
}
const mqtt_config = convertConfigForMqttOptions(config.mqtt);
const mqtt_client = mqtt.connect(config.mqtt.server, mqtt_config);
mqtt_client.on('connect', onMqttConnected);
mqtt_client.on('close', onMqttClose);

class MqttWrapper implements MqttEndpoint {
  private readonly base_topic_: string;
  private readonly name_: string;

  constructor(base_topic: string, name: string) {
    this.base_topic_ = base_topic;
    this.name_ = name;
  }

  getFullDataTopicPath(subject: string): string {
    return this.base_topic_ + '/' + this.name_ + '/' + subject;
  }

  async publishData(
    subject: string,
    data: string,
    retain?: boolean
  ): Promise<void> {
    await mqtt_client.publishAsync(this.getFullDataTopicPath(subject), data, {
      retain: retain,
    });
  }

  async publishHomeAssistantDiscoveryConfig(
    type: string,
    name: string,
    config: unknown
  ): Promise<void> {
    const topic = `homeassistant/${type}/${this.name_}/${name}/config`;
    await mqtt_client.publishAsync(topic, JSON.stringify(config), {
      retain: true,
    });
  }

  getBridgeAvailabilityTopicPath(): string {
    return `${this.base_topic_}/bridge_availability`;
  }
}

// Create a charger monitor for each charger in the configuration
const monitors = new Set<ChargerMonitor>();
if (!config.mqtt.base_topic) {
  throw new Error('MQTT base topic appears empty. Exiting...');
}
for (const charger of config.chargers) {
  const mqtt = new MqttWrapper(config.mqtt.base_topic, charger.name);
  const monitor = new ChargerMonitor(
    mqtt,
    charger.name,
    charger.host,
    charger.api_key,
    charger.password
  );
  monitors.add(monitor);
}

// Wait for process to be terminated
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Exiting...');
  for (const monitor of monitors) {
    await monitor.stop();
  }

  console.log('[MQTT] Closing down...');
  // Send offline status of bridge
  if (mqtt_config.will) {
    await mqtt_client.publishAsync(
      mqtt_config.will.topic,
      mqtt_config.will.payload,
      {retain: true}
    );
  }
  await mqtt_client.end();
});

async function onMqttConnected() {
  console.log('[MQTT] Connected to broker');

  // Call start on each monitor
  for (const monitor of monitors) {
    monitor.start();
  }

  // Publish birth message
  if (mqtt_config.will) {
    console.log('[MQTT] Publish online status of bridge');
    await mqtt_client.publishAsync(mqtt_config.will.topic, 'online', {
      retain: true,
    });
  }
}

function onMqttClose() {
  console.log('[MQTT] Disconnected from broker');
  // Call stop on each monitor
  for (const monitor of monitors) {
    monitor.stop();
  }
}
