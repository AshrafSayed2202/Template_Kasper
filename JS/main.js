// Global Vars
const burgerIcon = document.getElementById("mobile-menu-icon");
const menuContent = document.querySelector("header nav ul");
const sections = document.querySelectorAll('section');
const scrollTop = document.querySelector('.scroll-to-top')
const fixedHeader = document.querySelector('.fixed-header');
// Dynamicly creat nav
function creatNavs(){
    sections.forEach((e)=>{
        let listItem = document.createElement('li');
        let linkItem = document.createElement('span');
        linkItem.innerHTML = e.dataset.nav;
        menuContent.appendChild(listItem);
        listItem.appendChild(linkItem);
    })
};
creatNavs();
let navList = document.querySelectorAll("ul.navs li");
// helper functions
function removeActive(){
    navList.forEach((e)=>{
        e.classList.remove('active-nav')
    })
}
// Events
onscroll = function(){
    for(let i=0;i<sections.length;i++){
        if(window.scrollY>=sections[i].offsetTop - (sections[i].offsetHeight * 0.35)){
            removeActive();
            navList[i].classList.add('active-nav')
        }
    }
    window.scrollY >= sections[0].offsetHeight * 0.85? scrollTop.style.right = "4%" : scrollTop.style.right = "-30%";
    window.scrollY >= sections[0].offsetHeight * 0.75? fixedHeader.style.backgroundColor = "var(--trans-color)" : fixedHeader.style.backgroundColor = "";
}
for(let i = 0;i < navList.length;i++){
    navList[i].onclick = function(){
        window.scrollTo({
            top: sections[i].offsetTop,
            left:0,
            behavior: "smooth"
        })
    };
};
scrollTop.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})
const landingDots = document.querySelectorAll("span.background-dots span");
// sliding background
let indexValue = 1;
function btnSlide(e){showImg(indexValue = e)};
function sideSlide(e){showImg(indexValue += e)};
showImg(indexValue);
function showImg(e){
    const imgs = document.querySelectorAll('.backgrounds img');
    if(e > imgs.length){indexValue = 1};
    if(e < 1){indexValue = imgs.length};
    for(let i = 0;i < imgs.length; i++){
        imgs[i].style.display = 'none';
        landingDots[i].classList.remove('active-dot');
    }
    imgs[indexValue-1].style.display = 'block';
    landingDots[indexValue-1].classList.add('active-dot');
}
setInterval(function(){
indexValue += 1;
showImg(indexValue)
},5000)
// Portfolio
const portfolioList = document.querySelectorAll('.portfolio-categ li');
const portfolioCards = document.querySelectorAll('.portfolio-images .image-card');
const showMoreBtn = document.querySelector('button.show-more');
for(let i = 8;i<portfolioCards.length;i++){
    portfolioCards[i].style.display = 'none';
}
showMoreBtn.addEventListener('click',()=>{
    if(showMoreBtn.innerHTML == 'more'){
        showMoreBtn.innerHTML = 'less'
        for(let i = 8;i<portfolioCards.length;i++){
            portfolioCards[i].style.display = 'block';
        }
    }else{
        showMoreBtn.innerHTML = 'more'
        for(let i = 8;i<portfolioCards.length;i++){
            portfolioCards[i].style.display = 'none';
        }
    }
    
})
portfolioList.forEach((e)=>{
    e.addEventListener('click',()=>{
        showMoreBtn.disabled = true;
        portfolioList.forEach((i)=>{
            i.classList.remove('active-categ');
        });
        e.classList.add('active-categ')
        portfolioCards.forEach((j)=>{
            if(e.innerHTML == j.children[1].children[1].innerHTML){
                j.style.display = 'block';
            }else{
                j.style.display = 'none';
            }
            if(e.innerHTML == 'all'){
                showMoreBtn.disabled = false;
                for(let i=0;i<8;i++){
                    portfolioCards[i].style.display = 'block';
                }
            }
        })
    })
})