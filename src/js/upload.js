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
      "http://localhost/file-sharing-app/api/upload.php",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      if (data.success) {
        // Handle successful upload, e.g., display a success message
        console.log("From upload.php: File uploaded successfully");
      } else {
        // Handle upload error, e.g., display an error message
        console.error("File upload failed");
      }
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred during file upload:", error);
  }
};

// List Files
const listFiles = async () => {
  try {
    const response = await fetch(
      "http://localhost/file-sharing-app/api/list_my_files.php"
    );
    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        const fileList = document.getElementById("file-list");

        // Reset UI
        const existingFiles = fileList.querySelectorAll("div");
        if (existingFiles) existingFiles.forEach((file) => file.remove());

        // Populate "file-list" element
        if (data.files.length > 0) {
          data.files.forEach((file) => {
            const fileEntry = document.createElement("div");
            fileEntry.textContent = file.filename;

            // Create buttons for delete, share, and download
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => handleDelete(file.id));

            const shareButton = document.createElement("button");
            shareButton.textContent = "Share";
            shareButton.addEventListener("click", () => handleShare(file.id));

            // Append buttons to file entry
            fileEntry.appendChild(deleteButton);
            fileEntry.appendChild(shareButton);

            fileList.appendChild(fileEntry);
          });
        } else {
          const noFilesMessage = document.createElement("p");
          noFilesMessage.textContent = "No files uploaded yet.";
          fileList.appendChild(noFilesMessage);
        }
      } else {
        console.error("Failed to fetch files:", data.message);
      }
    } else {
      console.error("HTTP Error:", response.status);
    }
  } catch (error) {
    console.error("Network error occurred:", error.message);
  }
};

// Delete File
const handleDelete = async (fileId) => {
  // Send a request to delete.php with the file ID
  const response = await fetch(
    `http://localhost/file-sharing-app/api/delete.php?id=${fileId}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    // File deleted successfully, update the UI
    listFiles();
  } else {
    console.error("Failed to delete file:", response.statusText);
  }
};

// Share
const handleShare = async (fileId) => {
  try {
    const response = await fetch(
      `http://localhost/file-sharing-app/api/share.php?id=${fileId}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Display the shareable link in the modal
        const shareableLinkInput =
          document.getElementById("shareableLinkInput");
        shareableLinkInput.value = data.shareable_link;

        // Show the modal
        const shareDialog = document.getElementById("shareDialog");
        shareDialog.showModal();
      } else {
        // Handle sharing error, e.g., display an error message
        console.error(`File sharing failed: ${data.message}`);
      }
    } else {
      // Handle HTTP error responses
      console.error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    // Handle network errors
    console.error(`Network error occurred: ${error.message}`);
  }
};

// Close the share dialog
const closeShareDialogButton = document.getElementById("closeShareDialog");
closeShareDialogButton.addEventListener("click", () => {
  const shareDialog = document.getElementById("shareDialog");
  shareDialog.close();
});

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

// Call the function to update the username
updateUsername();

listFiles();

// Handle Upload Button
uploadButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0]; // The uploaded file as an object with useful info

  if (file) {
    const formData = new FormData();

    formData.append("file", file); // Creates an object with "file" as key and file as value

    try {
      await uploadFile(formData);
      await listFiles();
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  } else {
    console.error("No file selected for upload");
  }
});
