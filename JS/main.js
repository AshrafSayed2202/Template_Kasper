

let navList = document.querySelectorAll("ul.navs li");
console.log(navList)
navList.forEach(function(ele){
    ele.onclick = function(){
        navList.forEach(function(ele){
            ele.classList.remove("active");
        });
        this.classList.add("active");
    };
});
let landingDots = document.querySelectorAll("span.background-dots span");
console.log(landingDots)
landingDots.forEach(function(ele){
    ele.onclick = function(){
        landingDots.forEach(function(ele){
            ele.classList.remove("active-dot");
        });
        this.classList.add("active-dot");
    };
});
// show menu in mobile 
let burgerIcon = document.getElementById("mobile-menu-icon");
let menuContent = document.querySelector("header nav ul");
burgerIcon.onclick = function(){
    menuContent.style.transform = "translateY(-55px)"
}
// close menu in mobile
let closeIcon = document.getElementById("close-mobile-menu");
closeIcon.onclick = function(){
    menuContent.style.transform = "translateY(-205px)"
}
