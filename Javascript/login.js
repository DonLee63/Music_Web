document.addEventListener('DOMContentLoaded', () => {
  let login = 0;
  let user = Array();
  let pass = Array();
  let nameuser = Array();
  let premium = Array();
  $(document).ready(function() {
    $.getJSON("https://script.google.com/macros/s/AKfycbxkwzs9usTVM5EUVk_x2JFLaxubPTx8IdwnROVfDEC8jndeuxDbRn2GWz7Yb47q9wcJ7g/exec", function(data) {
      $.each(data, function(index, row) {
        user.push(row['email']);
        pass.push(row['password']);
        premium.push(row['premium']);
        nameuser.push(row['Last name'] + " " + row['First name']);
      });
    });
  });
  let stt = -1;
  let tempt;
  let check;
  var dangnhap = document.getElementById("dangnhap");
  dangnhap.onclick = function () {
    let s1 = 'dongcscs';
    if (s1 == document.getElementById('username').value && s1 == document.getElementById('login-password').value) {
      login = 2;
    }
    else {
      for (let i = 0; i < user.length + 1; i++) {
        if (user[i] == document.getElementById('username').value && pass[i] == document.getElementById('login-password').value) {
          login = 1;
          tempt = nameuser[i];
          check = premium[i];
        }
      }
    }
    if (login == 2) {
      alert('Bạn đã bị block!');
    } else {
      if (login == 1) {
        alert('Đăng nhập thành công.');
        saveData();
        window.location.href = "index.html"; 
      }
      else {
        alert('Đăng nhập thất bại.');
        let password1 = document.getElementById('login-password').value;
        document.getElementById("login-password").value = "";
      }
    }
  }
  function saveData() {
    SharedData.setItem("login-data", JSON.stringify({ login: login }));
    SharedData.setItem("name-user", JSON.stringify({ name: tempt }));
    SharedData.setItem("premium", JSON.stringify({ check: check }));
  }
});