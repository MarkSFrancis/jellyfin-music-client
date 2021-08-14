# Jellyfin Music Client

[![Deployment status](https://img.shields.io/github/deployments/marksfrancis/jellyfin-music-client/production?label=Production&logo=vercel&logoColor=white)](https://github.com/MarkSFrancis/jellyfin-music-client/deployments/activity_log?environment=Production)

This is an unofficial music client for [Jellyfin](https://jellyfin.org/)  

It is not intended as a replacement for the Jellyfin Web Client.  
Advanced features like editing track metadata and managing libraries are not in this client.

<div align="center">
  <img src="https://user-images.githubusercontent.com/16414147/129441610-da469874-728e-41e9-9639-bdc3dc629dcd.png" />
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/16414147/129441653-f1999c6d-f85f-46c0-9536-55f0c677daeb.png" />
</div>

## Features

* Audio streaming (no need to wait for the whole track to load before starting playback)
* Gapless playback
* Audio caching
* No need to host your own instance of the music client - just log on to your server using the [demo instance](https://jellyfin-music-client.vercel.app/). Your Jellyfin server must be at least version 10.7.0

For upcoming features, [check out the roadmap](https://github.com/MarkSFrancis/jellyfin-music-client/projects/1)

To request a new feature or report a bug, [create an issue](https://github.com/MarkSFrancis/jellyfin-music-client/issues/new)

## Self-Hosting / Development

### Pre-requisites

This project requires [Node 14](https://nodejs.org/en/) and uses [yarn](https://classic.yarnpkg.com/en/docs/install) as a package manager. You'll need to have both of these installed

You also need the following Jellyfin server version:

```
Jellyfin >=10.7.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/MarkSFrancis/jellyfin-music-client.git
cd jellyfin-music-client
```

```bash
# Install application dependencies
yarn install
```

### Running the app

#### Development mode
```bash
yarn start
```

#### Production mode
```bash
yarn build
yarn start:prod
```

You can now access the client by navigating your browser to http://localhost:4000/
