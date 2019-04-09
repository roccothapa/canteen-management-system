# Canteen Management System

Canteen Management System is order management system which place order foods between certain time durations.

# Prerequisites
- mysql
- [PM2](http://pm2.keymetrics.io/) - nodejs process manager
 ``` npm install pm2 -g ```
- node version > 10
- **npm** package manager
- bcrypt 
    - require to setup environment for bcrypt on your system to work
    - use https://github.com/nodejs/node-gyp
- [Sequelize Cli](https://github.com/sequelize/cli)
``` npm install -g sequelize-cli ```

## Installation
- Change config environment with your desired environment
```
/server/config/index.js
```

- After changes on config environment of server you must change client app_url to below file
```
/client/config/app.js
```

- Create a database and change database config file
```
/server/config/database.json
```
Use the package manager [npm](https://www.npmjs.com/) to install package 
> make sure to install packages on both folder client and server using below command
> - cd server/
> - cd client/
```bash
npm install
```

Change directory to server/ and Run migration and seeder 
```
sequelize db:migrate
sequelize db:seed:all
```

## Usage

> start server by typing following command 
```
cd server/
pm2 start app.js
```
> if you don't have pm2 installed on your system you can type following command 
```
cd server/
node app.js
```

> change working directory to client and enter following command 
```
npm run dev
```

## Credentials
> Admin
```
email: admin@gmail.com
password: password@1
```

> Canteen Manager
```
email: manager1@gmail.com
password: password@1
```

> User
```
email: user1@gmail.com
password: password@1
```

Please make sure to install npm.

## License
[MIT](https://choosealicense.com/licenses/mit/)
