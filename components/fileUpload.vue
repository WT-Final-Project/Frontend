<template>
  <div 
    class="upload-area"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @click="triggerFileInput"
  >
    <p>Drag and Drop Files Here or Click to Upload</p>
    <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" multiple />
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onDragOver(event) {
      event.target.classList.add('hover');
    },
    onDragLeave(event) {
      event.target.classList.remove('hover');
    },
    onDrop(event) {
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    },
    onFileChange(event) {
      const files = event.target.files;
      this.handleFiles(files);
    },
    handleFiles(files) {
      for (let file of files) {
        console.log(`Uploaded file: ${file.name}`);
      }
      alert(`${files.length} file(s) uploaded successfully!`);
    },
  },
};
</script>

<style scoped>
.upload-area {
  width: 300px;
  height: 200px;
  border: 2px dashed #007bff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e9ecef;
  cursor: pointer;
  margin: 10px 0;
}

.upload-area.hover {
  background-color: #d4edda;
  border-color: #28a745;
}
</style>
