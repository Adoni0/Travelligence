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

  $('#travel-form').on('submit', (event) => {
    event.preventDefault()
    // if ($errorMsg) {
    //   $errorMsg.remove()
    // }

    // Form validation
    const validateForm = () => {
      let isValid = true

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

      // if (!isValid) {
      //   $('#form-section').prepend($errorMsg)
      // }

      return isValid
    }

    if (validateForm()) {
      // Continue the form submit
      event.currentTarget.submit()
    } else {
      // alert('Please check the error messages!!')
      $('#form-section').prepend($errorMsg)
    }
  })
})
