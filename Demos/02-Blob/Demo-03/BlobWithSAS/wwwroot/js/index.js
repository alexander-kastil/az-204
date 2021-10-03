function getRecords() {
  $.get(
    "api/PatientRecords",
    function (data) {
      $("#result").empty();
      $.each(data, function (i, v) {
        $("#result").html(
          `${$("#result").html()}<p onclick='getBlobSAS("${
            v.name
          }")' style='cursor:pointer'>${v.name}<p/>`
        );
      });
      $("#result").addClass("alert alert-success");
    },
    "json"
  );
}

function getBlobSAS(name) {
  const qry = "api/PatientRecords/" + name;
  console.log("Requesting SAS from Api:", qry);

  $.get(qry).then((data) => {
    console.log("SAS for Blob", data);
    const url = data.imageURI + data.sasToken;
    console.log("Full SAS for Blob", url);
  });
}
