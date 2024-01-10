const windowWidth = window.innerWidth;
$(window).on("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const yo = document.querySelector(".yo");
  //取得遮罩置中所需的位置
  const squreX = $(".home-cut-2-fixed-first-squre-1").offset().left;
  const squreY = $(".home-cut-2-fixed-first-squre-1").offset().top;
  const squreW = $(".home-cut-2-fixed-first-squre-1").width();
  const squreH = $(".home-cut-2-fixed-first-squre-1").height();
  const cut1H = $(".home-cut-1").innerHeight();
  const squreFH = $(".home-cut-2-fixed-first-squre-wrapper").height();
  const textT = $(".home-cut-2-para").offset().top;
  const textH = $(".home-cut-2-para").innerHeight();
  const pL = $(".n-4-p").offset().left;
  const pH = $(".n-4-p").height();

  const squreDis = squreY - (textT + textH);
  const squreW2 = (squreW - squreW * 0.6) / 2;
  const squreH2 = (squreH - squreW * 0.6) / 2;
  const squreW2Phone = (squreW - squreW * 0.8) / 2;
  const squreH2Phone = (squreH - squreW * 0.8) / 2;
  // console.log(squreY);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // $(window).on("resize", function () {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // });

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollSmoother);

  //遮罩圖片內設定
  const backImage = new Image();
  backImage.src = "./img/home/旋轉背景圖.jpg";
  let img1 = new Image();
  let img2 = new Image();
  let img3 = new Image();
  let img4 = new Image();
  let img5 = new Image();
  let img6 = new Image();

  if (windowWidth > 500) {
    backImage.src = "./img/home/旋轉背景圖.jpg";
    img1.src = "./img/home/旋轉背景圖.webp";
    img2.src = "./img/home/big01.webp";
    img3.src = "./img/home/big02.webp";
    img4.src = "./img/home/big03.webp";
    img5.src = "./img/home/big04.webp";
    img6.src = "./img/home/big05.webp";
  } else {
    backImage.src = "./img/home/phone/ph_01.webp";
    img1.src = "./img/home/phone/ph_01.webp";
    img2.src = "./img/home/phone/ph_02.webp";
    img3.src = "./img/home/phone/ph_03.webp";
    img4.src = "./img/home/phone/ph_04.webp";
    img5.src = "./img/home/phone/ph_05.webp";
    img6.src = "./img/home/phone/ph_01.webp";
  }
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }
  //遮罩主要動畫
  const cut2MaskSmall = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-cut-2-fixed-container",
      toggleActions: "play none none reverse",
      start: "top top",
      end: "bottom+=250% bottom",
      pin: true,
      scrub: 0.2,
    },
  });

  //canvas放大
  const cut2PicBigger = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-cut-3",
      toggleActions: "play none none reverse",
      start: "-50% bottom",
      end: "bottom bottom",
      scrub: 0.2,
    },
  });
  if (windowWidth <= 500) {
    //第一次繪圖
    backImage.onload = function () {
      // 遮罩顏色;
      ctx.fillStyle = "rgb(193,175,155)";
      ctx.save(); // 保存當前狀態
      roundRect(
        ctx,
        squreX + squreW2Phone,
        squreFH / 2 - (squreW * 0.8) / 2,
        squreW * 0.8,
        squreH * 0.8,
        20
      );
      ctx.fill();
      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(backImage, 0, 0, canvas.width, canvas.height); // 繪製圖片
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
    };
    cut2MaskSmall
      .to(".home-cut-2-fixed-first-squre-wrapper", {
        onUpdate: function () {
          let progress = this.progress();
          let angle = 5 * progress;
          let scaleprogress = Number(((1 - 0.9) * progress).toFixed(3)); //四捨五入至第三位
          let scaleRes = 1 - scaleprogress;

          drawMask(scaleRes, angle, img1); //第二次繪圖 與第一次銜接
        },
        scale: "0.9",
        rotation: 50,
      })
      .to(".home-cut-2-fixed-first-squre-wrapper", {
        onUpdate: function () {
          let progress = this.progress();
          let scaleprogress = Number(Math.abs((0.9 - 6) * progress).toFixed(3)); //四捨五入至第三位
          let scaleRes = 0.9 + scaleprogress;
          let img;
          if (scaleRes >= 4.5) {
            img = img5;
          } else if (scaleRes >= 4 && scaleRes < 4.5) {
            img = img2;
          } else if (scaleRes >= 3.25 && scaleRes < 4) {
            img = img3;
          } else if (scaleRes >= 2.5 && scaleRes < 3.25) {
            img = img4;
          } else {
            img = img1;
          }
          drawMask(scaleRes, 5, img);
        },
        scale: "4.5",
      });

    cut2PicBigger.to(".yo", { y: "20%", scale: "1.5", ease: "linear" });
    cut2MaskSmall.add(cut2PicBigger, "<-0.5");
  } else {
    //第一次繪圖
    backImage.onload = function () {
      // 遮罩顏色;
      ctx.fillStyle = "rgb(193,175,155)";
      ctx.save(); // 保存當前狀態
      roundRect(
        ctx,
        pH + pL + squreW2,
        squreDis + squreH2,
        squreW * 0.6,
        squreH * 0.6,
        20
      ); // 正方形路徑
      ctx.fill();
      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(backImage, 0, 0, canvas.width, canvas.height); // 繪製圖片
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
    };
    cut2MaskSmall
      .to(".fixed-squre", {
        onUpdate: function () {
          let progress = this.progress();
          let angle = 5 * progress;
          let scaleprogress = Number(((1 - 0.9) * progress).toFixed(3)); //四捨五入至第三位
          let scaleRes = 1 - scaleprogress;
          drawMask(scaleRes, angle, img1); //第二次繪圖 與第一次銜接
        },
        scale: "0.9",
        rotation: 50,
      })
      .to(".fixed-squre", {
        onUpdate: function () {
          let progress = this.progress();
          let scaleprogress = Number(Math.abs((0.9 - 6) * progress).toFixed(3)); //四捨五入至第三位
          let scaleRes = 0.9 + scaleprogress;
          let img;
          if (scaleRes >= 5) {
            img = img5;
          } else if (scaleRes >= 4.25 && scaleRes < 5) {
            img = img6;
          } else if (scaleRes >= 3.25 && scaleRes < 4.25) {
            img = img3;
          } else if (scaleRes >= 2.5 && scaleRes < 3.25) {
            img = img4;
          } else if (scaleRes >= 1.5 && scaleRes < 2.5) {
            img = img2;
          } else {
            img = img1;
          }
          drawMask(scaleRes, 5, img);
        },
        scale: "4",
      });

    cut2PicBigger.to(".yo", { y: "20%", scale: "1.5", ease: "linear" });
    cut2MaskSmall.add(cut2PicBigger, "<-0.5");
  }

  function drawMask(scaleRes, angle, img) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除 canvas
    ctx.save(); // 保存當前狀態
    if (windowWidth <= 500) {
      ctx.translate(squreX + squreW / 2, squreFH / 2); // 將旋轉中心設為正方形中心
    } else {
      ctx.translate(pH + pL + squreW / 2, squreDis + squreH / 2); // 將旋轉中心設為正方形中心
    }
    ctx.rotate((angle * Math.PI) / 180);
    ctx.fillStyle = "rgb(193,175,155)"; //填色
    if (windowWidth <= 500) {
      roundRect(
        ctx,
        (-squreW * 0.8 * scaleRes) / 2,
        (-squreH * 0.8 * scaleRes) / 2,
        squreW * 0.8 * scaleRes,
        squreH * 0.8 * scaleRes,
        20
      );
    } else {
      roundRect(
        ctx,
        (-squreW * 0.6 * scaleRes) / 2,
        (-squreH * 0.6 * scaleRes) / 2,
        squreW * 0.6 * scaleRes,
        squreH * 0.6 * scaleRes,
        20
      ); // 正方形路徑
    }
    ctx.fill();
    ctx.restore();
    ctx.globalCompositeOperation = "source-in"; //遮罩設定
    if (!img) {
      img = backImage;
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 繪製圖片
    ctx.globalCompositeOperation = "source-over"; //遮罩還原
  }
});
