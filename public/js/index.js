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
})
