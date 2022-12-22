
function shortId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function cacheExpTime(days) {
    return Date.now() + days * 24 * 60 * 60 * 1000;
}


function incrementCachedTime(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.getTime();
  }

module.exports = { shortId, cacheExpTime , incrementCachedTime }