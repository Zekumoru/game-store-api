# Game Store API

## Description

Makes requests to RAWG to fetch games' data.<br>

This API is used as a sort of _"middleware"_ to hide RAWG's API key from the browser client.

## Starting Server

It is advised to use **pm2** to have the API continually running.

```bash
pm2 start server.js --name "Game Store API"
```

## Reverse Proxy Setup

Under a `server` block, set a location block pointing to this API.<br>

Replace `PORT_NUMBER_HERE` with the port number provided in the `.env` file.

```conf
location /game-store-api {
    proxy_pass  http://127.0.0.1:PORT_NUMBER_HERE;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

> The `server` block in my case is in `/etc/nginx/conf.d/www.my-website-name.com.conf`.
