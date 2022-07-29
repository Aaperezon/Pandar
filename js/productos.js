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
                cryptoTransaction()

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
                })
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
    let cryptoTransaction = () =>{
        //Crypto transactions
        let contract
        let wallet_connected = false
        let isWalletConnected = () =>{
        if(wallet_connected == true)
        return true
        let contract_address = "0x02E50Cd722c125978618D0683c76BaFa56c85958"
        let contract_abi  = pandar_abi
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        contract = new ethers.Contract(contract_address, contract_abi, signer)
        // console.log("Account:",  signer.getAddress());
        wallet_connected = true
        return true
        }
    
        const addProduct = (event) => {
        isWalletConnected()
        console.log("boton agregar articulo")
        contract.newProduct(document.getElementById("id1").value, document.getElementById("price").value,document.getElementById("quantity1").value)
        }
    
    
    
        let cryptoBtn = document.getElementById("cryptoBtn")
        cryptoBtn.addEventListener("click",() => {
        console.log("crypto button")
        isWalletConnected()
        console.log("boton comprar articulo")
        contract.buyProduct(document.getElementById("id2").value, document.getElementById("quantity2").value)
        })
    }

    
   

}

// setInterval( productos, 1000);
window.addEventListener("load", productos());