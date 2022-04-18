module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define('Contact', {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        }
    })

    return Contact
}