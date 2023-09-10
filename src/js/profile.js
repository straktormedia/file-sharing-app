const profileUsername = document.querySelector("[data-profile-username]");
const profileEmail = document.querySelector("[data-profile-email]");

// Get username
const updateUsername = async () => {
  try {
    const response = await fetch(
      "http://localhost/file-sharing-app/api/get_username.php"
    );

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.username) {
        // Update the username placeholder
        const usernamePlaceholder = document.getElementById(
          "usernamePlaceholder"
        );
        usernamePlaceholder.textContent = data.username;

        profileUsername.textContent = data.username;
      }
    } else {
      console.error("Failed to fetch username:", response.status);
    }
  } catch (error) {
    console.error(
      "Network error occurred while fetching username:",
      error.message
    );
  }
};

updateUsername();
