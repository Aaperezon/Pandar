let init = () =>{
    let main_container = document.getElementById('main-container')

    let navigation= document.querySelector('.navigation');
    let toogle= document.querySelector('.toogle');
    toogle.onclick = function(){
        navigation.classList.toggle('active');
        if(navigation.classList.contains('active') && window.getComputedStyle(main_container).display!='none'){
            document.getElementById('main-container').setAttribute("style","left: 20vw;")
        }else if (window.getComputedStyle(main_container).display!='none'){
            document.getElementById('main-container').setAttribute("style","left: 12vw;")
        }
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


    const btnEmpezar = document.getElementById('btnEmpezar');
    document.getElementById('main-container').setAttribute("style","display:none;")

    btnEmpezar.addEventListener("click",() => {
        document.getElementById('main-container').setAttribute("style","display:block;")
        document.getElementById('index').setAttribute("style","display:none;")
        fetch('./videosgallery.html')
        .then(response=> response.text())
        .then(text=> {
            document.getElementById('main-container').innerHTML = text
            if(navigation.classList.contains('active')){
                document.getElementById('main-container').setAttribute("style","left: 20vw;")
            }
        });
    })
}
window.addEventListener("load", init());