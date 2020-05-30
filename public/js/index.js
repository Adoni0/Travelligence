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
    // Get file data
    const fileDataArr = e.target.files
    for (const fileData of fileDataArr) {
      // If it's not an image file, stop
      if (!fileData.type.match('image.*')) {
        alert('Please choose only image files!!')
        return
      }

      // Read a file with FileReader Obj
      const reader = new FileReader()
      // Success reading the file
      reader.onload = () => {
        // Render the image on browser
        const img = document.createElement('img')
        img.src = reader.result
        uploadedImages.appendChild(img)
      }

      console.log(fileData)
      console.log(fileData.size)

      fileSizeArr.push(fileData.size)

      // Execute reading file as data url
      reader.readAsDataURL(fileData)
    }
  }

  // Run loadLocalImage() on change event of inputFiles
  inputFiles.addEventListener('change', loadLocalImage, false)

  createGallery()

  // $('#form-submit').on('click', (event) => {
  //   // event.preventDefault()

  //   // Form validation
  //   const validateForm = () => {
  //     let isValid = true

  //     if ($('#name').val() === '') {
  //       isValid = false
  //       console.log('name error!!!')
  //       createErrorMsg('Please enter your first name!!')
  //     }

  //     if ($('#interests-images').val() === '') {
  //       isValid = false
  //       console.log('image error!!!')
  //       createErrorMsg('Please choose at least one image!!')
  //     }

  //     for (const size of fileSizeArr) {
  //       if (size >= 4000000) {
  //         isValid = false
  //         createErrorMsg('Please choose only images smaller than 4MB!!')
  //         break
  //       }
  //     }

  //     if (!isValid) {
  //       $('#form-section').prepend($errorMsg)
  //     }

  //     return isValid
  //   }

  //   if (validateForm()) {
  //     const countryData = {
  //       name: 'Test Country',
  //       image: '/images/countries/sri-lanka.jpg'
  //     }

  //     // console.log(data);

  //     // $.post('/', countryData)
  //     //   .then((data) => {
  //     //     const modalEl = $('<div id="result-modal" class="modal">')
  //     //     const titleEl = $('<h2 class="modal-header">')
  //     //     titleEl.text('Your Next Travel Destination')
  //     //     const titleIcon = $('<ion-icon name="navigate">')
  //     //     titleEl.prepend(titleIcon)
  //     //     const nameEl = $('<p class="modal-name">')
  //     //     nameEl.text(data.name)
  //     //     const imgEl = $('<img class="modal-photo">')
  //     //     imgEl.attr('src', data.image)
  //     //     const closeBtnEl = $('<button class="btn btn-close modal-close">')
  //     //     closeBtnEl.text('Close')
  //     //     const closeIconEl = $('<ion-icon name="close-circle" class="close-icon modal-close">')
  //     //     modalEl.append(titleEl, nameEl, imgEl, closeBtnEl, closeIconEl)
  //     //     const darkBgEl = $('<div class="dark-bg modal-close">')
  //     //     $('.container').append(modalEl, darkBgEl)
  //     //   })
  //   } else {
  //     alert('Please check the error messages!!')
  //   }
  // })

  $(document).on('click', '.modal-close', function () {
    $('#result-modal').remove()
    $('.dark-bg').remove()
  })
})
