create .sequelizerc file on root dir
initizlize using sequelize init or from node_moduels folder sequelize/bin

cmd:
    - sequelize model:generate --name Food --attributes title:string
    - sequelize db:migrate
    - sequelize db:migrate:undo
    - sequelize seed:generate --name demo-user
    - sequelize db:seed:all