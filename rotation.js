let constrain = 250;
let mouseOverContainer = document.getElementsByTagName("html")[0];
let rotationalContainer = document.getElementById("ticket");

mouseOverContainer.onmousemove = function (e) {
  rotationalContainer &&
    window.requestAnimationFrame(function () {
      let box = rotationalContainer.getBoundingClientRect();
      let calcX = -(e.clientY - box.y - box.height / 2) / constrain;
      let calcY = (e.clientX - box.x - box.width / 2) / constrain;
      let transformation = `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
      rotationalContainer.style.transform = transformation;
    });
};