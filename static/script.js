let url = window.location.origin,
    session = getCookie('session');

window.addEventListener('load', () => {
    if (session == null) { // Login
        
    } else { // Show Tasks
      
}
});

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

function setCookie(cookieName, cookieValue) {
    document.cookie = `${cookieName}=${cookieValue}`;
}

function POST(url, json, func) {
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(json),
        dataType: 'json',
        success: func,
        error: function(){
            app.log(`Error in ${url} call, with data of ${JSON.stringify(json)}`);
        },
        processData: false,
        type: 'POST',
        url: url
    });
}