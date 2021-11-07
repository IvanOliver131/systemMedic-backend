if(process.env.NODE_ENV == "development"){
  module.exports = {
    "type": process.env.TYPEORM_TYPE_DEV,
    "host": process.env.TYPEORM_HOST_DEV,
    "port": process.env.TYPEORM_PORT_DEV,
    "username": process.env.TYPEORM_USERNAME_DEV,
    "password": process.env.TYPEORM_PASSWORD_DEV,
    "database": process.env.TYPEORM_DATABASE_DEV,
    "entities": [
      process.env.TYPEORM_ENTITIES_DEV
    ],
    "migrations": [
      process.env.TYPEORM_MIGRATIONS_DEV
    ],
    "cli": {
      "migrationsDir": process.env.TYPEORM_CLI_DEV
    }
  }
}else{
  module.exports = {
    "type": process.env.TYPEORM_TYPE_PROD,
    "host": process.env.TYPEORM_HOST_PROD,
    "port": process.env.TYPEORM_PORT_PROD,
    "username": process.env.TYPEORM_USERNAME_PROD,
    "password": process.env.TYPEORM_PASSWORD_PROD,
    "database": process.env.TYPEORM_DATABASE_PROD,
    "synchronize": false,
    "extra": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false, 
      }
    },
    "entities": [
      process.env.TYPEORM_ENTITIES_PROD
    ],
    "migrations": [
      process.env.TYPEORM_MIGRATIONS_PROD
    ],
    "cli": {
      "migrationsDir": process.env.TYPEORM_CLI_PROD
    }
  }
}

