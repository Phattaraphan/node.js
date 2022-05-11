"use strict";

var jwt = localStorage.getItem("jwt");

if (jwt == null) {
  window.location.href = './login.html';
}

function loadUser() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://www.mecallapi.com/api/auth/user");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      var objects = JSON.parse(this.responseText);

      if (objects["status"] == "ok") {
        var user = objects["user"];
        document.getElementById("fname").innerHTML = user["fname"];
        document.getElementById("avatar").src = user["avatar"];
        document.getElementById("username").innerHTML = user["username"];
      }
    }
  };
}

loadUser();

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = './login.html';
}