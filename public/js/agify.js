// const userAges = [];

$('#trip-form').on('submit', function (event) {
  event.preventDefault()
  const userInfo = {
    name: $('#user-name')
      .val()
      .trim()
  }

  $.ajax({
    url: `https://api.agify.io?name=${userInfo.name}`,
    method: 'GET'
  }).then(function (response) {
    console.log(response.age)
    //   if (response.age !== '') {
    //     userAges.push(response.age)
    //   };
  })

  $.ajax('/agify', {
    method: 'POST',
    data: userInfo
  }).then(data => {
    console.log(data)
  })
})
