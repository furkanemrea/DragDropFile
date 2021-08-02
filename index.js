const dropArea=document.querySelector('.dropArea');
const dropInformation=document.querySelector(".info-message");
const fileObject = [
    {
       fileFormat:"x-zip-compressed",imageUrl:"/img/winrar.jpg",extension:"Zip"
    },
    {
       fileFormat:"png",extension:"PNG"
    }
]


dropArea.addEventListener('dragover',(e)=>{
    e.preventDefault();
    e.target.classList.add('over');
});

dropArea.addEventListener('dragleave',(e)=>{
    e.target.classList.remove('over');
});


dropArea.addEventListener('drop',(e)=>{
    e.preventDefault();
    let file=e.dataTransfer.files[0];
    let fileReader=new FileReader();




    fileReader.onload=(result)=>{
        let img=`<img src="" class="dropFile">`
        dropArea.innerHTML=img;

        const imgElement=dropArea.querySelector("img");

        //fileFormat is not a fileExtension , fileExtension is different
        let fileFormat=result.target.result.split("/")[1].split(";")[0];
        let relatedFile=fileObject.find(x=>x.fileFormat==fileFormat);

        if (!relatedFile) {
            imgElement.setAttribute("src","img/forbidden.png");
            dropInformation.innerHTML=`İlgili dosyayı zip olarak yükleyebilirsiniz ! `;
            dropInformation.style.display="block";
            return;
        }
        let selectedExtensionName=relatedFile.extension;
        switch (selectedExtensionName) {
            case "Zip":
                imgElement.setAttribute("src",relatedFile.imageUrl);     
                break;
            default:
                imgElement.setAttribute("src",result.target.result);
                break;
        }
        dropInformation.innerHTML=`${selectedExtensionName} dosyası yüklenmek için hazır ! `;
        dropInformation.style.display="block";
    };
    fileReader.readAsDataURL(file);
});




// function insertAfter(referenceNode, newNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }
// var informationSpan=document.createElement("span");
// informationSpan.innerHTML=`<span class="drop-info-area">${fileFormat}</span>`;
// insertAfter(dropArea,informationSpan);