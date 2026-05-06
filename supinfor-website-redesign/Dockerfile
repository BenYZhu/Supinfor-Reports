FROM zhxgharbor.istarshine.com/supinfor/base/nginxbase:v1

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html/

# 清理不需要的文件
RUN rm -rf /usr/share/nginx/html/config \
           /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/.dockerignore \
           /usr/share/nginx/html/jenkins*.sh \
           /usr/share/nginx/html/k8s-update*.py

# nginx 配置
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen       80;
    server_name  _;
    root         /usr/share/nginx/html;
    index        home.html index.html;

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(css|js)$ {
        expires 7d;
        add_header Cache-Control "public";
    }

    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location / {
        try_files $uri $uri/ /home.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 256;
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
