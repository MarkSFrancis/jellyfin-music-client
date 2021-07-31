# Jellyfin Music Client

[![Deployment status](https://img.shields.io/github/deployments/marksfrancis/jellyfin-music-client/production?label=Production&logo=vercel&logoColor=white)](https://github.com/MarkSFrancis/jellyfin-music-client/deployments/activity_log?environment=Production)

This project is very much a work in progress.


## Requirements

This project requires [Node 14](https://nodejs.org/en/) and uses **npm** as a package manager.

You also need the following Jellyfin server version:

```
Jellyfin >=10.7.0
```

## Installation

```bash
# cloning repository
git clone https://github.com/MarkSFrancis/jellyfin-music-client.git

# installing dependencies
cd jellyfin-music-client
npm install

# building web client
npm run-script build

# starting web client
npm start
```

You can now access the client by navigating your browser to http://localhost:4000

## Currently supported features

1. Connecting to a jellyfin server
1. Sign in
1. Browse your songs (as JSON)
1. Audio playback
1. Audio streaming support for faster playback start
1. Caching audio for faster skip forward/ backward
1. Shuffle all
1. Gapless playback
1. Deploy to a demo instance, that you can connect to your own server
1. Browse your songs (as a nice UI)
1. Manage "up next" playback
1. Search tools (currently only searches by track title)

## Features on the way

1. PWA support
1. Browse by genre and artist
1. Search tools (search by artist and genre)
1. Playlist support
1. Offline support
1. "Start radio" - automatically play similar music via genre labels
