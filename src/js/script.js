// Handle File Upload

const uploadButton = document.querySelector("[upload-btn]");
const fileInput = document.querySelector("[file-input]");
// const progressBar = document.querySelector('[data-progress="bar"]');
// const progressText = document.querySelector('[data-progress="text"]');
// const progressContainer = document.querySelector('[data-container="progress"]');

// Upload File
const uploadFile = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost/file-sharing-app/upload.php",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Network error occurred");
  }
};

// Handle Upload Button
uploadButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0]; // The uploaded file as an object with useful info

  if (file) {
    const formData = new FormData();

    formData.append("file", file); // Creates an object with "file" as key and file as value

    try {
      const response = await uploadFile(formData);
      if (response.success) {
        // Handle successful upload, e.g., display a success message
        console.log("From upload.php: File uploaded successfully");
      } else {
        // Handle upload error, e.g., display an error message
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  } else {
    console.error("No file selected for upload");
  }
});
