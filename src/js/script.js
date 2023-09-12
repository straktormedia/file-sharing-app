import siteURL from "./config.js";

const uploadButton = document.querySelector("[upload-btn]");
const fileInput = document.querySelector("[file-input]");
const progressText = document.querySelector('[data-progress="text"]');
const progressContainer = document.querySelector('[data-container="progress"]');

const shareModal = document.querySelector(".modal");

// Share
const handleShare = async (fileId) => {
  try {
    const response = await fetch(`${siteURL}api/share.php?id=${fileId}`);

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Display the shareable link in the modal
        const shareableLinkInput =
          document.getElementById("shareableLinkInput");
        shareableLinkInput.value = data.shareable_link;

        shareModal.showModal();
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
    const response = await fetch(`${siteURL}api/download.php?id=${fileId}`);

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
  const response = await fetch(`${siteURL}api/delete.php?id=${fileId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // File deleted successfully, update the UI
    listFiles();
    listMyFiles();
  } else {
    console.error("Failed to delete file:", response.statusText);
  }
};

// Create File Entry
const createFileEntry = (file, container, author = true, userRole) => {
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

  if (author) {
    const uploadedBy = document.createElement("div");
    uploadedBy.classList.add("uploaded-by");
    uploadedBy.innerHTML = `<span>Uploaded by:</span><span> <b> ${file.username} </b></span>`;

    // Append buttons to file entry
    buttonsContainer.appendChild(uploadedBy);
  }
  buttonsContainer.appendChild(shareButton);
  buttonsContainer.appendChild(downloadButton);
  buttonsContainer.appendChild(deleteButton);

  if (userRole === "user") {
    // Hide buttons for "user"

    shareButton.remove();
    deleteButton.remove();
  }

  if (container) container.appendChild(fileEntry);
};

// Upload File
const uploadFile = async (formData) => {
  try {
    const response = await fetch(`${siteURL}api/upload.php`, {
      method: "POST",
      body: formData,
    });

    // Create a ReadableStream from the Response body
    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");
    let receivedLength = 0; // To keep track of received bytes

    // Define a function to read and process the stream
    async function readStream() {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Process the received chunk here, if needed
        // For progress tracking, you can update the progress bar
        receivedLength += value.length;
        const percentComplete = (receivedLength / contentLength) * 100;
        console.log(`Upload progress: ${percentComplete.toFixed(2)}%`);

        // Update the progress bar here
        progressContainer.style.width = `${percentComplete.toFixed(2)}%`;
        progressText.textContent = `${percentComplete.toFixed(2)}%`;
      }
    }

    // Start reading the stream
    await readStream();

    if (!response.ok) {
      // Handle upload error
      console.error("File upload failed");
    } else {
      // Now, parse the response as JSON since it's successful
      const data = await response.json();
      if (data.success) {
        // Handle successful upload
        console.log("From upload.php: File uploaded successfully");
      } else {
        // Handle upload error
        console.error("File upload failed");
      }
    }
  } catch (error) {
    console.error("An error occurred during file upload:", error);
  }
};

// List User Files
const listMyFiles = async () => {
  try {
    const response = await fetch(`${siteURL}api/list_my_files.php`);
    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        const fileList = document.getElementById("file-list");

        // Reset UI
        const existingFiles = fileList.querySelectorAll("div");
        if (existingFiles) existingFiles.forEach((file) => file.remove());

        // Populate "file-list" and "file-list-others" elements
        if (data.files.length > 0) {
          data.files.forEach((file) => {
            createFileEntry(file, fileList, false);
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

// List All Files
const listFiles = async () => {
  try {
    // Fetch user data or role from your authentication system
    const userDataResponse = await fetch(`${siteURL}api/get_user_data.php`);

    if (userDataResponse.ok) {
      const userData = await userDataResponse.json();

      if (userData.success) {
        const userRole = userData.role; // Assuming your user data contains the role

        // Now, you can use the userRole variable to conditionally show/hide buttons
        const response = await fetch(`${siteURL}api/list_all_files.php`);

        if (response.ok) {
          const data = await response.json();

          if (data.success) {
            const fileListOthers = document.getElementById("file-list-others");

            // Reset UI
            const existingFiles = fileListOthers.querySelectorAll("div");
            if (existingFiles) {
              existingFiles.forEach((file) => file.remove());
              // fileListOthers.textContent = "No files uploaded yet.";
            }

            // Populate "file-list" and "file-list-others" elements
            if (data.files.length > 0) {
              data.files.forEach((file) => {
                createFileEntry(file, fileListOthers, true, userRole);
              });
            } else {
              const noFilesMessage = document.createElement("p");
              noFilesMessage.textContent = "No files uploaded yet.";
              fileListOthers.appendChild(noFilesMessage);
            }
          } else {
            console.error("Failed to fetch files:", data.message);
          }
        } else {
          console.error("HTTP Error:", response.status);
        }
      } else {
        console.error("Failed to fetch user data:", userData.message);
      }
    } else {
      console.error("HTTP Error:", userDataResponse.status);
    }
  } catch (error) {
    console.error("Network error occurred:", error.message);
  }
};

// Get username for Welcome Message
const getUsername = async () => {
  try {
    const response = await fetch(`${siteURL}api/get_user_data.php`);

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Welcome message
        const usernamePlaceholder = document.getElementById(
          "usernamePlaceholder"
        );
        usernamePlaceholder.textContent = data.username;
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

getUsername();
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
    alert("No file selected for upload");
  }
});

// Close the share dialog
const closeShareModal = document.querySelector(".modal__close-btn");
closeShareModal.addEventListener("click", () => {
  // const shareModal = document.querySelector(".modal");
  shareModal.close();
});
