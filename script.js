const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  arrowBack = wrapper.querySelector("header i");

let api;

//PLEASE PUT YOUR API KEY HERE
let apiKey = "92ccd5c286601370fddb985fb8533b84";

inputField.addEventListener("keyup", (e) => {
  // if user pressed enter btn and input value is not empty
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    // if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords; // getting lat and lon of the user device from coords obj
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  // if any error occur while getting user location then we'll show it in infoText
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  // getting api response and returning it with parsing into js obj and in another
  // then function calling weatherDetails function with passing api result as an argument
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Something went wrong";
      infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  if (info.cod == "404") {
    // if user entered city name isn't valid
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    //getting required properties value from the whole weather information
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    // using custom weather icon according to the id which api gives to us
    if (id == 800) {
      wIcon.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBzu3htXenGy7AnOe7aX_h9Mk_Agz7SFA9QbBGNY6pHghitt6wW2HIJrXaD5wPdhJiPqnexs5sR1vZ8jI7uSUILH26aAM6J5y05FLJKkgkMQTIHgWZqYwv2F2tAijRPmV8aEKqDjn327PPPvxq9bNguhaGAu6tDKAs0NN-63oOFw4MASZ8XT2-cwIH76U/s496/clear.png";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8ku5-0Eux_pX6Hk9D-vkk8CxmTd8W8kUyXZsZ13ti45dIcl6T-2AVQhM2wJNRNGGMkeguqV-lb4kqVkz4vumoRJeBvOHDPzcGHcxKg4iygWX2ES2O9maYt2sZ4hSlB5CKS04B6zRRaZfcsje0ljVswGwv0Qugafcw4LK9DThPDxmG2yATrqmJKN4ibTY/s72/storm.png";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgomi6EFknR7eSfyL2NZvb_RwNeEEvwm9hY_k91MdiElhYYQhOCUUrb3GLhBhpxW5bdghXNJRC5bKnF5ABiJ5CcNaR15NKk_TKPFTSbw4flViwAA_cOlXcTp2TJXQaDO94t7ryVFleqnY4gdWHNJ1EyEHEJN4B52r89Svhe64xzTpnTSpjqlu3IT4ujsCs/s300/snow.png";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjheRyk5Tj9fCjzSEA0TQnpDF1_aosMeqclSkbC-35mohIgdWsJERENVDiC8X2r9qYlg3NF7A_m5em8idHbJPt8wBZdCaZcc6dEO4ju3lmjFNW-2Sv6NtBYZCCeVmXZapFdqdJt5RUsvY19irL2O3bW7x-COXClIbfqYqW-tynkMCDE4TrU8v4Ytk3tT1Y/s512/haze.png";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgs-yi14VMZ5pMuU265HsauVc8OU_tqsQ_MH4kez_gOSc2Lwn698h5YZXTDbpIs7k6yGrXiY_3FDiYsBZ8ULeT8YkEnKGIj34Zq5RV7Vd3VctqS0kszSNXeMjQTjuscrUJ-wCeL2Q59quDUw6yDDSCCAd9Lu5uQlqzk4mtTVGEjEMdPNjm6tMeSzXj3UUc/s362/cloud.png";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6Y9vCGCkYQo_Rokin2RWjDgWPDeIaVxQvgGGZ1vGzQ7gwqSROuUkWl7YyMudniwSOTu9xjxXjCf4OoiCckYxMbv5-KhShBjfVmG1EwTdxZSwnBui4qb2E3PL4_ZGtFbTQRTK5RdO9V37PZBO4G84iPHgL2SCgVS2FM6PgPXuqXrWA5IinFbcT4Mk-PJM/s512/rain.png";
    }

    //passing a particular weather info to a particular element
    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText =
      Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

//change color theme
//get the theme from local storage
getTheme();

//color palette
const colors = [
  "hsl(345, 80%, 50%)",
  "hsl(100, 80%, 50%)",
  "hsl(200, 80%, 50%)",
  "hsl(227, 66%, 55%)",
  "hsl(26, 80%, 50%)",
  "hsl(44, 90%, 51%)",
  "hsl(280, 100%, 65%)",
  "hsl(480, 100%, 25%)",
  "hsl(180, 100%, 25%)",
];

const colorBtns = document.querySelectorAll(".theme-color");
const darkModeBtn = document.querySelector(".dark-mode-btn");

//change theme to dark
var isDark = false;
darkModeBtn.addEventListener("click", () => {
  if(!isDark) {
    changeTheme("#000");
    isDark = true;
  }else{
    changeTheme(colors[3]);
    isDark = false;
  }
});

//loop through colors array and set each color to a button
for (let i = 0; i < colorBtns.length; i++) {
  colorBtns[i].style.backgroundColor = colors[i];
}

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeTheme(btn.style.backgroundColor);
  });
});

function changeTheme(color) {
  document.documentElement.style.setProperty("--primary-color", color);
  saveTheme(color);
}

//get the theme from local storage
function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    changeTheme(theme);
  }
}

//save the theme to local storage
function saveTheme(color) {
  localStorage.setItem("theme", color);
}

