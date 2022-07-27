let productos = () => {
    console.log("hello from productos.js")
    var last_page
    let productos= document.querySelectorAll('.producto');
    var productos_array = Array.prototype.map.call(productos, function(element) {
        element.onclick = function(){
            //LOAD detallesProducto dinamically
            fetch('./detallesProducto.html')
            .then(response=> response.text())
            .then(text=> {
                last_page = document.getElementById('productos').innerHTML
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
                let regresarBtn = document.getElementById("regresarBtn")
                regresarBtn.addEventListener("click", () => {
                    console.log("regresar clicked")
                    document.getElementById('productos').innerHTML = last_page
                })

                AIRecommendations()

            });
            //END of detallesProducto
        
        }
    });

    let AIRecommendations = () => {
        console.log("Analysing")
    fetch('./classifier.json')
        .then(response => response.json())
        .then(train_data => {
        init(train_data);
        })
        .catch(error => console.log(error));      
  

        const init = async function(train_data) {
            let waitForImage = (image) =>{
                return new Promise(resolve => {
                image.onload = function () {
                        resolve('resolved');
                    }
            });
        }

        const classifier = knnClassifier.create();
        const mobilenetModule = await mobilenet.load();

        for(var i = 0; i < train_data.length; i++ ){
            for(var j = 1; j <= train_data[i].quantity; j++){
            var image = new Image();
            image.src = './images/'+train_data[i].folder+'/'+j+'.jpg';
            await waitForImage(image)
            var logits = mobilenetModule.infer(image, true);
            classifier.addExample(logits, train_data[i].class);
            }
        }

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
          
              // Pick a remaining element.
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
        }


        //Create Async Function
            // Make a prediction.
            const x = tf.browser.fromPixels(document.getElementById('ProductImg'));
            const xlogits = mobilenetModule.infer(x, true);
            console.log('Predictions:');
            const result = await classifier.predictClass(xlogits);
            console.log(result.confidences);
            var key_result = Object.keys(result.confidences).reduce((a, b) => result.confidences[a] > result.confidences[b] ? a : b)
            console.log( key_result )

            var recommendations = train_data[key_result-1].recommendations
            recommendations = shuffle(recommendations)

            let sugerencia= document.querySelectorAll('.sugerencia');
            let titulo= document.querySelectorAll('.titulo');
            let precio= document.querySelectorAll('.precio');
            for(var s = 0; s < 4; s++){
                sugerencia[s].src = './images/'+train_data[key_result-1].folder+'/'+recommendations[s].image_src
                titulo[s].innerHTML = recommendations[s].title
                precio[s].innerHTML = "$ "+Number(recommendations[s].price).toFixed(2)
            }


        }
    }
   

}
setInterval( productos, 1000);
// window.addEventListener("load", productos());