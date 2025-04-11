// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAP7p5Pk2rlWKK1iC5uzbrqqBeOzynugNM",
    authDomain: "fashhub-9c9fc.firebaseapp.com",
    projectId: "fashhub-9c9fc",
    storageBucket: "fashhub-9c9fc.appspot.com",
    messagingSenderId: "346854470344",
    appId: "1:346854470344:web:48a7d8f6649e33c85a2bfd",
    measurementId: "G-FV8WXKXJ2Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Handle Form Submission
document.getElementById("seller-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("seller-name").value;
    const email = document.getElementById("seller-email").value;
    const phone = document.getElementById("seller-phone").value;
    const password = document.getElementById("seller-password").value;
    const shopName = document.getElementById("shopName").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection("Sellers").doc(user.uid).set({
                name: name,
                email: email,
                phoneNumber: phone,
                shopName: shopName
            });
        })
        .then(() => {
            alert("Registration successful!");
            window.location.href = "signin.html"; // Redirect to sign-in page
        })
        .catch((error) => {
            alert("Error: " + error.message);
            console.error("Registration Error:", error);
        });
});
