let init = () =>{
    let main_container = document.getElementsByClassName("main-container")
    let navigation= document.querySelector('.navigation');
    let toogle= document.querySelector('.toogle');
    toogle.onclick = function(){
        navigation.classList.toggle('active');
        // if(navigation.classList.contains('active') && window.getComputedStyle(main_container).display!='none'){
        if(navigation.classList.contains('active')){
            for(var i  = 0; i < main_container.length; i++){
                main_container[i].style.left = "20vw"
            }
        }else{
            for(var i  = 0; i < main_container.length; i++){
                main_container[i].style.left = "12vw"
            }
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
    //Function to hide every div of the main container (right content on the page)
    let hide_all = () =>{
        for(var i  = 0; i < main_container.length; i++){
            main_container[i].setAttribute("style","display:none;")
        }
    }
    hide_all()

    //LOAD videosgallery dinamically
    fetch('./videosgallery.html')
    .then(response=> response.text())
    .then(text=> {
        document.getElementById('videosgallery').innerHTML = text
        if(navigation.classList.contains('active')){
            for(var i  = 0; i < main_container.length; i++){
                main_container[i].setAttribute("style","left: 20vw;")
            }
        }
        document.getElementById('videosgallery').setAttribute("style","display:none;")
        let new_script = document.createElement("script")
        new_script.src = "./js/videogallery.js"
        document.body.appendChild(new_script)
    });
    const btnEmpezar = document.getElementById('btnEmpezar');
    btnEmpezar.addEventListener("click",() => {
        document.getElementById('index').setAttribute("style","display:none;")
        document.getElementById('videosgallery').setAttribute("style","display:block;")
    })


    const btnInicio = document.getElementById('btnInicio');
    btnInicio.addEventListener("click",() => {
        hide_all()
        document.getElementById('index').setAttribute("style","display:active;")

    })
    //END of videosgallery


    //LOAD historias dinamically
    fetch('./historias.html')
    .then(response=> response.text())
    .then(text=> {
        document.getElementById('historias').innerHTML = text
        if(navigation.classList.contains('active')){
            for(var i  = 0; i < main_container.length; i++){
                main_container[i].setAttribute("style","left: 20vw;")
            }       
        }
        document.getElementById('historias').setAttribute("style","display:none;")
        let new_script = document.createElement("script")
        new_script.src = "./js/historias.js"
        document.body.appendChild(new_script)
    });
    const btnHistorias = document.getElementById('btnHistorias');
    btnHistorias.addEventListener("click",() => {
        hide_all()
        document.getElementById('index').setAttribute("style","display:none;")
        document.getElementById('historias').setAttribute("style","display:block;")
    })
    //END of historias


    //LOAD productos dinamically
    fetch('./productos.html')
    .then(response=> response.text())
    .then(text=> {
        document.getElementById('productos').innerHTML = text
        if(navigation.classList.contains('active')){
            for(var i  = 0; i < main_container.length; i++){
                main_container[i].setAttribute("style","left: 20vw;")
            }       
        }
        document.getElementById('productos').setAttribute("style","display:none;")
        let new_script = document.createElement("script")
        new_script.src = "./js/productos.js"
        document.body.appendChild(new_script)
         
    });
    const btnProductos = document.getElementById('btnProductos');
    btnProductos.addEventListener("click",() => {
        hide_all()
        document.getElementById('index').setAttribute("style","display:none;")
        document.getElementById('productos').setAttribute("style","display:block;")
    })
    //END of productos


    //LOAD faqs dinamically
    fetch('./faqs.html')
    .then(response=> response.text())
    .then(text=> {
        document.getElementById('faqs').innerHTML = text
        if(navigation.classList.contains('active')){
            for(var i  = 0; i < main_container.length; i++){
                main_container[i].setAttribute("style","left: 20vw;")
            }           
        }
        document.getElementById('faqs').setAttribute("style","display:none;")
        let new_script = document.createElement("script")
        new_script.src = "./js/faqs.js"
        document.body.appendChild(new_script)
    });
    const btnPreguntas = document.getElementById('btnPreguntas');
    btnPreguntas.addEventListener("click",() => {
        hide_all()
        document.getElementById('index').setAttribute("style","display:none;")
        document.getElementById('faqs').setAttribute("style","display:block;")
      
    })
    //END of faqs


}
window.addEventListener("load", init());