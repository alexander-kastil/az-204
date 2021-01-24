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
  const sas = "api/PatientRecord/" + name;
  console.log("calling with SAS:", sas);

  $.get(sas).then((data) => console.log(data));
}
