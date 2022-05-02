async function getRecords() {
  axios.get("api/PatientRecords").then(response=>{
    let div = document.getElementById("result");
    if (div) {
      div.innerHTML = "";
      for (const item of response.data) {
        div.insertAdjacentHTML('afterend',`${$("#result").html()}<div onclick='getBlobSAS("${
          item.name
        }")' style='cursor:pointer; margin:1rem;text-decoration:underline'>${item.name}<div/>`)
      }      
    }
  })
}

function getBlobSAS(name) {
  const qry = "api/PatientRecords/" + name;
  axios.get(qry).then((resp) => {
    const url = resp.data.imageURI + resp.data.sasToken;
    var div = document.querySelector('#sasToken');
    if(div){
      div.innerHTML=url;
    }
  });
}
