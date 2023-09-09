// TO-DO
// 1. Progress Bar
// 2. Replace/Skip Message when uploading same file

// Uploads
const uploadButton = document.querySelector("[upload-btn]");
const fileInput = document.querySelector("[file-input]");
// const progressBar = document.querySelector('[data-progress="bar"]');
// const progressText = document.querySelector('[data-progress="text"]');
// const progressContainer = document.querySelector('[data-container="progress"]');

// Upload File
const uploadFile = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost/file-sharing-app/upload.php",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Network error occurred");
  }
};

// Handle Upload Button
uploadButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0]; // The uploaded file as an object with useful info

  if (file) {
    const formData = new FormData();

    formData.append("file", file); // Creates an object with "file" as key and file as value

    try {
      const response = await uploadFile(formData);
      if (response.success) {
        // Handle successful upload, e.g., display a success message
        console.log("From upload.php: File uploaded successfully");
      } else {
        // Handle upload error, e.g., display an error message
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  } else {
    console.error("No file selected for upload");
  }
});

/////////////////////////////////////////////////////
// Register
const registrationForm = document.getElementById("registration-form");

registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get Register Form Values
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const role = document.getElementById("role").value;

  /*
  if (// Add your validation logic here ) {
    // Display validation errors to the user
    // Example: document.getElementById("error-message").textContent = "Invalid input";
    return;
  }
  */

  // If validation passes, send the data to the server

  const requestBody = `username=${username}&email=${email}&password=${password}&confirm-password=${confirmPassword}&role=${role}`;

  try {
    const response = await fetch(
      "http://localhost/file-sharing-app/register.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody,
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Registration successful, display success message
        console.log("Registration successful");
      } else {
        // Registration failed, display error message
        console.error("Registration failed: " + data.message);
      }
    } else {
      // Handle HTTP error responses
      console.error("HTTP Error: " + response.status);
    }
  } catch (error) {
    // Handle network errors
    console.error("Network error occurred: " + error.message);
  }
});

// Login
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get Login Form Values
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Send login data to the server
  try {
    const response = await fetch(
      "http://localhost/file-sharing-app/login.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&password=${password}`,
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Check the user's role
        const userRole = data.role;
        if (userRole === "user") {
          // Redirect to the user dashboard
          window.location.href = "dashboard.html";
        } else if (userRole === "admin") {
          // Redirect to the admin dashboard
          window.location.href = "admin-dashboard.html";
        } else {
          // Handle unknown role
          console.error("Unknown user role: " + userRole);
        }
      } else {
        // Login failed, display error message
        console.error("Login failed: " + data.message);
      }
    } else {
      // Handle HTTP error responses
      console.error("HTTP Error: " + response.status);
    }
  } catch (error) {
    // Handle network errors
    console.error("Network error occurred: " + error.message);
  }
});
