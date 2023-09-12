import siteURL from "./config.js";

// Check if the user is authenticated (server-side session)
const checkAuthentication = async () => {
  try {
    const response = await fetch(`${siteURL}authentication.php`);

    if (!response.ok) {
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Authentication check failed: " + error.message);
  }
};

checkAuthentication();
