<template>
  <div class="file-visualizer">
    <div v-if="files.length > 0" class="card-column">
      <div
        v-for="file in files"
        :key="file.fileid"
        class="card"
        @click="redirectToUrl(file.signedUrl)"
      >
        <p>{{ file.name }}</p>
        <span class="delete-icon" @click.stop="deleteFile(file.fileid)"
          >&#10006;</span
        >
      </div>
    </div>
    <div v-else>
      <p>No files available for this task.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  taskId: {
    required: true,
  },
});

const files = ref([]);

const fetchFiles = async () => {
  try {
    const response = await fetch(`http://localhost:3001/file/${props.taskId}`);
    const result = await response.json();
    if (response.ok) {
      files.value = result.data || [];
    } else {
      console.error("Error fetching files:", result.error);
    }
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

const deleteFile = async (fileId) => {
  try {
    const response = await fetch(`http://localhost:3001/file/${fileId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove the deleted file from the list
      files.value = files.value.filter((file) => file.fileid !== fileId);
    } else {
      const result = await response.json();
      alert(`Error deleting file: ${result.error}`);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    alert("An error occurred while deleting the file.");
  }
};

const redirectToUrl = (url) => {
  if (url) {
    window.open(url, "_blank");
  } else {
    alert("Signed URL is unavailable for this file.");
  }
};

// Fetch files on mount and when taskId changes
onMounted(fetchFiles);
watch(() => props.taskId, fetchFiles);
</script>

<style scoped>
.file-visualizer {
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.card-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.card {
  border: 1px solid #d17c01;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  position: relative;
}

.card:hover {
  background-color: #f7a631;
  transform: scale(1.02);
}

.card p {
  margin: 0;
  font-size: 16px;
  color: #d17c01;
  word-wrap: break-word;
}

.delete-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #d17c01;
  cursor: pointer;
  transition: color 0.3s ease;
}

.delete-icon:hover {
  color: red;
}
</style>
