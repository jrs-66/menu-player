'use strict'

exports.template = function(req, res) {
  var db = req.db;
  var collection = db.get('templates');
  collection.findOne({_id: req.params.id},{},function(e,docs){
      res.send(docs);
  });
};
