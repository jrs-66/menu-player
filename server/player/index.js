'use strict';

exports.player = function() {
  return function(req, res, next) {
    // format - /player/slide/:playerid/:modelid
    // params - playerid, modelid

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    var playerid = req.params.playerid;
    var modelid = req.params.modelid;
    var collection = req.db.get('players');

    collection.findOne({playerid: playerid, modelid: modelid},{},function(e,doc){

      if (doc) {
        if (doc.activation_code) {
          // player known, but not activated

          res.json({'activation_code': doc.activation_code});
          return;
        }

        // player exists
        res.json({'activation_code': 'EXISTS', 'template_id': doc.template_id});

      } else {
        // new player, generate activation code
        var rString = randomString(6, '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ');
        collection.insert({
          activation_code: rString,
          playerid: playerid,
          modelid: modelid
        });

        res.json({'activation_code': rString});
      }
    });
  }
}
