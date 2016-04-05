# sbs

### 部署方式
1. 开发
`npm start`


2. pm2部署运行 (首先你要安装pm2)
`nvm use 5.6.0`
`npm install`
`npm update --save`
`npm update --save-dev`
`pm2 start pm2-deploy.json --env production`
