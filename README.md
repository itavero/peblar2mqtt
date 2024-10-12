# ⚡️ Peblar2MQTT

> Connect your Peblar EV charger to other systems (like Home Assistant) via MQTT.

At home I've installed a Peblar Home and I wanted to make it a bit smarter by not only having the option to solar charge, but also allow it to prefer charging at times when the energy rates are the lowest.
I saw some other people trying to do similar things with their EVSE via Home Assistant, and I also found an integration for my energy provider for HA.

Unfortunately, I did not find a (custom) Home Assistant integration for Peblar (yet).
After going through some documentation on how to develop a custom integration for Home Assistant, it all felt like quite a hassle to get it right.
That's why I figured, why not take the same approach as I have for some other devices: use MQTT!

## Configuration / How to run

I'm running this as part of the `docker-compose.yml` that contains all my home automation stuff (a.o. an MQTT broker and Home Assistant Core).
The entry in the Docker file for the Peblar2MQTT service looks something like:

```yml
  peblar:
    image: ghcr.io/itavero/peblar2mqtt:main
    volumes:
      - ./data/peblar:/config
      - /etc/localtime:/etc/localtime:ro
    depends_on:
      - mqtt
```

The important part here is of course the volume with the configuration.
In `./data/peblar/config.yml`, you will find something like what's described in `config.example.yml`, e.g.:

```yml
mqtt:
  server: "mqtt://mqtt:1883"
  user: bowser
  password: peaches
  base_topic: p2m

chargers:
  - name: mario_kart_charger
    host: 10.11.22.33
    api_key: a20b39ee2972374567b9f73d495414a5b99eabed989470ee54f764c494fd6448
```

For each of the `chargers`, the `name`, `host` and `api_key` are all required and currently the only fields being used.
`name` is used in the logs and as part of the MQTT topic path (see below). It is recommended to only use alphanumeric characters and underscores for this field.

The API key can be obtained be logging into your Peblar charger via its web interface and going to the advanced settings (`/settings/4`).
On this page you can also enable the REST API, which is required for this bridge to work.

At this point, read-only access will suffice as write actions have not yet been implemented.

## MQTT topics

This software publishes data to the following topics (all prefixed with the configured MQTT `base_topic`, which is `p2m` by default).

Wherever the topic is prefixed with `<name>`, this is the name of the charger as configured in the `config.yml`.
For example, if the charger is named `mario_kart_charger` and the base topic is configured as `p2m`, the availability topic would be `p2m/mario_kart_charger/available`.

### `bridge_availability`

Publishes either `online` or `offline` (as a _will_ message), to indicate whether the bridge is up and running or not.
This is used by Home Assistant to determine if the provided devices are available or not.

### `<name>/available`

Publishes `online` after successfully requesting information via the REST API.

`offline` is published when an API request fails or the software is being shut down.

### `<name>/system`

Information from the `/system` endpoint of the chargers REST API is published here.
Currently, this is only done when the bridge starts and after a failed request, but not periodically.

### `<name>/ev`

Information from the `/evinterface` endpoint of the chargers REST API is published here.
This is only published when data has changed, which it polls every 10 seconds.

An additional field, `_CarHasConnected`, is also published based on the `CpState`.
If it's in state B / C / D, it will have the value `ON`. In all other cases, it will be `OFF`.

### `<name>/meter`

Information from the `/meter` endpoint of the chargers REST API is published here.
This is published every 10 seconds, regardless of whether the data has changed or not.

### Home Assistant Discovery

After successfully checking the `/health` and `/system` endpoints of the REST API, messages will be published so that Home Assistant can automatically discover the data via the MQTT integration.

## Disclaimer

This is a personal project and is definitely still a **work in progress**. Use at your **own risk**.

This project and myself are not affiliated with Peblar / Prodrive Technologies NE B.V. in any way.
