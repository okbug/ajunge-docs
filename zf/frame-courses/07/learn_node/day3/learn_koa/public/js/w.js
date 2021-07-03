console.log(666)
btn.onclick = function () {
  fetch('/list').then(res => res.text()).then(data => {
    console.log(data)
  })
  // fetch('http://localhost:3000/list').then(res => res.json()).then(data => {
  //   console.log(data)
  // })
}
login.onclick = function () {
  fetch('/login', {
    method: "POST",
    body: JSON.stringify({ name: 123, age: 234 })
  }).then(res => res.text()).then(data => {
    console.log(data)
  })
  // fetch('http://localhost:3000/list').then(res => res.json()).then(data => {
  //   console.log(data)
  // })
}

// cors  