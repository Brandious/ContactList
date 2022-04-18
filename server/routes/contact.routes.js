const { authJwt } = require('../middleware');
const controller = require('../controllers/contact.controller');

module.exports = (app) => {
    app.use((req, res, next) => {

        res.header('Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-type, Accept ');
        next();
    })
  app.post(
    "/api/test/contact",
    [authJwt.verifyToken],
    controller.createContact
  );

  app.get(
    "/api/test/contact",
    [authJwt.verifyToken],
    controller.getContacts
  );

  app.delete(
    "/api/test/contact",
    [authJwt.verifyToken],
    controller.deleteContact
  );

  app.patch(
    "/api/test/contact",
    [authJwt.verifyToken],
    controller.updateContact
  );

}