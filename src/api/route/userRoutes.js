'use strict';
module.exports = function (app) {
    var user = require('../controller/userController');
      var multer  = require('multer');
      var rn = require('random-number');
      var randtoken = require('rand-token');
      var path = require('path');
      var token=randtoken.generate(12);
      var upload = multer({ dest: path.join(__dirname, '../../../public/image/')})
       
   
    app.route('/add_product')
        .post(upload.single('image'),user.add_product);

        app.route('/edit_product/:_id')
        .post(upload.single('image'),user.edit_product);

        app.route('/delete_product/:_id')
        .post(user.delete_product);

    app.route('/register')
        .post(user.add_user);

    app.route('/login')
        .post(user.login);


    app.route('/listproduct')
        .get(user.listproduct);

        app.route('/product/:_id')
        .get(user.product_a_list);
    };