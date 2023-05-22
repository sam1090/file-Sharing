const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector("#browseBtn");
const fileInput = document.querySelector("#fileInput");
const host = "https://innshare.herokuapp.com/";
const uploadURL = `${host}api/files`;
// const uploadURL = `${host}api/files`;

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!dropZone.classList.contains("dragged")) {
    dropZone.classList.add("dragged");
  }
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragged");
});
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragged");
  const droppedFiles = e.dataTransfer.files;

  // console.log(droppedFiles);

  if (droppedFiles.length) {
    fileInput.files = droppedFiles;
    uploadFile();
  }
});

fileInput.addEventListener("change" , ()=>{
  uploadFile();
})

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

const uploadFile = () => {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("myfile", file);

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
  };

  xhr.open("POST", uploadURL);
  xhr.send(formData);
};
