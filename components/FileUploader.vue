<template>
  <div class="file-uploader">
    <p>Drag and drop your file here or click to select a file.</p>
    <div
      class="dropzone"
      @click="triggerFileInput"
      @dragover.prevent="highlightDropzone"
      @dragleave="resetDropzone"
      @drop="handleDrop"
    >
      <p>Drag and drop a file here</p>
      <input ref="fileInput" type="file" hidden @change="handleFileInput" />
    </div>
    <div class="status">{{ statusMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define props
const props = defineProps({
  taskId: {
    required: true,
  },
});

const fileInput = ref(null);
const statusMessage = ref("");

const triggerFileInput = () => {
  fileInput.value.click();
};

const highlightDropzone = (event) => {
  event.target.style.backgroundColor = "#B2C9AD";
};

const resetDropzone = (event) => {
  event.target.style.backgroundColor = "#fff";
};

const handleDrop = async (event) => {
  event.preventDefault();
  resetDropzone(event);
  const file = event.dataTransfer.files[0];
  if (file) {
    await handleFileUpload(file);
  }
};

const handleFileInput = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await handleFileUpload(file);
  }
};

const handleFileUpload = async (file) => {
  if (!props.taskId) {
    statusMessage.value = "Task ID is required!";
    return;
  }

  try {
    await uploadFile(file, props.taskId);
    statusMessage.value = "File uploaded successfully!";

    window.location.reload();
  } catch (err) {
    statusMessage.value = `Error uploading file: ${err.message}`;
  }
};

const uploadFile = async (file, taskId) => {
  try {
    const formData = new FormData();
    formData.append("fileContent", file);
    formData.append("taskId", taskId);

    const response = await fetch("http://localhost:3001/file/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Unknown error");
    }

    console.log("File uploaded successfully!");
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};
</script>

<style scoped>
.file-uploader {
  text-align: center;
}

.dropzone {
  border: 2px dashed #4b5945;
  padding: 30px;
  width: 80%;
  max-width: 500px;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropzone:hover {
  background-color: #b2c9ad;
}

.dropzone p {
  margin: 0;
  font-size: 18px;
  color: #4b5945;
}

.status {
  margin-top: 20px;
  font-size: 16px;
  color: #4b5945;
}
</style>
