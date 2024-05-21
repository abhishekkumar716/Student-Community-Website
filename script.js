// Function to handle user logout
function logout() {
    window.location.href = "index.html";
}

// Function to redirect to the event management page
function addEvent() {
    window.location.href = "event.html";
}

// Function to create and save a new post
function createPost() {
    var postContent = document.getElementById("post-content").value;
    var postImage = document.getElementById("post-image").files[0];
    var email = getEmail(); // Assuming getEmail() correctly retrieves the current user's email

    if (postImage) {
        var reader = new FileReader();
        reader.onload = function (e) {
            savePost({
                content: postContent,
                image: e.target.result,
                email: email
            });
        };
        reader.readAsDataURL(postImage);
    } else {
        savePost({
            content: postContent,
            image: "",
            email: email
        });
    }
}

// Function to save post to localStorage and display it
function savePost(postObject) {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(postObject);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPost(postObject);
    clearPostForm();
}

// Function to display a post
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

    var postUserElement = document.createElement("p");
    postUserElement.textContent = "Posted by: " + post.email;
    postElement.appendChild(postUserElement);

    postsContainer.insertBefore(postElement, postsContainer.firstChild);
}

// Function to clear the post form fields
function clearPostForm() {
    document.getElementById("post-content").value = "";
    document.getElementById("post-image").value = "";
}

// Function to display all posts on page load
window.onload = function() {
    displayPosts();
    displayEvents();
};
function viewPosts() {
    
    console.log("Viewing posts...");
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    console.log("Posts retrieved:", posts);
    var contentContainer = document.querySelector('.main-content');
    console.log("Content container:", contentContainer);
    if (!contentContainer) {
        console.error("Error: main-content container not found.");
        return;
    }

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
    // Prompt the user for confirmation before deleting
    var confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
        var posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        viewPosts();
        updateIndexPagePosts();
    }
}

// Function to display all posts from localStorage
function displayPosts() {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(displayPost);
}

// Function to display all registrations
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
        listItem.innerHTML = `<p><strong>Name:</strong> ${registration.name}</p>
                              <p><strong>Roll Number:</strong> ${registration.rollNo}</p>
                              <p><strong>Sport:</strong> ${registration.sport}</p>`;
        list.appendChild(listItem);
    });
    contentContainer.appendChild(list);
}

// Function to get the email of the user (placeholder function)
function getEmail() {
    // Placeholder for actual email retrieval logic
    return "admin@example.com";
}