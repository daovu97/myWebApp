firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("resetPassword_div").style.display = "none";
        document.getElementById("signup_div").style.display = "none";
        doConnect();
    } else {
        // No user is signed in.

        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        document.getElementById("resetPassword_div").style.display = "none";
        document.getElementById("signup_div").style.display = "none";
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

function signup() {
    var userEmail = document.getElementById("signUpUsername").value;
    var userPassword = document.getElementById("signUpPassword").value;
    var signupCode = document.getElementById("signUpcode").value;

    var docRef = db.collection("user").doc(signupCode);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            var numberDevides = doc.data().devices;


            firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(() => {

                window.alert('acc created');
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                window.alert("Error: " + errorMessage);
                // ...
            });



        } else {
            // doc.data() will be undefined in this case
            window.alert("User code does not match, Please retype user code");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

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

function logout() {
    disconnectMqtt();
    firebase.auth().signOut();

}

function forgotPassword() {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("resetPassword_div").style.display = "block";
    document.getElementById("signup_div").style.display = "none";

}

function backLogin() {

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("resetPassword_div").style.display = "none";
    document.getElementById("signup_div").style.display = "none";

}

function signupLayout() {

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("resetPassword_div").style.display = "none";
    document.getElementById("signup_div").style.display = "block";

}

function signinLayout() {

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("resetPassword_div").style.display = "none";
    document.getElementById("signup_div").style.display = "none";

}