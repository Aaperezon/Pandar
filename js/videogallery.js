let videogallery = () => {
    console.log("hello from videogallery.js ")
    var video = document.querySelectorAll('video');
    video.forEach(play => play.addEventListener('click',() =>{
        play.classList.toggle('active');
        if(play.classList.contains('active')){
            play.setAttribute("controls","")
        }else{
            play.removeAttribute("controls")
        }
        if(play.paused){
            play.play();
        }else{
            play.pause();
            play.currentTime=0;
        }
    }));
}
window.addEventListener("load", videogallery());