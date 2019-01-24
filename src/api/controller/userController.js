'use strict';
var sha1 = require('sha1');
var fs = require('fs');
var path = require('path');
var randtoken = require('rand-token');
var mongoose = require('mongoose'),
    users = mongoose.model('users'),
    admin = mongoose.model('admins'),
    Products = mongoose.model('products');

exports.add_user = function (req, res) {    
            var doc = new users({ name: req.body.name, password: sha1(req.body.password), real_password: req.body.password, email: req.body.email,  });
    doc.save(function (err, admin) {
        if (err) {
            res.send(err);
        } else {
            res.json({result:"success"});
        }
    });
};

exports.login = function (req, res) {
    admin.findOne({ email: req.body.email, real_password: req.body.password }, function (err, admins) {
        if (err) {
            res.send(err);
        } else {
            if (admins == null) {
                res.status(400);
                res.json({result:"Invalid"});
            } else {               
                    res.json({ result: "success"});
            }
        }
    });
};


exports.listproduct = function (req, res) {   
    Products.find({status:"0"},function (err, task) {
                if (err){
                    res.send(err);
                }else{
                    res.json({result:"success",data:task})      
                }                          
            });
};


exports.product_a_list = function (req, res) {   
    Products.find({_id:req.params._id},function (err, task) {
        if (err){
            res.send(err);
        }else{
            res.json({result:"success",data:task})      
        }                          
    });
};
// add product
  
    exports.add_product = function(req, res) {
          var body = req.body;
          var vurl="";  
          var img="http://placehold.it/400x20&text=slide1";
          if(req.file!="" && req.file!=undefined){
            var oldpath = req.file.path;
             var token=randtoken.generate(8);
            var newpath =  path.join(__dirname, '../../../public/image/'+req.file.originalname);
            console.log(newpath)
        var filepath=`http://localhost:3034/image/`;
          fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
          });
          var vurl=filepath+req.file.originalname;
          }else{
            var vurl="http://placehold.it/400x20&text=slide1";
          }
          if(vurl!=""){
          var new_task = new Products({     
            name:body.name,
              image:vurl,    
          });  
      }else{
          var new_task = new Products({     
              name:body.name,
              image:img
           });  
      }
          new_task.save(function(err, task) {
              if (err){
              res.send(err);}
              else{
      
                  res.redirect('/#/list');
          }
          });
      
      }


      
    exports.edit_product = function(req, res) {
        var body = req.body;
        var vurl="";  
        var img="http://placehold.it/400x20&text=slide1";
        if(req.file!="" && req.file!=undefined){
          var oldpath = req.file.path;
           var token=randtoken.generate(8);
          var newpath =  path.join(__dirname, '../../../public/image/'+req.file.originalname);
        
      var filepath=`http://localhost:3034/image/`;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
        });
        var vurl=filepath+req.file.originalname;
        }else{
          var vurl=req.body.img;
        }
        if(vurl!=""){
        var new_task = ({     
          name:body.name,
            image:vurl,    
        });  
    }else{
        var new_task = ({     
            name:body.name,
            image:img
         });  
    }
    Products.findOneAndUpdate({_id:req.params._id},new_task, function (err,data) {
            if (err){
            res.send(err);}
            else{    
                res.redirect('/#/list');
        }
        });
    
    }


    
    exports.delete_product = function(req, res) {
        var new_task = ({  
            status:"2"
         });  
    Products.findOneAndUpdate({_id:req.params._id},new_task, function (err,data) {
            if (err){
            res.send(err);}
            else{    
                res.redirect('/#/list');
        }
        });
    
    }