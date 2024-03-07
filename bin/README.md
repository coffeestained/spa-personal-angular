# pwa-spa-main Deployment Mechanisms

This folder contains various deployment methodoligies for the pwa shell application. 

## development, staging, production deploy

CICD Pipelines (todo)

## local deploy

A unix focused deployment methodology requiring NGINX. Must be run by a user that can adjust NGINX configurations. This will create a NGINX configuration instance for the build on the port 4200. This script will configure the shell application to look for it's Angular child application at 4201, React child application at 4202 and Vue.js child application at 4203..

Usage: 

From the root directory:

source bin/local-deploy.sh