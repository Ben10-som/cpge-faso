function createPopup(_popup) {
    // Create a popup
    let popupNode = document.querySelector("#popup");
    let overlay = popupNode.querySelector(".overlay");
    let closeBtn = popupNode.querySelector(".close-btn");
    console.log("what's up",popupNode);
   console.log(overlay);
    console.log(closeBtn);  
    function openPopup (){
        popupNode.classList.add("active");

    }


    function closePopup() {
    popupNode.classList.remove("active");
    }

    overlay.addEventListener("click", closePopup);
    closeBtn.addEventListener("click", closePopup);
    return openPopup;

}

let popup = createPopup("#popup");
console.log(popup);
document.querySelector("#open-popup").addEventListener("click", popup);


function createPopup(_popup2) {
    // Create a popup
    let popupNode = document.querySelector("#popup2");
    let overlay = popupNode.querySelector(".overlay");
    let closeBtn = popupNode.querySelector(".close-btn");
    console.log(popupNode);
    console.log(overlay);
    console.log(closeBtn);
    function openPopup (){
        popupNode.classList.add("active");

    }


    function closePopup() {
    popupNode.classList.remove("active");
    }

    overlay.addEventListener("click", closePopup);
    closeBtn.addEventListener("click", closePopup);
    return openPopup;

}

let popup2 = createPopup("#popup2");
console.log(popup2);
document.querySelector("#open-popup2").addEventListener("click", popup);