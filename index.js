const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector("#browseBtn")
const fileInput = document.querySelector("#fileInput")

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  if(!dropZone.classList.contains("dragged"))
  {

    dropZone.classList.add("dragged");
  }

});

dropZone.addEventListener("dragleave" , ()=>{
  dropZone.classList.remove("dragged")
})
dropZone.addEventListener("drop" , (e)=>{
  e.preventDefault();
  dropZone.classList.remove("dragged");
  const droppedFiles = e.dataTransfer.files;

  console.log(droppedFiles);

  if(droppedFiles.length){
    fileInput.files = droppedFiles; 
  }

})

browseBtn.addEventListener("click", ()=>{
  fileInput.click();
})