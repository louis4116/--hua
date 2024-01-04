const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const yo = document.querySelector(".yo");
const squreX = $(".home-cut-2-fixed-first-squre-1").offset().left;
const squreY = $(".home-cut-2-fixed-first-squre-1").offset().top;
const squreW = $(".home-cut-2-fixed-first-squre-1").width();
const squreH = $(".home-cut-2-fixed-first-squre-1").height();
const textT = $(".home-cut-2-para").offset().top;
const textH = $(".home-cut-2-para").innerHeight();
const pL = $(".n-4-p").offset().left;
const pH = $(".n-4-p").height();

const squreDis = squreY - (textT + textH);
const squreW2 = (squreW - squreW * 0.8) / 2;
const squreH2 = (squreH - squreW * 0.8) / 2;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
$(window).on("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const backImage = new Image();
backImage.src = "./img/home/旋轉背景圖.jpg";
backImage.onload = () => {
  // 遮罩顏色;
  ctx.fillStyle = "rgb(193,175,155)";
  ctx.save(); // 保存當前狀態
  ctx.beginPath();
  // ctx.roundRect(pH + pL + squreW2, 0, squreW * 0.6, squreH * 0.6, 20); // 正方形路徑
  ctx.roundRect(
    squreX + squreW2,
    squreDis + squreH2, //少home-cut-2-para的margin
    squreW * 0.8,
    squreH * 0.8,
    20
  ); // 正方形路徑
  ctx.clip(); // 裁剪路徑
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(backImage, 0, 0, canvas.width, canvas.height); // 繪製圖片
  ctx.restore();
  ctx.globalCompositeOperation = "source-over";
};

gsap.registerPlugin(ScrollTrigger);
//第二cut

const cut2MaskSmall = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-cut-2-fixed-container",
    toggleActions: "play none none reverse",
    start: "top top",
    end: "bottom+=250% bottom",
    pin: true,
    scrub: 0.2,
    onUpdate: (self) => {
      // let scaleVal = 0.9;
      // let progress = self.progress;
      // let angle = 5 * progress;
      // let scaleprogress = Number(((1 - 0.9) * progress).toFixed(3));
      // let scaleRes = 1 - scaleprogress;
      // drawMask(scaleRes, scaleprogress, angle);
    },
  },
});
let img1 = new Image();
let img2 = new Image();
let img3 = new Image();
let img4 = new Image();
img1.src = "./img/home/旋轉背景圖.jpg";
img2.src = "./img/home/big01.jpg";
img3.src = "./img/home/big02.jpg";
img4.src = "./img/home/big03.jpg";
cut2MaskSmall
  .to(".home-cut-2-fixed-first-squre-wrapper", {
    onUpdate: function () {
      let scaleVal = 0.9;
      let progress = this.progress();
      let angle = 5 * progress;
      let scaleprogress = Number(((1 - 0.9) * progress).toFixed(3));
      let scaleRes = 1 - scaleprogress;

      drawMask(scaleRes, scaleprogress, angle);
      // console.log(this.progress());
    },
    scale: "0.9",
    rotation: 50,
  })
  .to(".home-cut-2-fixed-first-squre-wrapper", {
    onUpdate: function () {
      let scaleVal = 5;
      let progress = this.progress();
      let scaleprogress = Number(Math.abs((0.9 - 6) * progress).toFixed(3));
      let scaleRes = 0.9 + scaleprogress;
      let img;
      if (scaleRes >= 4) {
        console.log("成功");
        img = img2;
      } else if (scaleRes >= 3) {
        img = img3;
      } else if (scaleRes >= 2) {
        img = img4;
      } else {
        img = img1;
      }
      // console.log(scaleprogress);
      drawMask(scaleRes, progress, 5, img);
      // console.log(this.progress());
    },
    scale: "4",
  });
function drawMask(scaleRes, scaleprogress, angle, img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除 canvas

  ctx.save(); // 保存當前狀態

  ctx.translate(squreX + squreW / 2, squreDis + squreH / 2); // 將旋轉中心設為正方形中心
  ctx.rotate((angle * Math.PI) / 180);
  ctx.fillStyle = "rgb(193,175,155)";
  ctx.beginPath();
  ctx.roundRect(
    (-squreW * 0.8 * scaleRes) / 2,
    (-squreH * 0.8 * scaleRes) / 2,
    squreW * 0.8 * scaleRes,
    squreH * 0.8 * scaleRes,
    20
  ); // 正方形路徑
  ctx.clip(); // 裁剪路徑
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.globalCompositeOperation = "source-in";
  if (!img) {
    img = backImage;
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 繪製圖片
  ctx.globalCompositeOperation = "source-over";
}
