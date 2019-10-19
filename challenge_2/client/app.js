$(() => {
  const $ajaxBtn = $('#ajax-btn');
  const $formBtn = $('#form-btn');
  const $csv = $('#csv');
  const $downloadCSV = $('#download-csv');
  const $changeBtn = $('#change-btn');
  const $deleteDataBtn = $('#data-delete-btn');
  const $dragDrop = $('#drag-drop');

  let file = null;

  // MODEL
  function handleClick() {

    // user drag 'n dropped a file
    if (file !== null) {
      makeAjaxRequest(file);

    // user typed JSON into the textarea
    } else if (jsonText !== '') {
      const file = null;
      const jsonText = $('#jsonText').val();
      makeAjaxRequest($(`#jsonText`).val());

    // user used the file picker
    } else {
      // get a reference to the File the user uploaded
      const file = $(`#jsonFile`).get(0).files[0];

      // TODO: is it better to process the file into JSON on the client, or send the file to the server as binary data?
      file.text()
      .then((fileAsJSONString) => {
        makeAjaxRequest(fileAsJSONString);
      })
      .catch((err) => {
        console.log(err); // TODO: better error handling
      });
    }


  };

  function removeFile() {
    file = null;
  }

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
        removeFile();
      },
      error: (jqXHR, textStatus, error) => {
        console.log(error); // TODO: better error handling
        removeFile();
      }
    });
  }

  function createFile(data) {
    // debugger;
    let shouldHide = false;
    let fileURL = null;

    if (data === '') {
      shouldHide = true;
    }

    // generate a file from the string in JS using File()
    const file = new File([data], 'data.csv', {
      type: 'application/json'
    });

    // create a URL to that file using URL.createObjectURL()
    fileURL = URL.createObjectURL(file);
    updateDownloadButton(fileURL, shouldHide);
    updateDeleteDataButton(shouldHide);
  }

  function clearCSV() {
    $csv.text('');
    updateDownloadButton('', true);
    updateDeleteDataButton(true);
  }

  // invoke createFile on page load , ie, if the user got their data through a form submission
  createFile($('#csv').text());

  // CONTROLLER
  $ajaxBtn.on('click', (e) => {
    handleClick();
  });

  $changeBtn.on('click', (e) => {
    $ajaxBtn.toggle();
    $formBtn.toggle();
  });

  $deleteDataBtn.on('click', (e) => {
    clearCSV();
  });

  // TODO: is there a way to handle these with jQuery functions instead of vanilla js?
  // $dragDrop.on('ondrop', (e) => {
  //   updateDragDrop(e);
  // });

  document.querySelector('#drag-drop').addEventListener('dragover', (e) => {
    e.preventDefault(); // TODO: why is preventDefault() on the dragover event necessary to get the event handler on the drop event to fire??
  });

  document.querySelector('#drag-drop').addEventListener('drop', updateDragDrop);

  // VIEW
  function updateCSV(csv) {
    $csv.text(csv);
  }

  function updateDownloadButton(fileURL, shouldHide) {
    // debugger;
    if (shouldHide) {
      $downloadCSV.attr({ style: `display: none` });
    } else {
      $downloadCSV.attr({ style: `display: inline` });
      // set that fileURL to be the value of the href attribute on the <a> tag
      $downloadCSV.attr({ href: fileURL});
    }
  }

  function updateDeleteDataButton(shouldHide) {
    if (shouldHide) {
      $deleteDataBtn.attr({ style: `display: none` });
    } else {
      $deleteDataBtn.attr({ style: `display: inline-block` });
    }

  }

  function updateDragDrop(e) {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    console.log(e.dataTransfer);
  }
});
