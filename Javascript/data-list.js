document.addEventListener('DOMContentLoaded', () => {
  let stt = 0;
  let playpause = 1;
  let yeuthich = Array();
  yeuthich[0] = 0;
  let nameuser;
  let premium = 0;
  loginload();
  window.addEventListener('resize', function () {
    checkScreenWidth();
  });
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
  anphantu();
  hienphantu(); 
  // sự kiện click vào các bài hát
  for (let i = 1; i <= 75; i++) {
    document.getElementById('s' + i).addEventListener('click', () => {
      clickplayer(i - 1);
    });
  }
  function clickplayer(interger) {
    document.getElementById('tieude').innerHTML = tieude[interger];
    document.getElementById('tacgia').innerHTML = tacgia[interger];
    phatnhacmoi(danhsach[interger]);
    document.getElementById('anh-tieu-de').src = linkanh[interger];
    const musicPlayer = document.querySelector('.music-player');
    musicPlayer.style.display = 'block'; // hiển thị phần tử
    stt = interger;
    favouritecheck();
    favouriteaction();
  }
  function amluong() {
    const volumeSlider = document.getElementById('volume-slider');
    // Lắng nghe sự kiện change của thanh kéo
    volumeSlider.addEventListener('change', () => {
      const volume = volumeSlider.value;
      audio.volume = volume;
    });
  }
  amluong();
  let chuoi = danhsach[stt];
  let audio = new Audio(chuoi);
  let isDragging = false;
  function progressbar() {
    audio.addEventListener('timeupdate', () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const progressPercent = (currentTime / duration) * 100;
      document.getElementById('progress-bar').style.width = `${progressPercent}%`;
      if (progressPercent == 100) {
        next();
      }
    });
    const progressBarContainer = document.getElementById('progress-bar-container');
    progressBarContainer.addEventListener('click', (e) => {
      const width = progressBarContainer.clientWidth
      const clickX = e.clientX - progressBarContainer.offsetLeft;
      const duration = audio.duration;
      const newPosition = (clickX / width) * duration;
      audio.currentTime = newPosition;
    });
  }
  function phatnhacmoi(url) {
    audio.src = url;
    audio.play();
    progressbar();
  }
  // Play the audio when the player is clicked
  document.getElementById('play-button').addEventListener('click', () => {
    playpause = playpause + 1;
    if (playpause % 2 == 1) {
      audio.play();
      let myImage = document.getElementById("play-pause-img");
      myImage.setAttribute("class", "ti-control-pause");
    }
    else {
      audio.pause();
      let myImage = document.getElementById("play-pause-img");
      myImage.setAttribute("class", "ti-control-play custom-class");
    }
  });
  // Pause the audio when the player is clicked again
  document.getElementById('foward-btn').addEventListener('click', () => {
    let time = audio.currentTime;
    time = time + 5;
    audio.currentTime = time;
  });
  document.getElementById('backward-btn').addEventListener('click', () => {
    let time = audio.currentTime;
    time = time - 5; e;
  });
  document.getElementById('next').addEventListener('click', () => {
    next();
    favouriteaction();
  });
  document.getElementById('previous').addEventListener('click', () => {
    previous();
    favouriteaction();
  });
  // Update the progress bar as the audio plays
  progressbar();
  tocdo();
  document.getElementById('ti-heart').addEventListener('click', () => {
    favourite();
  });
  document.getElementById('ti-heart1').addEventListener('click', () => {
    favourite();
  });
  function next() {
    stt = stt + 1;
    const data = SharedData.getItem("myData");
    let check = 0;
    yeuthich1 = JSON.parse(data).yeuthich;
    if (yeuthich1[stt + 1] == 1) {
      runplayer();
    }
    else {
      if (stt > 75) {
        stt = -1;
      }
      next();
    }
  }
  function previous() {
    if (stt < -1) {
      stt = 75;
    }
    stt = stt - 1;
    const data = SharedData.getItem("myData");
    let check = 0;
    yeuthich1 = JSON.parse(data).yeuthich;
    if (yeuthich1[stt + 1] == 1) {
      runplayer();
    }
    else {
      previous();
    }
  }
  function nutkeotha() {
    // Tạo một div kéo được
    const draggableCircle = document.createElement('div');
    // Thêm sự kiện mousedown để bắt đầu kéo
    draggableCircle.addEventListener('mousedown', () => {
      isDragging = true;
    });
    // Thêm sự kiện mouseup để kết thúc kéo
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    // Thêm sự kiện mousemove để cập nhật vị trí khi kéo
    progressBar.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const pos = e.pageX - progressBar.offsetLeft; // Tính toán vị trí mới của nút theo chuột
        const newPercent = pos / progressBar.offsetWidth * 100; // Tính toán phần trăm mới dựa trên vị trí mới
        audio.currentTime = audio.duration * newPercent / 100; // Đặt thời gian của âm thanh mới
        progressBar.style.width = `${newPercent}%`; // Cập nhật thanh tiến trình
        draggableCircle.style.left = `${pos - 8}px`; // Cập nhật vị trí của nút kéo
      }
    });
    // Thêm div kéo được vào thành phần con của thanh tiến trình
    progressBar.appendChild(draggableCircle);
  }
  function tocdo() {
    const speedSelect = document.getElementById('speed-input');
    // Khi người dùng chọn một option trong select
    speedSelect.addEventListener('change', () => {
      // Lấy giá trị tốc độ từ option đã chọn
      const speed = speedSelect.value;
      // Đặt tốc độ cho audio
      audio.playbackRate = parseFloat(speed);
    });
  }
  function tenbaihat() {
    audio.preload = 'metadata';
    audio.addEventListener('loadedmetadata', () => {
      console.log(audio.duration);        // In ra độ dài của bản ghi âm trong giây 
      console.log(audio.title);           // In ra tiêu đề của bản ghi âm
      console.log(audio.artist);          // In ra nghệ sĩ của bản ghi âm (nếu có)
      console.log(audio.album);           // In ra album của bản ghi âm (nếu có)
    });
  }
  function saveData() {
    SharedData.setItem("myData", JSON.stringify({ yeuthich }));
  }
  function favourite() {
    if (yeuthich[0] == 0) {
      for (let i = 0; i < 100; i++) {
        yeuthich[i] = 0;
      }
    }
    if (yeuthich[stt + 1] == 1) {
      yeuthich[stt + 1] = 0;
    }
    else {
      yeuthich[stt + 1] = 1;
    }
    yeuthich[0] = 1;
    favouriteaction();
    saveData();
  }
  function favouriteaction() {
    favor = document.getElementById('ti-heart');
    if (yeuthich[stt + 1] == 1) {
      favor.style.color = "pink";
    }
    else {
      favor.style.color = "rgb(145, 150, 153)";
    }
    favor1 = document.getElementById('ti-heart1');
    if (yeuthich[stt + 1] == 1) {
      favor1.style.color = "pink";
    }
    else {
      favor1.style.color = "rgb(145, 150, 153)";
    }
  }

  function favouritecheck() {
    const data = SharedData.getItem("myData");
    if (data) {
      let result = document.getElementById("n");
      yeuthich1 = JSON.parse(data).yeuthich;
    }
    for (let i = 0; i < 75; i++) {
      yeuthich[i] = yeuthich1[i];
    }
  }
  // phần list favorite
  function anphantu() {
    for (let index = 1; index <= 75; index++) {
      let name = 's' + index;
      var elem = document.getElementById(name);
      elem.style.display = 'none';
    }
  }
  function hienphantu() {
    const data = SharedData.getItem("myData");
    if (data) {
      yeuthich1 = JSON.parse(data).yeuthich;
      for (let index = 1; index <= 75; index++) {
        if (yeuthich1[index] == 1) {
          let name = 's' + index;
          var elem = document.getElementById(name);
          elem.style.display = 'inline-block';
        }
      }
    }
  }
  function runplayer() {
    document.getElementById('tieude').innerHTML = tieude[stt];
    document.getElementById('tacgia').innerHTML = tacgia[stt];
    phatnhacmoi(danhsach[stt]);
    document.getElementById('anh-tieu-de').src = linkanh[stt];
    let myImage = document.getElementById("play-pause-img");
    myImage.setAttribute("src", "acsset/themify-icons-font/themify-icons/SVG/control-pause.svg");
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
  function dangnhap() {
    if (login == 1) {
      document.getElementById('login').style.display = 'none';
      document.getElementById('signup').style.display = 'none';
      checkScreenWidth();
      document.getElementById('nameuser').innerHTML = nameuser;
      if (premium == 1) {
        document.getElementById('user').style.background = 'linear-gradient(to right,gold,gold,white,gold)';
        document.getElementById('user').style.backgroundColor = 'none';
        document.getElementById('nameuser').style.color = 'black';
      }
    }
  }
  function dangnhap1() {
    if (login == 1) {
      document.getElementById('loginres').style.display = 'none';
      document.getElementById('signupres').style.display = 'none';
      document.getElementById('userres').style.display = 'block';
      document.getElementById('mameuserres').innerHTML = nameuser;
    }
  }
});
