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
      },
      error: (jqXHR, textStatus, error) => {
        console.log(error); // TODO: better error handling
      }
    });
  }

  function handleDownloadCSV() {
    // generate a file from the string in JS using File()
    const file = new File([$csv.text()], 'data.csv', {
      type: 'application/json'
    });

    // create a URL to that file using URL.createObjectURL()
    const fileURL = URL.createObjectURL(file);

    // download that URL using downloads.download()
    browser.downloads.download(fileURL)
      .then(() => {
        console.log('download successfull');
      })
      .catch((err) => {
        console.log(err);
      })


      // revoke the object url after download by
        // listening for the downloads.onChanged event
        // calling URL.revokeObjectURL()
  }

  // CONTROLLER
  $btn.on('click', (e) => {
    handleClick();
  })

  $downloadCSV.on('click', (e) => {
    handleDownloadCSV();
  })

  // VIEW
  function updateCSV(csv) {
    $csv.text(csv);
  }
});

