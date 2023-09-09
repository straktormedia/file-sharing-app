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
