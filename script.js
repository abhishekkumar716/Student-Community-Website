

            function logout() {//logout funtion
                // Redirect the user to the home page
                window.location.href = "index.html";
            }


           // Function to create a new post
function createPost() {
    var postContent = document.getElementById("post-content").value;
    var postImage = document.getElementById("post-image").files[0];

    var postObject = {
        content: postContent,
        image: ""
    };

    if (postImage) {
        var reader = new FileReader();
        reader.onload = function (e) {
            postObject.image = e.target.result;
            savePost(postObject);
        };
        reader.readAsDataURL(postImage);
    } else {
        savePost(postObject);
    }
}

function savePost(postObject) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(postObject);
    localStorage.setItem("posts", JSON.stringify(posts));

    // Display the post immediately
    displayPost(postObject);
    updateIndexPagePosts();
}

function displayPost(post) {
    var postsContainer = document.getElementById("posts-container");
    var postElement = document.createElement("div");
    postElement.classList.add("post");

    var postContentElement = document.createElement("p");
    postContentElement.textContent = post.content;
    postElement.appendChild(postContentElement);

    if (post.image) {
        var postImageElement = document.createElement("img");
        postImageElement.src = post.image;
        postImageElement.classList.add("post-image");
        postElement.appendChild(postImageElement);
    }

    postsContainer.insertBefore(postElement, postsContainer.firstChild);
}

window.onload = function() {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(function(post) {
        displayPost(post);
    });
    displayBanner();
};

function updateIndexPagePosts() {
    var indexPagePosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("indexPagePosts", JSON.stringify(indexPagePosts));
}

function changeBanner() {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var bannerUrl = event.target.result;
                localStorage.setItem("banner", bannerUrl);
                displayBanner();
                updateIndexPageBanner();
            };
            reader.readAsDataURL(file);
        }
    };
    fileInput.click();
}

function displayBanner() {
    var bannerUrl = localStorage.getItem("banner");
    if (bannerUrl) {
        var bannerElement = document.getElementById("banner");
        if (!bannerElement) {
            bannerElement = document.createElement("img");
            bannerElement.id = "banner";
            document.body.insertBefore(bannerElement, document.body.firstChild);
        }
        bannerElement.src = bannerUrl;
    }
}

function updateIndexPageBanner() {
    var bannerUrl = localStorage.getItem("banner");
    localStorage.setItem("indexPageBanner", bannerUrl);
}

function viewPosts() {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    var contentContainer = document.querySelector('.main-content');
    contentContainer.innerHTML = '';

    var heading = document.createElement('h2');
    heading.textContent = 'Posts';
    contentContainer.appendChild(heading);

    var list = document.createElement('ul');
    posts.forEach(function(post, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<p>${post.content}</p>`;
        if (post.image) {
            listItem.innerHTML += `<img src="${post.image}" alt="Post Image" style="max-width: 100%;">`;
        }
        listItem.innerHTML += `<button onclick="deletePost(${index})">Delete</button>`;
        list.appendChild(listItem);
    });
    contentContainer.appendChild(list);
}

function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    viewPosts();
    updateIndexPagePosts();
}

function viewRegistrations() {
    var contentContainer = document.querySelector('.main-content');
    contentContainer.innerHTML = '';

    var heading = document.createElement('h2');
    heading.textContent = 'Registrations';
    contentContainer.appendChild(heading);

    var registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    var list = document.createElement('ul');
    registrations.forEach(function(registration) {
        var listItem = document.createElement('li');
        listItem.textContent = registration;
        list.appendChild(listItem);
    });
    contentContainer.appendChild(list);
}

function addEvent() {
    var eventName = prompt("Enter event name:");
    if (eventName) {
        var events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(eventName);
        localStorage.setItem("events", JSON.stringify(events));
        alert("Event added successfully!");
    }
}



    // Function to create a new post
function createPost() {
    var postContent = document.getElementById("post-content").value;
    var postImage = document.getElementById("post-image").files[0];
    var email = getEmail(); // Function to get the email of the student

    // Create post object
    var postObject = {
        content: postContent,
        image: postImage ? URL.createObjectURL(postImage) : null,
        email: email
    };

    // Store the new post in local storage
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(postObject);
    localStorage.setItem("posts", JSON.stringify(posts));

    // Display the post immediately
    displayPost(postObject);

    // Clear the post form
    document.getElementById("post-content").value = "";
    document.getElementById("post-image").value = "";
}

// Function to get the email of the student
function getEmail() {
    // You need to implement this function to get the email of the current user
    // For demonstration purposes, I'll just return a static email
    return "student@example.com";
}

// Function to display existing posts when the page loads
window.onload = function() {
    displayExistingPosts();
};

// Function to display existing posts from local storage
function displayExistingPosts() {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(function(post) {
        displayPost(post);
    });
}

// Function to display a post
function displayPost(post) {
    var postsContainer = document.getElementById("posts-container");
    var postElement = document.createElement("div");
    postElement.classList.add("post");

    // Add post content (caption)
    var postContentElement = document.createElement("p");
    postContentElement.textContent = post.content;
    postElement.appendChild(postContentElement);

    // Check if the post contains an image
    if (post.image) {
        var postImageElement = document.createElement("img");
        postImageElement.src = post.image;
        postImageElement.classList.add("post-image");
        postElement.appendChild(postImageElement);
    }

    // Add email
    var postUserElement = document.createElement("p");
    postUserElement.textContent = "Posted by: " + post.email;
    postElement.appendChild(postUserElement);

    postsContainer.insertBefore(postElement, postsContainer.firstChild);
}
