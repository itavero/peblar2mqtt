# ⚡️ Peblar2MQTT

> Connect your Peblar EV charger to other systems (like Home Assistant) via MQTT.

At home I've installed a Peblar Home and I wanted to make it a bit smarter by not only having the option to solar charge, but also allow it to prefer charging at times when the energy rates are the lowest.
I saw some other people trying to do similar things with their EVSE via Home Assistant, and I also found an integration for my energy provider for HA.

Unfortunately, I did not find a (custom) Home Assistant integration for Peblar (yet).
After going through some documentation on how to develop a custom integration for Home Assistant, it all felt like quite a hassle to get it right.
That's why I figured, why not take the same approach as I have for some other devices: go via MQTT.

## Current state

Just getting started, so not much to see yet. I kinda have a proof-of-concept working, but it's still far from a stable release.

### To Do

- [ ] Fix Docker build for platforms other than `linux/amd64` (e.g. my NAS needs `linux/arm64/v8`)

## Disclaimer

This is a personal project and is definitely still a work in progress. This project and myself are not affiliated with Peblar / Prodrive Technologies NE B.V.
