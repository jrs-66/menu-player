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
          // player known, but not activated
          console.log('player known, not activated');
          res.json({player_id: doc._id, activation_code: doc.activation_code});
          return;
        }
        // player exists
        res.json({player_id: doc._id, activation_code: 'EXISTS', 'template_id': doc.template_id});

      } else {
        // new player, generate activation code
        var randomstring = require("randomstring");
        var rString = (randomstring.generate(5)).toUpperCase();

        collection.insert({
          activation_code: rString,
          playerid: playerid,
          modelid: modelid
        }, function(err, records) {
          console.log({activation_code: rString, playerid: playerid, modelid: modelid, merchant_id: 'my_id'});
          console.log('INSERTED');
          res.json({player_id: records[0]._id, activation_code: rString});
        });
      }
    });
  }
}
