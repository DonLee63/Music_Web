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
    premiumcheck();
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
    copy();
    function copy() {
        // Lặp qua 75 phần tử và tạo mới các phần tử HTML tương ứng
        for (let i = 2; i <= 75; i++) {
            // Tạo phần tử div mới
            const newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'popular-music1');
            newDiv.setAttribute('id', `s${i}`);

            // Sao chép nội dung phần tử HTML ban đầu vào phần tử div mới
            const pre3 = document.getElementById('pre3');
            const originalSong = document.getElementById('s1');
            newDiv.innerHTML = originalSong.innerHTML;

            // Cập nhật các thông tin trong phần tử div mới
            const newBanner = newDiv.querySelector('#anhbanner1');
            newBanner.setAttribute('id', `anhbanner${i}`);
            const newName = newDiv.querySelector('#tenbaihat1');
            newName.setAttribute('id', `tenbaihat${i}`);
            const newArtist = newDiv.querySelector('#casi1');
            newArtist.setAttribute('id', `casi${i}`);

            // Chèn phần tử div mới vào phần tử HTML chứa các phần tử ban đầu
            pre3.appendChild(newDiv);
        }
        for (let i = 2; i <= 75; i++) {
            document.getElementById('anhbanner' + i).setAttribute("src", linkanh[i - 1]);
            document.getElementById('tenbaihat' + i).innerHTML = tieude[i - 1];
            document.getElementById('casi' + i).innerHTML = tacgia[i - 1];

        }
        for (let i = 1; i <= 75; i++) {
            document.getElementById('s' + i).addEventListener('click', () => {
                window.location.href = linkdownload[i - 1];
            });
        }
    }
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
    function premiumcheck() {
        if (premium == 1) { }
        else {

            // Lấy ra phần tử modal
            var modal = document.querySelector('.modal');
            // Lấy ra nút đóng modal
            var closeButton = document.querySelector('.close');
            // Hiển thị modal khi người dùng truy cập trang web
            window.onload = function () {
                modal.style.display = 'block';
            };
            // Đóng modal khi người dùng nhấn vào nút đóng
            closeButton.onclick = function () {
                modal.style.display = 'none';
                window.location.href = 'premium.html';
            };
            document.getElementById('pre3').remove();

        }
    }
});
