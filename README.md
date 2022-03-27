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

## Wireguard

1. Go to https://mullvad.net/en/account/#/wireguard-config and generate a configuration file for Linux
2. Start the wireguard container: `docker-compose up wireguard`
3. Stop the container
4. Put the config-file from step 1 in `./wireguard/wg0.conf`
5. Remove any IPv6 addresses from the file
6. Run `docker-compose up wireguard` to see if you get a Mullvad ip address
