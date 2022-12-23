
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
    return days * 24 * 60 * 60;
}


function incrementCachedTime(days) {
    return days * 24 * 60 * 60;
}

module.exports = { shortId, cacheExpTime, incrementCachedTime }