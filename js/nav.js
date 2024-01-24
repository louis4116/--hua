const navItem = [
  {
    name: "關於品牌",
    url: "javascript:;",
  },
  { name: "熱銷建案", url: "About_project.html" },
  { name: "經典作品", url: "javascript:;" },
  { name: "最新消息", url: "javascript:;" },
  { name: "聯絡我們", url: "javascript:;" },
];
$(document).ready(function () {
  const nav = $("#nav");
  let src = "";
  src += `<div class="nav-icon">
    <img src="./img/home/樺輝icon.png" alt="樺輝icon" />
    <a href="index.html"></a>
  </div>`;
  src += ` <button class="nav-hamb-icon">
  <span></span>
  <span></span>
  <span></span>
</button>`;
  src += `<div class="nav-list">
<ul class="nav-list-ul">
  <div class="nav-list-ul-div">`;
  navItem.forEach((el) => {
    src += `<li><a href="${el.url}">${el.name}</a></li>`;
  });
  src += `</div>
  </ul>
</div>`;

  nav.append(src);
  const navHeight = $("#nav").outerHeight();
  if (window.innerWidth <= 500) {
    $(".nav-hamb-icon").on("click", function (e) {
      e.preventDefault();
      $(".nav-list-ul").slideToggle(500);
    });
    $(".nav-list-ul>div").css("margin-top", -navHeight);
  } else {
    $(".ph").remove();
  }
});
