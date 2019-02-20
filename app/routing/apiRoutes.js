var path = require("path");

var friendsData = require("../data/friends.js");

module.exports = function (app) {

    //all friend entries
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    //add new entry from user
    app.post("/api/friends", function (req, res) {
        var input = req.body;

        var response = input.scores;
        console.log(response);

        var MatchedName = ' ';
        var MatchedPic = ' ';
        var diff = 100;

        for (var i = 0; i < friendsData.length; i++) {
            var difference = 0;
            for (var y = 0; y < response.length; y++) {
                difference += Math.abs(friendsData[i].scores[y] - response[y]);
            }

            if (difference < diff) {
                diff = difference;
                MatchedName = friendsData[i].name;
                MatchedPic = friendsData[i].photo;
            }
        }

        friendsData.push(input);
        res.json({ status: 'OK', MatchedName: MatchedName, MatchedPic: MatchedPic });
    });
};