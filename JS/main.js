// Global Vars
const burgerIcon = document.getElementById("mobile-menu-icon");
const menuContent = document.querySelector("header nav ul");
const sections = document.querySelectorAll('section');
const scrollTop = document.querySelector('.scroll-to-top')
const fixedHeader = document.querySelector('.fixed-header .container');
const xMardMenu = document.getElementById('close-menu');
// show menu on mobile
burgerIcon.addEventListener('click',showMenuOnMobile);
function showMenuOnMobile(){
    menuContent.style.transition = 'var(--main-trans)'
    menuContent.style.transform = 'translateX(0%)'
    disableScroll()
};
xMardMenu.addEventListener('click',hideMenuOnMobile);
function hideMenuOnMobile(){
    menuContent.style.transform = 'translateX(100%)'
    enableScroll();
};
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
window.addEventListener('scroll',activeOnScroll)
function activeOnScroll(){
    for(let i=0;i<sections.length;i++){
        if(window.scrollY>=sections[i].offsetTop - (sections[i].offsetHeight * 0.35)){
            removeActive();
            navList[i].classList.add('active-nav')
        }
    }
    window.scrollY >= sections[0].offsetHeight * 0.85? scrollTop.style.right = "4%" : scrollTop.style.right = "-10%";
    window.scrollY >= sections[0].offsetHeight * 0.85? scrollTop.style.opacity = "1" : scrollTop.style.opacity = "0";
    window.scrollY >= sections[0].offsetHeight * 0.75? fixedHeader.style.backgroundColor = "rgb(0 69 78 / 65%)" : fixedHeader.style.backgroundColor = "";
    // states counter 
    window.scrollY >= document.querySelector('section[data-nav="about"]').offsetTop? increaseStates():false;
    window.scrollY >= document.querySelector('.states').offsetTop - 300? increaseSkills():false;
}
for(let i = 0;i < navList.length;i++){
    navList[i].onclick = function(){
        window.scrollTo({
            top: sections[i].offsetTop,
            left:0,
            behavior: "smooth"
        })
        if(window.innerWidth <= 991){
            hideMenuOnMobile();
        }
    };
};
window.onresize = function(){
    if(window.innerWidth > 991){
        menuContent.style.transform = 'translateX(0%)'
    }else{
        menuContent.style.transform = 'translateX(100%)'
    }
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
let portfolioCards = document.querySelectorAll('.portfolio-images .image-card');
const showMoreBtn = document.querySelector('button.show-more');
for(let i = 8;i<portfolioCards.length;i++){
    portfolioCards[i].style.display = 'none';
}
// upload card
let lastCard = portfolioCards[portfolioCards.length -1];

const cardNameInput = document.getElementById('card-name');
const cardCategorySelect = document.getElementById('category-select');
const cardImageUrl = document.getElementById('image-url');
const cardsContainer = document.querySelector('.portfolio-images')

const submitUplaod = document.getElementById('submit-upload');
submitUplaod.addEventListener('click',uploadimage);
function uploadimage(){
    if(cardNameInput.value == ''||cardCategorySelect.value == ''||cardImageUrl.value == ''){
        cardNameInput.focus();
        return false;
    }
    // create image
    let cardImage = document.createElement('img');
    cardImage.src = cardImageUrl.value;
    // create text
    let cardName = document.createElement('h3');
    cardName.innerHTML = cardNameInput.value;
    let cardCategory = document.createElement('p');
    cardCategory.innerHTML = cardCategorySelect.value;
    // create text container
    let cardText = document.createElement('div');
    cardText.classList.add('text');
    cardText.appendChild(cardName);
    cardText.appendChild(cardCategory);
    // create the card
    let card = document.createElement('div');
    card.classList.add('image-card');
    card.appendChild(cardImage);
    card.appendChild(cardText);
    cardsContainer.appendChild(card);
    // make the addnew btn the last one 
    cardsContainer.appendChild(lastCard);
    // reset the cards number
    portfolioCards = document.querySelectorAll('.portfolio-images .image-card');
    closeAddingCardForm()
    cardNameInput.value ='';
    cardCategorySelect.value ='';
    cardImageUrl.value ='';
}
// filter portfolio category
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
                showMoreAction();
            }
        })
    })
})
// show more btn
showMoreBtn.addEventListener('click',showMoreAction);
    function showMoreAction(){
        if(showMoreBtn.innerHTML == 'more'){
            showMoreBtn.innerHTML = 'less'
            for(let i = 0;i<portfolioCards.length;i++){
                portfolioCards[i].style.display = 'block';
            }
        }else{
            showMoreBtn.innerHTML = 'more'
            for(let i = 8;i<portfolioCards.length;i++){
                portfolioCards[i].style.display = 'none';
            }
        }
    }
// show and hide adding card form
const addCardBtnOpen = document.querySelector('.add-image');
const addCardBtnClose = document.querySelector('.close-adding');
const addCardForm = document.getElementById('adding-container')

addCardBtnOpen.addEventListener('click',openAddingCardForm);
function openAddingCardForm(){
    addCardForm.style.pointerEvents = 'auto'
    addCardForm.style.opacity = '1'
    disableScroll();
    fixedHeader.style.transform = 'translateY(-100%)'
    scrollTop.style.right = '-10%'
}
addCardBtnClose.addEventListener('click',closeAddingCardForm);
function closeAddingCardForm(){
    addCardForm.style.pointerEvents = 'none'
    addCardForm.style.opacity = '0'
    enableScroll();
    fixedHeader.style.transform = 'translateY(0%)'
    scrollTop.style.right = '4%'
}
function disableScroll(){
    let topScroll = window.pageYOffset;
    let leftScroll = window.pageXOffset;
    window.onscroll = ()=>{
        window.scrollTo(leftScroll,topScroll);
    }
}
function enableScroll(){
    window.onscroll = activeOnScroll()
}
// checked or Xmark 
cardNameInput.onblur = ()=>{
    if(cardNameInput.value == ''){
        cardNameInput.previousElementSibling.children[1].style.display = 'none';
        cardNameInput.previousElementSibling.children[0].style.display = 'block';
    }else{
        cardNameInput.previousElementSibling.children[0].style.display = 'none';
        cardNameInput.previousElementSibling.children[1].style.display = 'block';
    }
}
cardImageUrl.onblur = ()=>{
    if(cardImageUrl.value == ''){
        cardImageUrl.previousElementSibling.children[1].style.display = 'none';
        cardImageUrl.previousElementSibling.children[0].style.display = 'block';
    }else{
        cardImageUrl.previousElementSibling.children[0].style.display = 'none';
        cardImageUrl.previousElementSibling.children[1].style.display = 'block';
    }
}
cardCategorySelect.onchange =()=>{
    if(cardCategorySelect.value == ''){
        cardCategorySelect.previousElementSibling.children[1].style.display = 'none';
        cardCategorySelect.previousElementSibling.children[0].style.display = 'block';
    }else{
        cardCategorySelect.previousElementSibling.children[0].style.display = 'none';
        cardCategorySelect.previousElementSibling.children[1].style.display = 'block';
    }
}
// increase states numbers 
let startedCountingStates = false;
const counter = document.querySelectorAll('.states .counter');
function increaseStates(){
    if(!startedCountingStates){
        counter.forEach((e)=>{
            let goal = e.dataset.goal;
            e.textContent++
            let counting = setInterval(()=>{
                e.dataset.goal>1000? e.textContent =parseInt(e.textContent)+5:e.textContent++;
                if(e.textContent >= parseInt(goal)){
                    clearInterval(counting)
                }   
            },1500/goal);
        })
        startedCountingStates = true;
    }
}
// increase states numbers and width 
const progressBars = document.querySelectorAll('span.progress');
let startedCountingSkills = false;
function increaseSkills(){
    if(!startedCountingSkills){
        progressBars.forEach((e)=>{
            e.style.width = e.dataset.width+'%'
            let goal = e.children[0].dataset.perc;
            let counting = setInterval(()=>{
                e.children[0].textContent++
                if(e.children[0].textContent == goal){
                    clearInterval(counting);
                }
            },2000/goal)
        })
        startedCountingSkills = true;
    }
}
let testimonialsMenuDots = document.querySelectorAll('.test-side .dots span');
testimonialsMenuDots.forEach((e)=>{
    e.addEventListener('click',()=>{
        testimonialsMenuDots.forEach((i)=>{
            i.classList.remove('active');
        })
        e.classList.add('active')
    })
})
function slideTestCards(e){
    document.querySelector('.testers-container').style.left = `${e}%`;
}
