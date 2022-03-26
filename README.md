This is meant to be run on Windows under WSL 2

My current media drives:

* E:/Warez/TV
* F:/Warez/TV
* G:/Warez/TV
* E:/Warez/Movies
* G:/Warez/Movies

sonarr.db - Series - Path
            RootFolders - Path

radarr.db - Movies - Path
            RootFolders - Path

## Variables

Copy `docker-compose.env.example` to `docker-compose.env` and fill in the values

### Generate basic auth password (`CADDY_BASIC_AUTH_PASSWORD`)

```sh
docker run -it caddy caddy hash-password -plaintext MY_PASSWORD
```

## Tools

```sh
apt install iputils-ping
apt install telnet
```

## Fix indirect connectin

> By adding the IP address http://192.168.86.100:32400/ to Settings -> Network -> Custom Server Access URLs it now shows up in plex.tv/api/resources?X-Plex-Token=xxx as a connection string and direct connection has been successfully established.

Source: https://www.reddit.com/r/PleX/comments/mpwc8r/linuxserverplex_limited_to_indirect_connection/