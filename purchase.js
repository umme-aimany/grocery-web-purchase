
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey : "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    ///////////////////////////////////////////////////////////////////
  

    // Function to display popular items from Firestore
    function displayPopularItems() {
        const popularItemsContainer = document.querySelector(".popular-items");

        // Fetch popular items from Firestore
        db.collection("popularItems")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const itemDiv = document.createElement("div");
                    itemDiv.classList.add("popular-item");
                    itemDiv.innerHTML = `
                        <img src="${data.image}" alt="${data.name}">
                        <p>${data.name}</p>
                    `;
                    popularItemsContainer.appendChild(itemDiv);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    // Function to display images from Firestore
    function displayImageGallery() {
        const imageGalleryContainer = document.querySelector(".image-gallery");

        // Fetch images from Firestore
        db.collection("imageGallery")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const imageDiv = document.createElement("div");
                    imageDiv.classList.add("image-item");
                    imageDiv.innerHTML = `
                        <img src="${data.imageUrl}" alt="Image ${data.imageNumber}">
                    `;
                    imageGalleryContainer.appendChild(imageDiv);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    // Call the functions to display data on page load
    window.onload = function () {
        displayPopularItems();
        displayImageGallery();
    };



