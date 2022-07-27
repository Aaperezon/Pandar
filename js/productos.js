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
                var ProductImg= document.getElementById("ProductImg");
                var SmallImg=document.getElementsByClassName("small-img");
                SmallImg[0].onclick= function()
                {
                    ProductImg.src=SmallImg[0].src; 
                }
                SmallImg[1].onclick= function()
                {
                    ProductImg.src=SmallImg[1].src; 
                }
                SmallImg[2].onclick= function()
                {
                    ProductImg.src=SmallImg[2].src; 
                }
                SmallImg[3].onclick= function()
                {
                    ProductImg.src=SmallImg[3].src; 
                }
            });
            //END of detallesProducto
        
        }
    });
   

}
window.addEventListener("load", productos());