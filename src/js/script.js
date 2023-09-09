// Handle File Upload

const uploadButton = document.querySelector('[data-action="upload"]');
const fileInput = document.querySelector('[type="file"]');
const progressBar = document.querySelector('[data-progress="bar"]');
const progressText = document.querySelector('[data-progress="text"]');
const progressContainer = document.querySelector('[data-container="progress"]');

uploadButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData);
      if (response.success) {
        // Handle successful upload, e.g., display a success message
        console.log("File uploaded successfully");
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

async function uploadFile(formData) {
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
      return data;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Network error occurred");
  }
}
