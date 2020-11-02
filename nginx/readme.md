# NGINX
Instruction for deploying nginx.
## NGINX Configuration
Add these locations to `/etc/nginx/nginx.conf`, or you can simply replace it with relevant file in this repository.
```
location / {
    root /home/web-server-simple-web-server/front;
    index index1.html;
}
```
```
location /go/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://127.0.0.1:8000;
}
```
```
location /nodejs/{
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://127.0.0.1:3000;
}
```
