# Homeflix

This is meant to be run on Windows under WSL 2

## Variables

Copy `docker-compose.env.example` to `docker-compose.env` and fill in the values

### Generate basic auth password (`CADDY_BASIC_AUTH_PASSWORD`)

```sh
docker run -it caddy caddy hash-password -plaintext MY_PASSWORD
```

## Fix indirect connection

Under Settings -> Network set "List of IP addresses and networks that are allowed without auth" to `192.168.86.0/24`. Also:

> By adding the IP address http://192.168.86.100:32400/ to Settings -> Network -> Custom Server Access URLs it now shows up in plex.tv/api/resources?X-Plex-Token=xxx as a connection string and direct connection has been successfully established.

Source: https://www.reddit.com/r/PleX/comments/mpwc8r/linuxserverplex_limited_to_indirect_connection/
