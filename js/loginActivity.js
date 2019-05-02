firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("resetPassword_div").style.display = "none";
        doConnect();
    } else {
        // No user is signed in.

        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        document.getElementById("resetPassword_div").style.display = "none";
    }
});

function login() {
    var userEmail = document.getElementById("username").value;
    var userPassword = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
        // ...
    });

}

function logout() {
    disconnectMqtt();
    firebase.auth().signOut();

}

function forgotPassword() {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("resetPassword_div").style.display = "block";

}

function backLogin() {

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("resetPassword_div").style.display = "none";

}

function sendEmail() {

    var userEmail = document.getElementById("fpusername").value;
    firebase.auth().sendPasswordResetEmail(userEmail).then(() => {
        window.alert('Password reset email sent, check your inbox.');
    }).catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
        // ...
    });

}