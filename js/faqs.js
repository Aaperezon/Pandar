let faqs = () => {
    console.log("hello from faqs.js")
    var acc=document.getElementsByClassName('accordion');
    for(var i = 0; i < acc.length; i++){
        acc[i].addEventListener('click',function(){
            this.classList.toggle('active-preguntas');
            var panel=this.nextElementSibling;
            if(panel.style.maxHeight){
                panel.style.maxHeight=null;
            }else{
                panel.style.maxHeight=panel.scrollHeight + 'px';
            }
        })
    }
}
window.addEventListener("load", faqs());
