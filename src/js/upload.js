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
      console.log(data);
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
