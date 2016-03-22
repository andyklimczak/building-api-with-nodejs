/**
 * @api {get} / API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status' Message
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *  {"status": "Ntask API"}
 */
module.exports = app => {
  app.get('/', (req, res) => {
    res.json({status: 'NTask API'});
  });
};
