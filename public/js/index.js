$(document).ready(() => {
  const createGallery = () => {
    const gallery = document.getElementById('gallery')
    const fadeComplete = (e) => { gallery.appendChild(imgArr[0]) }
    const imgArr = gallery.getElementsByClassName('gallery-image')
    for (const img of imgArr) {
      img.addEventListener('animationend', fadeComplete, false)
    }
  }

  const inputFiles = document.getElementById('interests-images')
  const uploadedImages = document.getElementById('uploaded-images')
  const $errorMsg = $('<ul id="error-messages">')
  const fileSizeArr = []

  const createErrorMsg = msg => {
    const $errorIcon = $('<ion-icon name="checkmark-circle">')
    const $nameError = $('<li>')
    $nameError.text(msg)
    $nameError.prepend($errorIcon)
    $errorMsg.append($nameError)
  }

  const loadLocalImage = (e) => {
    // ファイル情報を取得
    var fileData = e.target.files[0]

    // 画像ファイル以外は処理を止める
    if (!fileData.type.match('image.*')) {
      alert('画像を選択してください')
      return
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    const reader = new FileReader()
    // ファイル読み込みに成功したときの処理
    reader.onload = () => {
      // ブラウザ上に画像を表示する
      const img = document.createElement('img')
      img.src = reader.result
      uploadedImages.appendChild(img)
    }

    console.log(fileData)
    console.log(fileData.size)

    fileSizeArr.push(fileData.size)

    // ファイル読み込みを実行
    reader.readAsDataURL(fileData)
  }

  // ファイルが指定された時にloadLocalImage()を実行
  inputFiles.addEventListener('change', loadLocalImage, false)

  createGallery()

  $('#form-submit').on('click', (event) => {
    event.preventDefault()

    // Form validation
    const validateForm = () => {
      let isValid = true
      // $('.form-control').each(function () {
      //   if ($(this).val() === '') {
      //     isValid = false
      //   }
      // })

      if ($('#name').val() === '') {
        isValid = false
        console.log('name error!!!')
        createErrorMsg('Please enter your first name!!')
      }

      if ($('#interests-images').val() === '') {
        isValid = false
        console.log('image error!!!')
        createErrorMsg('Please choose at least one image!!')
      }

      for (const size of fileSizeArr) {
        if (size >= 4000000) {
          isValid = false
          createErrorMsg('Please choose only images smaller than 4MB!!')
          break
        }
      }

      // $('.chosen-select').each(function () {
      //   if ($(this).val() === '') {
      //     isValid = false
      //   }
      // })
      console.log('=====interests-images val=======')
      console.log($('#interests-images').val())

      if (!isValid) {
        $('#form-section').prepend($errorMsg)
      }

      return isValid
    }

    if (validateForm()) {
      const newFriend = {
        name: $('#name-input').val().trim(),
        photo: $('#image-input').val().trim(),
        scores: [
          $('#q1').val(),
          $('#q2').val(),
          $('#q3').val(),
          $('#q4').val(),
          $('#q5').val(),
          $('#q6').val(),
          $('#q7').val(),
          $('#q8').val(),
          $('#q9').val(),
          $('#q10').val()
        ]
      }

      // console.log(data);

      $.post('/api/friends', newFriend)
        .then((data) => {
          const modalEl = $('<div id="best-match-modal" class="modal">')
          const titleEl = $('<h2>')
          titleEl.text('Best Match')
          const nameEl = $('<p class="modal-name">')
          nameEl.text(data.name)
          const imgEl = $('<img class="modal-photo">')
          imgEl.attr('src', data.photo)
          const closeBtnEl = $('<button class="btn btn-grey modal-close">')
          closeBtnEl.text('Close')
          const closeIconEl = $('<ion-icon name="close-circle" class="close-icon modal-close">')
          modalEl.append(titleEl, nameEl, imgEl, closeBtnEl, closeIconEl)
          const darkBgEl = $('<div class="dark-bg modal-close">')
          $('.container').append(modalEl, darkBgEl)
        })
    } else {
      alert('Please fill out all fields before submitting!')
    }
  })

  $(document).on('click', '.modal-close', function () {
    $('#best-match-modal').remove()
    $('.dark-bg').remove()
  })
})
