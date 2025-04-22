import React, { useState, ChangeEvent, FormEvent } from 'react';

const ImageUploadTest: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];

    // Append new selected files to the existing files
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Generate previews and append to existing previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  // Handle form submission
  const handleImgUpload = async (event: FormEvent) => {
    event.preventDefault();

    if (selectedFiles.length === 0) {
      alert("Please select one or more images to upload");
      return;
    }

    try {
      // Create a FormData object and append all selected files
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file); // Ensure this matches backend expectations
      });

      // Send the fetch request with all the files
      const response = await fetch("http://localhost:3000/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Uploaded:", data);
        data.uploadResults.forEach((file: { imageName: string; imageUrl: string }) => {
          console.log(file);
        });
        alert("images uploaded");
        // toast.success("Files uploaded successfully!");
      } else {
        // Display error message
        // toast.error("File upload failed");
        throw new Error("Image upload failed");
        alert("Images failed")
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Images failed")
      // toast.error("An error occurred while uploading images");
    }
  };

  return (
    <div>
      <h1>Image Upload Test</h1>

      <form onSubmit={handleImgUpload}>
        <div>
          <label htmlFor="fileUpload">Upload Images:</label>
          <input
            type="file"
            id="fileUpload"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Image Previews */}
      <div>
        {previews.length > 0 && (
          <div>
            <h2>Image Preview</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {previews.map((preview, index) => (
                <div key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadTest;


