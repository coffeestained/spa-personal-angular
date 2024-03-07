#!/bin/sh
sudo apt-get update  # To get the latest package lists
sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring

# Nginx
sudo curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
    | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
sudo echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
    http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
sudo apt update
sudo apt install nginx

# Nvm & node
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
nvm i 20

# NG
npm install -g @angular/cli@16

# Config and build
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled
sudo bash -c 'cat bin/assets/nginx.conf > /etc/nginx/sites-available/pwa-personal-angular'
sudo ln -s /etc/nginx/sites-available/pwa-personal-angular /etc/nginx/sites-enabled/pwa-personal-angular 
(cd app && nvm use 20 && npm ci && ng build)
sudo systemctl reload nginx
sudo service nginx restart