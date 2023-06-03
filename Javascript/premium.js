document.addEventListener('DOMContentLoaded', () => {
    let nameuser;
    let premium = 0;
    loginload();
    window.addEventListener('resize', function () {
        checkScreenWidth();
    });
    checkScreenWidth();
    dangnhap();
    dangnhap1();
    document.getElementById('logout').addEventListener('click', () => {
        let login1 = 0;
        SharedData.setItem("login-data", JSON.stringify({ login: login1 }));
        SharedData.setItem("premium", JSON.stringify({ premium: login1 }));
        location.reload();
    });
    document.getElementById('logout1').addEventListener('click', () => {
        let login1 = 0;
        SharedData.setItem("login-data", JSON.stringify({ login: login1 }));
        SharedData.setItem("premium", JSON.stringify({ premium: login1 }));
        location.reload();
    });
    document.getElementById('pre-1-1-5').addEventListener('click', function () {
        document.getElementById('xemgoi').click();
    });
    document.getElementById('pre-1-1-4').addEventListener('click', function () {
        if (login == 1) {
            let thoigian;
            let check = 1;
            SharedData.setItem("premium", JSON.stringify({ check: check }));
            const giatien = document.getElementById('month-input');
            const giatienpremium = giatien.value;
            if (giatienpremium == 12) {
                thoigian = '1 năm';
            }
            else {
                if (giatienpremium == 1) {
                    thoigian = '1 tháng';
                }
                else {
                    thoigian = '3 tháng';
                }
            }
            const popupContainer = document.getElementById('popup-container');
            popupContainer.style.display = 'flex';
            document.getElementById('popup').innerHTML = 'Bạn đã đăng ký gói Premium ' + thoigian + ' thành công.';
            setTimeout(() => {
                popupContainer.style.display = 'none';
            }, 3000);
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 3100);
        }
        else {
            const popupContainer = document.getElementById('popup-container');
            popupContainer.style.display = 'flex';
            document.getElementById('popup').innerHTML = 'Bạn chưa đăng nhập!!';
            setTimeout(() => {
                popupContainer.style.display = 'none';
            }, 3000);
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 3100);
        }
    });
    function loginload() {
        const data = SharedData.getItem("login-data");
        if (data) {
            let login1 = JSON.parse(data).login;
            login = login1;

        }
        const data1 = SharedData.getItem("name-user");
        if (data1) {
            let nameuser1 = JSON.parse(data1).name;
            nameuser = nameuser1;
        }
        const data2 = SharedData.getItem("premium");
        if (data2) {
            let premium1 = JSON.parse(data2).check;
            if (premium1) {
                premium = premium1;
            }
            else {
                premium = 0;
            }
        }
    }
    function dangnhap() {
        if (login == 1) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('signup').style.display = 'none';
            checkScreenWidth();
            document.getElementById('nameuser').innerHTML = nameuser;
        }
        if (premium == 1) {
            document.getElementById('user').style.background = 'linear-gradient(to right,gold,white,gold,white,gold)';
            document.getElementById('user').style.backgroundColor = 'none';
            document.getElementById('nameuser').style.color = 'black';
        }
    }
    function checkScreenWidth() {
        var screenWidth = window.innerWidth;

        if (screenWidth <= 900) {
            document.getElementById('user').style.display = 'none'; // ẩn hiển thị phần tử
        } else {
            if (login == 1) {
                document.getElementById('user').style.display = 'block'; // hiển thị phần tử
            }
        }
    }
    function dangnhap1() {
        if (login == 1) {
            document.getElementById('loginres').style.display = 'none';
            document.getElementById('signupres').style.display = 'none';
            document.getElementById('userres').style.display = 'block';
            document.getElementById('logout1').style.display = 'block';
            document.getElementById('mameuserres').innerHTML = nameuser;
        }
    }
});