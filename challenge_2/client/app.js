$(() => {
  const $btn = $('button');

  $btn.on('click', (e) => {
    // debugger;
    console.log('clicked');
    handleClick();
  })

  // set up a jQuery ajax call to trigger on button click
  // does this need to be enctype=multipart/form-data

  function handleClick() {

    // get a reference to the File the user uploaded
    const file = $('#jsonFile').get(0).files[0];

    // debugger;
    // TODO: is it better to process the file into JSON on the client, or send the file to the server as binary data?

    file.text()
      .then((fileAsJSONString) => {
        makeAjaxRequest(fileAsJSONString);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(data);
      },
      error: (jqXHR, textStatus, error) => {
        console.log(error);
      }
    });
  }
});

