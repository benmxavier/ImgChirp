//includes
var util = require('util'),
    twitter = require('twit'),
    sentimentAnalysis = require('./sentimentAnalysis'),
    db = require('diskdb');

db = db.connect('db', ['sentiments']);
//config
var config = {
    consumer_key: 'Z9gC14MvoMmth5ddxm0D5MPXB',
    consumer_secret: '10lZJg4pX2IqoIbBNOGip3OBQQhwLkFPW05D7wg0dPobQTgcZP',
    access_token: '1247773837-vRC0vvkN6P2kRgLXjOFpfgPrt1vddAHgtFQ5fhH',
    access_token_secret: '9TbJwAkCkVnz6XWfSOp1I0s8i8yyIoubt898k5v3CYMll'
};

module.exports = function (text, callback) {
    var twitterClient = new twitter(config);
    var response = [], dbData = []; // to store the tweets and sentiment
    
    //console.log("Hitting the twitter client.");   
    //console.log(text);
    
    twitterClient.get('search/tweets', { q: text + ' since:2014-1-1', geocode:'44.4735078,-73.2055553,10mi', count: 1 }, function (err, data, resp) {
       console.log(data);
       console.log(err);        

        for (var i = 0; i < data.statuses.length; i++) {
            var resp = {};            

            resp.tweet = data.statuses[i];
            resp.sentiment = sentimentAnalysis(data.statuses[i].text);
            dbData.push({
                tweet: resp.tweet.text,
                score: resp.sentiment.score
            });
            console.log('This tweet is: ' + resp.tweet.text);
            console.log('The sentiment score is: ' + resp.sentiment.score);
            response.push(resp);
        };
        db.sentiments.save(dbData);
        callback(response);
    });
}


