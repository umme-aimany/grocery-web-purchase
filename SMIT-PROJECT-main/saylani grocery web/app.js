const app = firebase.initializeApp(firebaseConfig);
console.log(app)

const signup = () => {
    let username = document.getElementById('username').value;
    let contact = document.getElementById('contact').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let role = 'User'

    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid,
                username: username,
                role: role,
                contact: contact,
                email: email,
                password: password
            })
                .then(() => {
                    const user = { email: email };
                    localStorage.setItem('user', JSON.stringify(user));
                    alert('User created successfully.')
                    window.location.href = '../html files/signin.html'
                })
                .catch((error) => {
                    alert(error);
                })
     })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorCode + ': ' + errorMessage)
        });
}


















const signin = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log(user)
            const dbRef = firebase.database().ref();
            dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val()
                    if (userData.role === 'Admin') {
                        const user = { email: email };
                        localStorage.setItem('user', JSON.stringify(user));
                        alert('User created successfully.')
                        window.location.href = '../html files/page13.html'
                    }
                    else {
                        const user = { email: email };
                        localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = '../html files/checkout.html'
                    }
                } else {
                    alert("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorCode + ': ' + errorMessage)
        });

}

