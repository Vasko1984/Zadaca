
let backEndData = dataJSON;
let source_type = "all";
let showedData = [];
let dark_theme = false;
let sideHidden = false;
console.log(dataJSON)

function fetchCards(start,number,source_type){
  if(source_type !== "all"){
    backEndData = dataJSON.filter(d => d.source_type ==source_type)
  }else{
    backEndData = dataJSON;
  }
  if(number == 0) number = 4;
  return backEndData.slice(start,start+number)
}

function constructElement(profileImage,name,date,socialLogoPath,image,description,likes) {
  const card = document.createElement("div");

  card.innerHTML = `<div class="card ${dark_theme ? 'dark-theme' : ''}">
  <div class="card_header d-flex flex-aling-center flex-justify-between">
    <div class="card_header_left d-flex flex-aling-center flex-justify-start">
      <div class="card_header_left_logo" style="background: url(${profileImage}); height: 50px; width: 50px; border-radius: 50%; background-position: center; background-size: contain;"></div>
      <div class="card_header_left_text_parent">
        <h1 class="card_header_left_name">${name}</h1>
        <p class="card_header_left_date">${date}</p>
      </div>
    </div>
    <div class="card_header_right">
      <img src=${socialLogoPath} alt="">
    </div>
  </div>
  <div class="card_image" style="background: url(${image}); height: 350px; width: auto; margin: 2%;"></div>
  <div class="card_text">
    <p>${description}</p>
  </div>
  <div class="card_devider"></div>
  <div class="card_likes">
    <div class="card_likes_icon">
      <img src="../icons/heart.svg" alt="">
    </div>
    <div class="card_likes_counter">
      <span class="number-likes">${likes}</span>
    </div>
  </div>`
  return card;
}
function getSocialLogo(type){
  let path = "";
  switch (type) {
    case "instagram":
      path = "../icons/instagram-logo.svg"
      break;
    case "facebook" :
      path = "../icons/facebook.svg"
    default:
      break;
  }
  return path;
}
function genCards(){
  const currentNumber = document.getElementsByClassName("card").length;
  const cardsData = fetchCards(currentNumber,4,source_type);
  cardsData.forEach(c => {
    const socialLogoPath = getSocialLogo(c.source_type);
    const card = constructElement(c.profile_image,c.name,c.date,socialLogoPath,c.image,c.caption,c.likes);
    showedData.push({id : c.id, source_type : c.source_type});
    document.getElementsByClassName("layout-placeholder")[0].appendChild(card);
  })
}

function clearCards(){
  document.getElementsByClassName("layout-placeholder")[0].innerHTML = "";
}
function filterCards(type){
  const sameType = showedData.filter(c => c.source_type == type);
  const currNumber = (sameType.length > 0 && (source_type !== "all")) ? sameType.length + 1 : 4;
  const cardsData = fetchCards(0,currNumber,type);
  source_type = type;
  clearCards();
  cardsData.forEach(c => {
    const socialLogoPath = getSocialLogo(c.source_type);
    const card = constructElement(c.profile_image,c.name,c.date,socialLogoPath,c.image,c.caption,c.likes);
    document.getElementsByClassName("layout-placeholder")[0].appendChild(card);
  })
}
const button = document.getElementById("load-more");
button.addEventListener("click",(event)=> {
  genCards()
})


const radios = document.querySelectorAll('input[name="filterBySource"]');
radios.forEach(r => {
  r.addEventListener("click",()=> {
    const selectedValue = document.querySelector('input[name="filterBySource"]:checked');
    const value = selectedValue.value;
    filterCards(value);
  })
})


const themebuttons = document.querySelectorAll('input[name="theme"]');
themebuttons.forEach(r => {
  r.addEventListener("click",()=> {
    const selectedValue = document.querySelector('input[name="theme"]:checked');
    const value = selectedValue.value;
    if(value == "darkTheme"){
      const cards = document.querySelectorAll(".card,.sidebar,.preview,.container");
      cards .forEach(c => {
        c.classList.add("dark-theme")
      })
      dark_theme = true;
    }else{
      const cards = document.querySelectorAll(".card,.sidebar,.preview,.container");
      cards .forEach(c => {
        c.classList.remove("dark-theme")
      })
      dark_theme = false;
    }
  })
})


const cardBackgroundColorBtn = document.getElementById("cardBackgroundColor");
cardBackgroundColorBtn.addEventListener("keyup",(e)=>{
const cardBackgroundColorBtn = document.getElementById("cardBackgroundColor");
  const cards = document.querySelectorAll(".card");
  cards .forEach(c => {
    c.style.backgroundColor = cardBackgroundColorBtn.value;
  })
})


const cardSpaceBetween = document.getElementById("cardSpaceBetween");
cardSpaceBetween.addEventListener("keyup",(e)=>{
  const cardSpaceBetweenBtn = document.getElementById("cardSpaceBetween");
  
    const placeholder = document.querySelectorAll(".layout-placeholder");
    placeholder.forEach(c => {
      c.style.setProperty("--gap",cardSpaceBetweenBtn.value);
    })
  })


  const numberOfColumns = document.getElementById("numberOfColumns");
  numberOfColumns.addEventListener("change",()=>{
  let number = document.getElementById("numberOfColumns").value;
  if(number == "dynamic") number = 2;
  const placeholder = document.querySelectorAll(".layout-placeholder");
  placeholder.forEach(c => {
    c.style['grid-template-columns'] = `repeat(${number}, auto)`
  })
  })


  document.addEventListener("click", function(e){
    const target = e.target.closest(".card_likes");
  
    if(target){

      const likes = target.querySelector(".number-likes");
      likes.innerHTML = Number(likes.innerHTML) + 1;
    }
  });


  const hide = document.getElementById("hideshow");
  hide.addEventListener("click",()=> {
      const sidebar = document.querySelector(".settings");
      sidebar.style.display = (sideHidden) ? "block" : "none";
      sideHidden = !sideHidden;
  })