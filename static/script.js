let url = window.location.href,
    user = getCookie('username');

window.addEventListener('load', () => {
    setNavTime();
    setInterval(setNavTime, 1000 * 60);
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