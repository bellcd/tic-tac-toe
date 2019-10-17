$(() => {
  const $btn = $('button');
  const $csv = $('#csv');

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

  // CONTROLLER
  $btn.on('click', (e) => {
    handleClick();
  })

  // VIEW
  function updateCSV(csv) {
    $csv.text(csv);
  }
});

