// const name = "Yuko";
const associatedCultures = []
console.log('navigator.languages: ' + navigator.languages)

$('#trip-form').on('submit', function (event) {
  event.preventDefault()
  const userInfo = {
    name: $('#user-name')
      .val()
      .trim()
  }

  $.ajax({
    url: `https://api.nationalize.io?name=${userInfo.name}`,
    method: 'GET'
  }).then(function (response) {
    console.log(response)
    for (const country of response.country) {
      if (country.country_id !== '') {
        associatedCultures.push(country.country_id)
      }
    }
    console.log(associatedCultures)
  })

  $.ajax('/lang-culture', {
    type: 'POST',
    data: userInfo
  }).then(data => {
    console.log(data)
  })
})
