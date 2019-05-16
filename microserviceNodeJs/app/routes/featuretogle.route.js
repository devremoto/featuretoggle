const controller = require('../controllers/featuretoggle');
module.exports = function(app) {
    /**
     * @swagger
     * definition:
     *   featuretoggle:
     *     properties:
     *       id:
     *         type: integer
     *       name:
     *         type: string
     *       content:
     *         type: string
     *       params:
     *         type: array
     *         items:
     *           type: object
     *       tags:
     *         type: array
     *         items:
     *           type: object
     *       children:
     *         type: array
     *         items:
     *             $ref: '#/definitions/featuretoggle'
     */
    var name = '/featuretoggle/v1/featuretoggles';

    /**
     * @swagger
     * /featuretoggles:
     *   get:
     *     tags:
     *       - featuretoggles
     *     description: Returns all featuretoggle
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of featuretoggle
     *         schema:
     *           $ref: '#/definitions/featuretoggle'
     *       500:
     *         description: Internal server error
     */
    app.get(name + '', controller.list);

    /**
     * @swagger
     * /featuretoggles/{name}:
     *   get:
     *     tags:
     *       - featuretoggles
     *     description: Returns all featuretoggles
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: name
     *         description: name of json featuretoggle
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns a list of featuretoggle
     *         schema:
     *           $ref: '#/definitions/featuretoggle'
     *       404:
     *         description: Id {id} not found
     *       500:
     *         description: Internal server error
     */
    app.get(name + '/:name', controller.getByName);

    /**
     * @swagger
     * /featuretoggles:
     *   post:
     *     tags:
     *       - featuretoggles
     *     description: Creates a new featuretoggle
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: featuretoggle
     *         description: featuretoggle object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/featuretoggle'
     *     responses:
     *       201:
     *         description: featuretoggle created
     *         schema:
     *           $ref: '#/definitions/featuretoggle'
     *       500:
     *         description: Error while creating featuretoggle
     */
    app.post(name + '/', controller.create);

    /**
     * @swagger
     * /featuretoggles:
     *   put:
     *     tags:
     *       - featuretoggles
     *     description: Upadates an object of featuretoggle
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: featuretoggle
     *         description: featuretoggle object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/featuretoggle'
     *     responses:
     *       200:
     *         description: featuretoggle updated
     *         schema:
     *           $ref: '#/definitions/featuretoggle'
     *       500:
     *         description: Error while updateing featuretoggle
     */
    app.put(name + '/', controller.update);

    /**
     * @swagger
     * /featuretoggles/{id}:
     *   delete:
     *     tags:
     *       - featuretoggles
     *     description: Removes one object of featuretoggle
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: featuretoggle's id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: featuretoggle removed
     *       404:
     *         description: Id {id} not found
     *       500:
     *         description: Internal server error
     */
    app.delete(name + '/:id', controller.delete);
};
