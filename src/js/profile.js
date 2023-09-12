import siteURL from "./config.js";

const welcomeUsername = document.querySelector("[data-welcome-username]");
const profileUsername = document.querySelector("[data-profile-username]");
const profileEmail = document.querySelector("[data-profile-email]");
const profileRole = document.querySelector("[data-profile-role]");

// Get user data
const getUserData = async () => {
  try {
    const response = await fetch(`${siteURL}api/get_user_data.php`);

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Welcome message
        welcomeUsername.textContent = data.username;

        // Profile data
        profileUsername.textContent = data.username;
        profileEmail.textContent = data.email;
        profileRole.textContent = data.role;
      }
    } else {
      console.error("Failed to fetch user data:", response.status);
    }
  } catch (error) {
    console.error(
      "Network error occurred while fetching user data:",
      error.message
    );
  }
};

getUserData();
