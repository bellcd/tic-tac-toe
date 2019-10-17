// TODO: confirm whether we're supposed to create a file on the server and send that file back, OR can we send the csv formatted data back as a string??

$(() => {
  const $btn = $('button');
  const $csv = $('#csv');
  const $downloadCSV = $('#download-csv');

  // MODEL
  function handleClick() {
    // get a reference to the File the user uploaded
    const file = $('#jsonFile').get(0).files[0];

    // TODO: is it better to process the file into JSON on the client, or send the file to the server as binary data?
    file.text()
      .then((fileAsJSONString) => {
        makeAjaxRequest(fileAsJSONString);
      })
      .catch((err) => {
        console.log(err); // TODO: better error handling
      });
  };

  function makeAjaxRequest(file) {
    $.ajax({
      url: `http://127.0.0.1:3000/json`,
      method: 'POST',
      contentType: 'application/json',
      data: file,
      processData: false,
      success: (data, status, jqXHR) => {
        updateCSV(data);
        createFile(data);
      },
      error: (jqXHR, textStatus, error) => {
        console.log(error); // TODO: better error handling
      }
    });
  }

  function createFile(data) {
    // generate a file from the string in JS using File()
    const file = new File([data], 'data.csv', {
      type: 'application/json'
    });

    // create a URL to that file using URL.createObjectURL()
    const fileURL = URL.createObjectURL(file);
    updateDownloadButton(fileURL);
  }

  // CONTROLLER
  $btn.on('click', (e) => {
    handleClick();
  })

  // VIEW
  function updateCSV(csv) {
    $csv.text(csv);
  }

  function updateDownloadButton(fileURL) {
    // set that fileURL to be the value of the href attribute on the <a> tag
    $downloadCSV.attr({ href: fileURL});
  }
});


// revoke the object url after download by
  // listening for the downloads.onChanged event
  // calling URL.revokeObjectURL()
