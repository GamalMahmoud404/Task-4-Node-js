
const myMenuButton = document.querySelector("#myMenuButton");
const menuApp = document.querySelector("#menuApp");
const closeMenu = document.querySelector("#closeMenu");

myMenuButton.addEventListener('click', function () {
  menuApp.classList.toggle('d-none');
  menuApp.classList.toggle('d-block');
});

closeMenu.addEventListener('click', function () {
  menuApp.classList.toggle('d-none');
  menuApp.classList.toggle('d-block');
})

// ------ handel form data  -------------------------------------------------

const allform = document.querySelector("#allform")
const errorp = document.querySelector("#error")
const country = document.querySelector("#country")
const longtitude = document.querySelector("#longtitude")
const latitude = document.querySelector("#latitude")
const Current = document.querySelector("#Current")
const temp = document.querySelector("#temp")
const formbody = document.querySelector("#formBody")

allform.addEventListener("submit", (e) => {
  e.preventDefault()
  weatherFunction()
  allform.reset()
})

var weatherFunction = async () => {
  try {
    const address = document.querySelector("#mySddress").value
    const res = await fetch("http://localhost:3000/weather?address=" + address)
    const allData = await res.json()
    console.log(allData)

    errorp.innerHTML = ""
    country.innerHTML = ""
    longtitude.innerHTML = ""
    latitude.innerHTML = ""
    Current.innerHTML = ""
    temp.innerHTML = ""

    if (allData.error) {
      errorp.innerHTML = `<p class="p-temp-a">` + "Error :" + `</p>` + `<p class="p-temp-v">` + allData.error + `</p>`
    } else {
      country.innerHTML = `<p class="p-temp-a">` + "Country :" + `</p>` + `<p class="p-temp-v">` + allData.country + `</p>`
      setTimeout(() => {
        longtitude.innerHTML = `<p class="p-temp-a">` + "Longitude :" + `</p>` + `<p class="p-temp-v">` + allData.longtitude.toFixed(3) + `</p>`
      }, "500");
      setTimeout(() => {
        latitude.innerHTML = `<p class="p-temp-a">` + "Latitude :" + `</p>` + `<p class="p-temp-v">` + allData.latitude.toFixed(3) + `</p>`
      }, "1000");
      setTimeout(() => {
        Current.innerHTML = `<p class="p-temp-a">` + "Current weather :" + `</p>` + `<p class="p-temp-v">` + allData.condition + `</p>`
      }, "1500");
      setTimeout(() => {
        temp.innerHTML = `<p class="p-temp-a">` + "Temperature :" + `</p>` + `<p class="p-temp-v">` + allData.temp + " °c" + `</p>`
      }, "2000");
    }
  } catch (e) {
    console.log(e)
  }
}




