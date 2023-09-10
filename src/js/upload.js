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
      "http://localhost/file-sharing-app/api/list_all_files.php"
    );
    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        const fileList = document.getElementById("file-list");
        const fileListOthers = document.getElementById("file-list-others");

        // Reset UI
        const existingFiles = fileList.querySelectorAll("div");
        if (existingFiles) existingFiles.forEach((file) => file.remove());

        // Populate "file-list" and "file-list-others" elements
        if (data.files.length > 0) {
          data.files.forEach((file) => {
            const fileEntry = document.createElement("div");
            fileEntry.classList.add("file-list__item");
            fileEntry.textContent = file.filename;

            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("file-list__buttons-container");
            fileEntry.appendChild(buttonsContainer);

            // Create buttons for delete, share, and download

            const shareButton = document.createElement("button");
            shareButton.classList.add("button-small");
            shareButton.textContent = "Share🔗";
            shareButton.addEventListener("click", () => handleShare(file.id));

            const downloadButton = document.createElement("button");
            downloadButton.classList.add("button-small");
            downloadButton.textContent = "Download 📥";
            downloadButton.addEventListener("click", () =>
              handleDownload(file.id, file.filename)
            );

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("button-small");
            deleteButton.textContent = "Delete🗑️";
            deleteButton.addEventListener("click", () => handleDelete(file.id));

            // Append buttons to file entry
            buttonsContainer.appendChild(shareButton);
            buttonsContainer.appendChild(downloadButton);
            buttonsContainer.appendChild(deleteButton);

            // console.log(file);
            if (fileListOthers) fileListOthers.appendChild(fileEntry);

            // if (file.user_role === "user") {
            //   // Display files under "My Files" for "user"
            //   fileList.appendChild(fileEntry);
            // }

            // if (file.user_role === "admin") {
            //   // Display files under "My Files" for "admin"
            //   fileList.appendChild(fileEntry);
            // }

            // if (file.user_role === "admin") {
            //   // Display files under "Files by other Users" for "admin" only
            //   fileListOthers.appendChild(fileEntry);
            // }
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

// List User Files
const listMyFiles = async () => {
  try {
    const response = await fetch(
      "http://localhost/file-sharing-app/api/list_my_files.php"
    );
    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        const fileList = document.getElementById("file-list");
        const fileListOthers = document.getElementById("file-list-others");

        // Reset UI
        const existingFiles = fileList.querySelectorAll("div");
        if (existingFiles) existingFiles.forEach((file) => file.remove());

        // Populate "file-list" and "file-list-others" elements
        if (data.files.length > 0) {
          data.files.forEach((file) => {
            const fileEntry = document.createElement("div");
            fileEntry.classList.add("file-list__item");
            fileEntry.textContent = file.filename;

            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("file-list__buttons-container");
            fileEntry.appendChild(buttonsContainer);

            // Create buttons for delete, share, and download

            const shareButton = document.createElement("button");
            shareButton.classList.add("button-small");
            shareButton.textContent = "Share🔗";
            shareButton.addEventListener("click", () => handleShare(file.id));

            const downloadButton = document.createElement("button");
            downloadButton.classList.add("button-small");
            downloadButton.textContent = "Download 📥";
            downloadButton.addEventListener("click", () =>
              handleDownload(file.id, file.filename)
            );

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("button-small");
            deleteButton.textContent = "Delete🗑️";
            deleteButton.addEventListener("click", () => handleDelete(file.id));

            // Append buttons to file entry
            buttonsContainer.appendChild(shareButton);
            buttonsContainer.appendChild(downloadButton);
            buttonsContainer.appendChild(deleteButton);

            // console.log(file);
            fileList.appendChild(fileEntry);

            // if (file.user_role === "user") {
            //   // Display files under "My Files" for "user"
            //   fileList.appendChild(fileEntry);
            // }

            // if (file.user_role === "admin") {
            //   // Display files under "My Files" for "admin"
            //   fileList.appendChild(fileEntry);
            // }

            // if (file.user_role === "admin") {
            //   // Display files under "Files by other Users" for "admin" only
            //   fileListOthers.appendChild(fileEntry);
            // }
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

// Download
const handleDownload = async (fileId, filename) => {
  try {
    const response = await fetch(
      `http://localhost/file-sharing-app/api/download.php?id=${fileId}`
    );

    if (response.ok) {
      const blob = await response.blob();

      // Log the blob size for debugging
      console.log(blob.size);

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(blobUrl);
    } else {
      console.error("Failed to download file:", response.statusText);
    }
  } catch (error) {
    console.error("Network error occurred:", error.message);
  }
};

// Delete
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
listMyFiles();

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
      await listMyFiles();
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  } else {
    console.error("No file selected for upload");
  }
});
