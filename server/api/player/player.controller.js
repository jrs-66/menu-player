'use strict';

exports.player = function() {
  return function(req, res, next) {

    var db = req.db;
    var playerid = req.params.playerid;
    var modelid = req.params.modelid;
    var collection = db.get('players');

    collection.findOne({playerid: playerid, modelid: modelid},{},function(e,doc){

      if (doc) {
        if (doc.activation_code) {
          console.log('player known, not activated');
          res.json({player_id: doc._id, activation_code: doc.activation_code});
          return;
        }
        res.json({player_id: doc._id, 'template_id': doc.template_id});

      } else {
        // new player, generate activation code
        var randomstring = require("randomstring");
        var rString = (randomstring.generate(5)).toUpperCase();

        collection.insert({
          activation_code: rString,
          playerid: playerid,
          modelid: modelid
        }, function(err, record){
          res.json({player_id: record._id, activation_code: rString});
        });
      }
    });
  }
}
