let navigation= document.querySelector('.navigation');
let toogle= document.querySelector('.toogle');
toogle.onclick = function(){
    navigation.classList.toggle('active');
}
var video = document.querySelectorAll('video');
video.forEach(play => play.addEventListener('click',() =>{
    play.classList.toggle('active');
    if(play.paused){
        play.play();
    }else{
        play.pause();
        play.currentTime=0;
    }
}));


let init = () =>{

    const btnEmpezar = document.getElementById('btnEmpezar');
    btnEmpezar.addEventListener("click",() => {
        document.getElementById('index').setAttribute("hidden","")
    
        fetch('./videosgallery.html')
        .then(response=> response.text())
        .then(text=> document.getElementById('main-container').innerHTML = text);
    })
}
window.addEventListener("load", init());