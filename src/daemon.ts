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
  console.error('No (valid) configuration found. Exiting...');
  process.exit(1);
}

// Connect MQTT client
const mqtt_client = mqtt.connect(
  config.mqtt.server,
  convertConfigForMqttOptions(config.mqtt)
);
// mqtt_client.on('connect', this.onMqttConnected.bind(this));
// mqtt_client.on('close', this.onMqttClose.bind(this));

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
}

// Create a charger monitor for each charger in the configuration
const monitors = new Set<ChargerMonitor>();
for (const charger of config.chargers) {
  const mqtt = new MqttWrapper(config.mqtt.base_topic || 'p2m', charger.name);
  const monitor = new ChargerMonitor(
    mqtt,
    charger.name,
    charger.host,
    charger.api_key,
    charger.password
  );
  monitors.add(monitor);
}

// Call start on each monitor
for (const monitor of monitors) {
  monitor.start();
}
