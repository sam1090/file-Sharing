const dropZone = document.querySelector('.drop-zone');
const browseBtn = document.querySelector('#browseBtn');
const fileInput = document.querySelector('#fileInput');
const bgProgress = document.querySelector('.bg-progress');
const percentDiv = document.querySelector('#progressPercent');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-container');
const sharingContainer = document.querySelector('.sharing-container');
const fileUrlInput = document.querySelector('#fileURL');
const copyBtn = document.querySelector('#copyURLBtn');
const emailForm = document.querySelector('#emailForm');
const host = 'http://localhost:3000/';
const uploadURL = `${host}api/files`;
// const uploadURL = `${host}api/files`;

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (!dropZone.classList.contains('dragged')) {
    dropZone.classList.add('dragged');
  }
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragged');
});
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragged');
  const droppedFiles = e.dataTransfer.files;

  // console.log(droppedFiles);

  if (droppedFiles.length) {
    fileInput.files = droppedFiles;
    uploadFile();
  }
});

fileInput.addEventListener('change', () => {
  uploadFile();
});

browseBtn.addEventListener('click', () => {
  fileInput.click();
});

copyBtn.addEventListener('click', () => {
  fileUrlInput.select();
  document.execCommand('copy');
});

const uploadFile = () => {
  progressContainer.style.display = 'block';
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('myfile', file);

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // console.log(xhr.response);
      showLink(JSON.parse(xhr.response));
    }
  };
  xhr.upload.onprogress = updateProgress;

  xhr.open('POST', uploadURL);
  xhr.send(formData);
};

//check this file after backend
const updateProgress = (e) => {
  const percent = Math.round((e.loaded / e.total) * 100);
  // console.log('percent', percent);
  bgProgress.style.width = `${percent}%`;
  percentDiv.innerText = percent;
  progressBar.style.transform = `scaleX(${percent / 100})`;
};

const showLink = ({ file }) => {
  console.log(file);
  progressContainer.style.display = 'none';
  sharingContainer.style.display = 'block';
  fileUrlInput.value = file;
};

emailForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Submit Form');
  const url = (fileUrlInput.value = file);
  const formData = {
    uuid: url.split("/").splice(-1,1)[0],
    emailTo: emailForm.elements["to-email"].value,
    emailFrom: emailForm.elements["from-email"].value,
  };
});
