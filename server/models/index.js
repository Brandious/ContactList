const config = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: config.pool
    }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.contact = require('../models/contact.model.js')(sequelize, Sequelize);


db.ROLES = ["User", "Admin", "Moderator"];

db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
  

db.role.hasMany(db.user, {as: "contacts"});
db.contact.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user'
});



  
module.exports = db;

