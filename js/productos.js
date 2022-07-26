let productos = () => {
    console.log("hello from productos.js")
    let productos= document.querySelectorAll('.producto');

    var productos_array = Array.prototype.map.call(productos, function(element) {
        element.onclick = function(){
            //LOAD detallesProducto dinamically
            fetch('./detallesProducto.html')
            .then(response=> response.text())
            .then(text=> {
                document.getElementById('productos').innerHTML = text
                if(navigation.classList.contains('active')){
                    for(var i  = 0; i < main_container.length; i++){
                        main_container[i].setAttribute("style","left: 20vw;")
                    }       
                }
                document.getElementById('productos').setAttribute("style","display:none;")
                // let new_script = document.createElement("script")
                // new_script.src = "./js/productos.js"
                // document.body.appendChild(new_script)
            });
            const btnProductos = document.getElementById('btnProductos');
            btnProductos.addEventListener("click",() => {
                hide_all()
                document.getElementById('index').setAttribute("style","display:none;")
                document.getElementById('productos').setAttribute("style","display:block;")
            })
            //END of detallesProducto
        
        }
    });
   

}
window.addEventListener("load", productos());