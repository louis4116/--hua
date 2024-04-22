$(window).on("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  //取得遮罩置中所需的位置
  const squreX = $(".home-cut-2-fixed-first-squre-1").offset().left;
  const squreY = $(".home-cut-2-fixed-first-squre-1").offset().top;
  const squreW = $(".home-cut-2-fixed-first-squre-1").width();
  const squreH = $(".home-cut-2-fixed-first-squre-1").height();
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

  const windowWidth = window.innerWidth;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (window.innerWidth <= 1024) {
    canvas.height = window.innerHeight + (window.innerHeight / 100) * 20;
    console.log((window.innerHeight / 100) * 20);
  }
  //各標準下的不同值
  let w, h, drawObj, scale, time, path, dev, endPro;

  if (windowWidth <= 500) {
    w = 0.8;
    h = 0.8;
    drawObj = {
      ctx: ctx,
      x: squreX + squreW2Phone,
      y: squreFH / 2 - (squreH * h) / 2,
      width: squreW * w,
      height: squreH * h,
    };
    path = -3.5;
    scale = 5.5;
    dev = "mb";
    endPro = 4.5;
    time = "<";
  } else if (windowWidth > 500 && windowWidth <= 1024) {
    w = 0.8;
    h = 0.5;
    drawObj = {
      ctx: ctx,
      x: squreX + squreW2Phone,
      y: squreFH / 2 - (squreH * h) / 2,
      width: squreW * w,
      height: squreH * h,
    };
    path = -3.5;
    scale = 5.5;
    dev = "mb";
    endPro = 4.5;
    time = "<";
  } else {
    w = 0.6;
    h = 0.6;
    drawObj = {
      ctx: ctx,
      x: pH + pL + squreW2,
      y: squreDis + squreH2,
      width: squreW * w,
      height: squreH * h,
    };
    scale = 5.5;
    path = -2.5;
    time = "<";
    dev = "pc";
    endPro = 3.5;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

  //遮罩圖片內設定
  const backImage = new Image();
  backImage.src = "./img/home/big0-2.webp";

  let img1 = new Image();
  let img2 = new Image();
  let img3 = new Image();
  let img4 = new Image();
  let img5 = new Image();
  let img6 = new Image();
  const src = [];
  if (windowWidth <= 1024) {
    const imgContentMb = [
      "./img/home/phone/ph_01.webp",
      "./img/home/phone/ph_02.webp",
      "./img/home/phone/ph_03.webp",
      "./img/home/phone/ph_04.webp",
      "./img/home/phone/ph_05.webp",
      "./img/home/phone/ph_01.webp",
    ];
    backImage.src = "./img/home/phone/ph_01.webp";
    [img1.src, img2.src, img3.src, img4.src, img5.src, img6.src] = imgContentMb;
  } else {
    const imgContentPc = [
      "./img/home/big01.webp",
      "./img/home/big02.webp",
      "./img/home/big04.webp",
      "./img/home/big05.webp",
      "./img/home/big06.webp",
    ];
    backImage.src = "./img/home/big01.webp";
    [img1.src, img2.src, img3.src, img4.src, img5.src] = imgContentPc;
  }

  //遮罩主要動畫
  let cut2MaskSmall;
  if (window.innerWidth <= 1024) {
    cut2MaskSmall = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-cut-2-fixed-container",
        toggleActions: "play none none reverse",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 0.2,
      },
    });
  } else {
    cut2MaskSmall = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-cut-2-fixed-container",
        toggleActions: "play none none reverse",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 0.2,
      },
    });
  }

  //canvas放大
  const cut2PicBigger = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-cut-3",
      toggleActions: "play none none reverse",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0.2,
    },
  });

  gsapAnimation(
    cut2MaskSmall,
    cut2PicBigger,
    ".home-cut-2-fixed-first-squre-wrapper",
    scale,
    dev,
    endPro
  );

  //圓框繪製
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

  //第一次繪圖
  function firstDraw(obj, progress) {
    backImage.onload = function () {
      ctx.fillStyle = "rgb(193,175,155)"; // 遮罩顏色;
      ctx.save(); // 保存當前狀態
      roundRect(obj.ctx, obj.x, obj.y, obj.width, obj.height, 20);
      ctx.fill();
      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(backImage, 0, 0, canvas.width, canvas.height); // 繪製圖片
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
    };
  }

  //gsap第二次繪製開始後的動畫
  function gsapAnimation(animateFirst, animateSecond, wrapper, s, dev, endPro) {
    let para;
    if (dev === "mb") {
      para = [
        { yTo: "95vw", pro: -0.5 },
        { yTo: "72.5vw", pro: 0.5 },
        { yTo: "47.5vw", pro: 1.5 },
        { yTo: "22.5vw", pro: 2.5 },
        { yTo: "0vw", pro: 3.5 },
      ];
    } else {
      para = [
        { yTo: "30vw", pro: -0.5 },
        { yTo: "20vw", pro: 0.5 },
        { yTo: "10vw", pro: 1.5 },
        { yTo: "0vw", pro: 2.5 },
      ];
    }
    if (window.innerWidth <= 1024) {
      $(".home-cut-2-fixed-first-squre-wrapper").css(
        "transform",
        `translate(0px,120vw)`
      );
    } else {
      $(".home-cut-2-fixed-first-squre-wrapper").css(
        "transform",
        `translate(0px,40vw)`
      );
    }
    para.forEach((el) => {
      animateFirst.to(wrapper, {
        onUpdate: function () {
          let progress = this.progress();
          drawMask(1, 0, img1, w, h, progress + el.pro);
        },
        y: el.yTo,
        ease: "linear",
        duration: 3,
      });

      // if (el.yFr) {
      //   animateFirst.fromTo(
      //     wrapper,
      //     {
      //       y: el.yFr,
      //     },
      //     {
      //       onUpdate: function () {
      //         let progress = this.progress();
      //         drawMask(1, 0, img1, w, h, progress + el.pro);
      //         console.log("progress " + progress);
      //       },
      //       y: el.yTo,
      //       ease: "linear",
      //       duration: 7,
      //     }
      //   );
      // } else {
      //   animateFirst.to(wrapper, {
      //     onUpdate: function () {
      //       let progress = this.progress();
      //       drawMask(1, 0, img1, w, h, progress + el.pro);
      //     },
      //     y: el.yTo,
      //     ease: "linear",
      //     duration: 7,
      //   });
      // }
    });

    animateFirst
      .to(wrapper, {
        onUpdate: function () {
          let progress = this.progress();
          let angle = 5 * progress;
          let scaleprogress = Number(((1 - 0.9) * progress).toFixed(3)); //四捨五入至第三位
          let scaleRes = 1 - scaleprogress;
          drawMask(scaleRes, angle, img1, w, h, endPro); //第二次繪圖 與第一次銜接
        },
        scale: "0.9",
        rotation: 50,
        duration: 15,
      })
      .to(wrapper, {
        onUpdate: function () {
          let progress = this.progress();
          let scaleprogress = Number(
            Math.abs((0.9 - 10) * progress).toFixed(3)
          ); //四捨五入至第三位
          let scaleRes = 0.9 + scaleprogress;
          let img;
          if (scaleRes >= 4.25) {
            img = img5;
          } else if (scaleRes >= 3.25 && scaleRes < 4.25) {
            img = img4;
          } else if (scaleRes >= 2.25 && scaleRes < 3.25) {
            img = img3;
          } else if (scaleRes >= 1.25 && scaleRes < 2.25) {
            img = img2;
          } else {
            img = img1;
          }
          drawMask(scaleRes, 5, img, w, h, endPro);
        },
        scale: s,
        duration: windowWidth <= 1024 ? 40 : 50,
      })
      .to(
        ".yo",
        {
          scale: "1.5",
          ease: "linear",
          duration: windowWidth <= 1024 ? 40 : 60,
        },
        time
      );
    // animateSecond.to(".yo", {
    //   scale: "1.75",
    //   ease: "linear",
    //   duration: 19,
    // });
    // animateFirst.add(animateSecond, "<+1");
  }

  //固定後的繪製
  function drawMask(scaleRes, angle, img, w, h, progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除 canvas
    ctx.save(); // 保存當前狀態
    if (windowWidth <= 1024) {
      ctx.translate(squreX + squreW / 2, squreFH / 2); // 將旋轉中心設為正方形中心
    } else {
      ctx.translate(pH + pL + squreW / 2, squreDis + squreH / 2); // 將旋轉中心設為正方形中心
    }
    ctx.rotate((angle * Math.PI) / 180);
    ctx.fillStyle = "rgb(193,175,155)"; //填色

    roundRect(
      ctx,
      (-squreW * w * scaleRes) / 2,
      (-squreH * h * scaleRes * (path + progress)) / 2,
      squreW * w * scaleRes,
      squreH * h * scaleRes,
      20
    );
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
