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