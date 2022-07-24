let historias = () => {
    console.log("hello from historias.js")
    document.getElementById("boton1").addEventListener("click", () => {
        window.location.reload()
    })

}
window.addEventListener("load", historias());