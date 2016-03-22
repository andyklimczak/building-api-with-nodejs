module.exports = app => {
  const Users = app.db.models.Users;

  app.route('/user')
  .all(app.auth.authenticate())
  /**
   * @api {get} /user Return the authenticated user's data
   * @apiGroup User
   * @apiHeader {String} Authorization Token of authenticated user
   * @apiHeaderExample {json} Header
   *   {"Authorization": "JWT abc.123"}
   * @apiSuccess {Number} id User id
   * @apiSuccess {String} name User name
   * @apiSuccessExample {json} Success
   *   HTTP/1.1 200 OK
   *   {
   *     "id": 1,
   *     "name": "John Conner",
   *     "email": "john@conner.net"
   *   }
   * @apiErrorExample {json} Find error
   *   HTTP/1.1 412 Precondition Failed
   *
   */
  .get((req, res) => {
    Users.findById(req.user.id, {
      attributes: ['id', 'name', 'email']
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  })

  /**
   *  @api {delete} /user Deletes an authenticated user
   *  @apiGroup User
   *  @apiHeader {String} Authorization Token of authenticated user
   *  @apiHeaderExample {json} Header
   *    {"Authorization": "JWT abc.123"}
   *  @apiSuccessExample {json} Success
   *    HTTP/1.1 204 No Content
   *  @apiErrorExample {json} Delete error
   *    HTTP/1.1 412 Precondition Failed
   *
   */
  .delete((req, res) => {
    Users.destroy({where: {id: req.user.id} })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  /**
   * @api {post} /users Register a new user
   * @apiGroup User
   * @apiParam {String} name User name
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} Input
   *   {
   *     "name": "John Conner",
   *     "email": "john@conner.net",
   *     "pasword": "123456"
   *   }
   * @apiSuccess {Number} id User id
   * @apiSuccess {String} name User name
   * @apiSuccess {String} email User email
   * @apiSuccess {String} password User password
   * @apiSuccess {Date} updated_at Update's date
   * @apiSuccess {Date} created_at Register's date
   * @apiSuccessExample {json} Success
   *   HTTP/1.1 200 OK
   *   {
   *     "id": 1,
   *     "name": "John Conner",
   *     "email": "john@conner.net",
   *     "password": "password123",
   *     "updated_at": "2016-2-10T15:20:11.700Z",
   *     "created_at": "2016-2-10T15:20:11.700Z"
   *   }
   * @apiErrorExample {json} Register error
   *   HTTP/1.1 412 Precondition Failed
   *
   */
  app.post('/users', (req, res) => {
    Users.create(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });
};
