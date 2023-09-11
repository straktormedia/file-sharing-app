const profileUsername = document.querySelector("[data-profile-username]");
const profileEmail = document.querySelector("[data-profile-email]");
const profileRole = document.querySelector("[data-profile-role]");

// Get user data
const getUserData = async () => {
  try {
    const response = await fetch(
      "http://localhost/file-sharing-app/api/get_user_data.php"
    );

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Welcome message
        const usernamePlaceholder = document.getElementById(
          "usernamePlaceholder"
        );
        usernamePlaceholder.textContent = data.username;

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
