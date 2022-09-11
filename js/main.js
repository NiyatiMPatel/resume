/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show_menu");
    });
  }
};
showMenu("nav_toggle", "nav_menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.getElementById("nav_menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show_menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.add("active_link");
    } else {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.remove("active_link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll_top");
  // When the scroll is higher than 560 viewport height, add the show_scroll class to the a tag with the scroll_top class
  if (this.scrollY >= 200) {
    scrollTop.classList.add("show_scroll");
  } else {
    scrollTop.classList.remove("show_scroll");
  }
}
window.addEventListener("scroll", scrollTop);

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ===*/
function scaleCv() {
  document.body.classList.add("scale_cv");
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ===*/
function removeScaleCv() {
  document.body.classList.remove("scale_cv");
}

/*==================== GENERATE PDF ====================*/
// PDF generated area

let areaCv = document.getElementById("area_cv");

let resumeButton = document.getElementById("resume_button");
let downloadPdf = document.getElementById("download_pdf");

// Html2pdf options

let opt = {
  margin: 1,
  filename: "niyati_Resume.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" },
  pagebreak: { mode: ["css", "legacy"] },
};

// Function to call areaCv and Html2Pdf options
function generateResume() {
  html2pdf(areaCv, opt);
}

// When the button is clicked, it executes the three functions

resumeButton.addEventListener("click", () => {
  // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCv();
  // 2. The PDF is generated
  generateResume();
  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
  setTimeout(removeScaleCv, 5000);
});
