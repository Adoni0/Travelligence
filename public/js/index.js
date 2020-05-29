$(document).ready(() => {
  const createGallery = () => {
    const gallery = document.getElementById('gallery')
    const fadeComplete = (e) => { gallery.appendChild(imgArr[0]) }
    const imgArr = gallery.getElementsByClassName('gallery-image')
    for (const img of imgArr) {
      img.addEventListener('animationend', fadeComplete, false)
    }
  }

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
      const $errorMsg = $('<ul id="error-messages">')

      if ($('#name').val() === '') {
        const $errorIcon = $('<ion-icon name="checkmark-circle">')
        isValid = false
        console.log('name error!!!')
        const $nameError = $('<li>')
        $nameError.text('Please enter your first name!!')
        $nameError.prepend($errorIcon)
        $errorMsg.append($nameError)
      }

      if ($('#interests-images').val() === '') {
        const $errorIcon = $('<ion-icon name="checkmark-circle">')
        isValid = false
        console.log('image error!!!')
        const $imgError = $('<li>')
        $imgError.text('Please choose at least one image!!')
        $imgError.prepend($errorIcon)
        $errorMsg.append($imgError)
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
