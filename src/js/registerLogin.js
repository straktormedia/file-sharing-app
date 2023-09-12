import siteURL from "./config.js";

// Register
const registrationForm = document.querySelector("#registration-form");

const registrationSection = document.querySelector(".registration");
const successModal = document.querySelector(".modal");
const closeSuccessModal = document.querySelector(".modal__close-btn");

registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get Register Form Values
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;
  const role = document.querySelector("#role").value;

  // Data validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!password.match(passwordRegex)) {
    alert(
      "Password must be at least 8 characters and contain at least one letter and one number."
    );
    return;
  }

  if (password !== confirmPassword) {
    alert("Password and Confirm Password must match.");
    return;
  }

  // Email validation with RegEx
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email address format.");
    return;
  }

  // If validation passes, send the data to the server
  const requestBody = `username=${username}&email=${email}&password=${password}&confirm-password=${confirmPassword}&role=${role}`;

  try {
    const response = await fetch(`${siteURL}register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        // Registration successful, display success message
        successModal.showModal();
        registrationSection.classList.add("hidden");
      } else {
        // Registration failed, display error message
        console.error("Registration failed: " + data.message);
      }
    } else {
      // Handle HTTP error responses
      console.error("HTTP Error: " + response.status);
      alert("Username or email already exists!");
    }
  } catch (error) {
    // Handle network errors
    console.error("Network error occurred: " + error.message);
  }
});

// Close modal when the "Close" button is clicked
closeSuccessModal.addEventListener("click", () => {
  successModal.close();
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get Login Form Values
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;

  // Send login data to the server
  try {
    const response = await fetch(`${siteURL}login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${username}&password=${password}`,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        window.location.href = "admin-dashboard.html";
      } else {
        // Access both HTTP status code and custom message
        const httpStatus = data.http_status;
        const errorMessage = data.message;

        if (httpStatus === 401) {
          alert("Unauthorized: " + errorMessage);
        } else if (httpStatus === 404) {
          alert("Not Found: " + errorMessage);
        } else {
          console.error("Login failed: " + errorMessage);
        }
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
