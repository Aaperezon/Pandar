const background_canvas = document.getElementById("background-canvas")
const ctx = background_canvas.getContext("2d")

background_canvas.width = window.innerWidth
background_canvas.height = window.innerHeight
ctx.lineWidth = 0.09
// ctx.globalCompositeOperation = 'color'

class Root{
    constructor(x, y){
        this.x = x
        this.y = y
        this.speed_x = Math.random() * 4 - 2
        this.speed_y = Math.random() * 4 - 2
        this.max_size = Math.random() * 7 + 5
        this.size = Math.random() * 1 + 2
        this.velocity_size = Math.random() * 0.2 + 0.05

        this.angle_x = Math.random() * 6.2
        this.velocity_angle_x = Math.random() * 0.6 - 0.3
        this.angle_y = Math.random() * 6.2
        this.velocity_angle_y = Math.random() * 0.6 - 0.3
        this.lightness = 10
    }
    update(){
        this.x += this.speed_x + Math.sin(this.angle_x)
        this.y += this.speed_y + Math.sin(this.angle_y)
        this.size += this.velocity_size
        this.angle_x += this.velocity_angle_x
        this.angle_y += this.velocity_angle_y
        if(this.lightness < 70){
            this.lightness+= 0.5


        }
        if(this.size < this.max_size){
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fillStyle = 'hsl(140, 100%, '+this.lightness+'%)'
            ctx.fill()
            ctx.stroke()
            requestAnimationFrame(this.update.bind(this))
        }else{
            const flower = new Flower(this.x, this.y, this.size)
            flower.grow()
        }

    }
}
class Flower{
    constructor(x, y ,size){
        this.x = x
        this.y = y
        this.size = size
        this.velocity_size = Math.random() * 0.3 + 0.2
        this.max_size = this.size + Math.random() * 160
        this.image = new Image()
        this.image.src = "../images/flower.png"
        this.size > 9.5 ? this.will_flower = true : this.will_flower = false
        this.angle = 0
        this.velocity_angle = Math.random() * 0.05 - 0.025
    }
    grow(){
        if(this.size < this.max_size && this.will_flower){
            this.size += this.velocity_size  
            this.angle += this.velocity_angle 
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle)
            //for spreadsheet 
            // ctx.drawImage(this.image, source_x, source_y, source_width, source_height, this.x, this.y, this.size, this.size)
            ctx.drawImage(this.image, 0  - this.size/2, 0 - this.size/2, this.size, this.size)
            ctx.restore()
            requestAnimationFrame(this.grow.bind(this))
        }
       
    }
}

window.addEventListener('mousedown', function(e){
    for(let i = 0; i<4; i++){
        const root = new Root(e.x, e.y)
        root.update()
    }
})

for(let x = 400; x <= window.innerWidth; x+=18){
    for(let i = 0; i<2; i++){
        const root = new Root(x,  (window.innerHeight/2)+ (Math.sin(x)*100) )
        root.update()
    }
}

