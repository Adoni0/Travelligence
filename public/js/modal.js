$(document).ready(() => {
  // const launchModal = () => {
  //   const modalEl = $('<div id="result-modal" class="modal">')
  //   const titleEl = $('<h2 class="modal-header">')
  //   titleEl.text('Your Next Travel Destination')
  //   const titleIcon = $('<ion-icon name="navigate">')
  //   titleEl.prepend(titleIcon)
  //   const nameEl = $('<p class="modal-name">')
  //   nameEl.text(countryData.countryName)
  //   const imgEl = $('<img class="modal-photo">')
  //   imgEl.attr('src', countryData.countryImage)
  //   const closeBtnEl = $('<button class="btn btn-close modal-close">')
  //   closeBtnEl.text('Close')
  //   const closeIconEl = $('<ion-icon name="close-circle" class="close-icon modal-close">')
  //   modalEl.append(titleEl, nameEl, imgEl, closeBtnEl, closeIconEl)
  //   const darkBgEl = $('<div class="dark-bg modal-close">')
  //   $('body').append(modalEl, darkBgEl)
  // }

  $(document).on('click', '.modal-close', function () {
    $('#result-modal').remove()
    $('.dark-bg').remove()
  })
})
