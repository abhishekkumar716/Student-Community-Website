// Check if the user is logged in and if they are on the community page
function checkLogin() {
    var isLoggedIn = false; // Change this to your actual logic for checking login status
    var currentPage = window.location.href;

    if (currentPage.includes("communities.html")) {
        if (!isLoggedIn) {
            // If user is not logged in, redirect to login page
            window.location.href = "login.html";
        }
    }
}

// Call the checkLogin function when the page is loaded
window.onload = function() {
    checkLogin();
};

// Function to handle form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the email and password from the form
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Check if the email and password match the stored data (replace this with your actual data check logic)
    var isValid = checkCredentials(email, password);

    if (isValid) {
        // If credentials are valid, redirect to the community page
        window.location.href = "communities.html";
    } else {
        // If credentials are invalid, display error message
        document.getElementById("error-message").style.display = "block";
    }
});

// Function to check if the email and password match the stored data (replace this with your actual data check logic)
function checkCredentials(email, password) {
    // Example: Assume email is "user@example.com" and password is "password"
    return email === "user@example.com" && password === "password";
}


// Check if the user is logged in
function checkLogin() {
    var isLoggedIn = true; // Change this to your actual logic for checking login status

    if (isLoggedIn) {
        document.getElementById("add-post").style.display = "block"; // Show add post form
    }
}

// Call the checkLogin function when the page is loaded
window.onload = function() {
    checkLogin();
};

// Function to handle post submission
document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get post title and content from the form
    var title = document.getElementById("post-title").value;
    var content = document.getElementById("post-content").value;
    var image = document.getElementById("post-image").files[0]; // Get the selected image file

    // Example: Send post data to server or perform any action
    console.log("Post Title: " + title);
    console.log("Post Content: " + content);
    console.log("Image File: ", image);

    // Reset form fields
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
    document.getElementById("post-image").value = ""; // Clear file input
});

// Function to handle post submission
document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get post title and content from the form
    var title = document.getElementById("post-title").value;
    var content = document.getElementById("post-content").value;
    var image = document.getElementById("post-image").files[0]; // Get the selected image file

    // Example: Send post data to server or perform any action
    console.log("Post Title: " + title);
    console.log("Post Content: " + content);
    console.log("Image File: ", image);

    // Create a new post object
    var newPost = {
        title: title,
        content: content,
        author: "Current User", // Change to actual username or user ID
        imageUrl: "" // Placeholder for image URL (will be updated after uploading)
    };

    // Add the new post to the beginning of the posts array
    posts.unshift(newPost);

    // Display posts again to show the new post
    displayPosts();

    // Reset form fields
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
    document.getElementById("post-image").value = ""; // Clear file input
});


// Function to handle post submission
document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get post title and content from the form
    var title = document.getElementById("post-title").value;
    var content = document.getElementById("post-content").value;
    var image = document.getElementById("post-image").files[0]; // Get the selected image file

    // Example: Send post data to server or perform any action
    console.log("Post Title: " + title);
    console.log("Post Content: " + content);
    console.log("Image File: ", image);

    // Create a new post object
    var newPost = {
        title: title,
        content: content,
        author: "Current User", // Change to actual username or user ID
        imageUrl: "" // Placeholder for image URL (will be updated after uploading)
    };

    // Add the new post to the beginning of the posts array
    posts.unshift(newPost);

    // Call the displayPosts function to update the community page
    displayPosts();

    // Reset form fields
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
    document.getElementById("post-image").value = ""; // Clear file input
});

// Function to display posts
function displayPosts() {
    var container = document.getElementById("community-posts");

    // Clear existing posts
    container.innerHTML = "";

    // Loop through posts and create HTML elements for each post
    posts.forEach(function(post) {
        var postDiv = document.createElement("div");
        postDiv.classList.add("post");

        var postHeader = document.createElement("div");
        postHeader.classList.add("post-header");
        postHeader.innerHTML = "<h3>" + post.title + "</h3><p>Posted by " + post.author + "</p>";

        var postContent = document.createElement("div");
        postContent.classList.add("post-content");
        postContent.innerHTML = "<p>" + post.content + "</p>";

        // If post has an image, create an image element and add it to the post
        if (post.imageUrl) {
            var postImage = document.createElement("img");
            postImage.src = post.imageUrl;
            postContent.appendChild(postImage);
        }

        postDiv.appendChild(postHeader);    
        postDiv.appendChild(postContent);
        container.appendChild(postDiv);
    });
}

    function logout() {//logout funtion
        // Clear session or local storage (e.g., remove the user data)
        sessionStorage.removeItem("user");
        // Redirect the user to the home page
        window.location.href = "index.html";
    }




