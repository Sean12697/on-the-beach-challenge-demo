let url = window.location.origin,
    session = getCookie('session'),
    main;

window.addEventListener('load', () => {
    main = document.getElementById("main");
    if (session == null) { // Login
        signupScreen();
    } else { // Show Tasks
        showTasks();
    }
});

function signupScreen() {
    main.innerHTML = "<div id='form'><input type='text' value='name' id='name'/><input type='text' value='email'id='email'/><input type='button' value='Signup' onclick='signedup()'/></div>";
}

function signedup() {
    let name = document.getElementById("name").value,
        email = document.getElementById("email").value;
    GET('functions/newUser', {name: name, email: email}, (data) => {
        console.log(data);
        setCookie(session, JSON.parse(data).session);
        showTasks();
    })
}

function showTasks() {
    main.innerHTML = "";
}

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

function GET(url, json, func) {
    $.ajax({
        contentType: 'application/json',
        data: json,
        dataType: 'json',
        success: func,
        error: function(error){
            console.log(error);
        },
        processData: false,
        type: 'GET',
        url: url
    });
}