 // tomo el main del html con productos
const contenedorProductos = document.getElementById('contenedor-productos')
 // html productos en carrito
 const contenedorCarrito = document.getElementById('carrito-contenedor')
 // html boton vaciar carrito
 const botonVaciar = document.getElementById('vaciar-carrito')
 // span del precio total
const precioTotal = document.getElementById('precioTotal')

 let carrito = [] 




 const datos = async () => {
     const result = await fetch("js/data.json");
  
     const data = await result.json();
  
     console.log(data);
  
    
   data.forEach((producto) => {
   const div = document.createElement("div");


   div.classList.add("producto");


   div.innerHTML = `

     <img src=${producto.img} alt= "">

    <h3>${producto.nombre}</h3>

    <small id=descrip>${producto.descripcion}<small>

    <p class="precioProducto">Precio: $${producto.precio}</p>

     <button id="agregar${producto.id}" class="boton-agregar">Comprar</button>

    `;


   contenedorProductos.appendChild(div);

   

   const boton = document.getElementById(`agregar${producto.id}`);
   boton.addEventListener("click", () => {
    
     sumarAlCarrito(producto.id, data);
     


    Swal.fire({
      position: "top-end",


      icon: "success",


       title: "Has añadido un producto al carrito!",


      showConfirmButton: true,


      confirmButtonColor: "#35fb41d7",


      timer: 2000,
     });
   });
 });
};

 datos();



     const sumarAlCarrito = (prodId, data) => {

 // funcion para agregar al carrito un producto. Si el producto ya esta añadido, se incrementa la cantidad. Si no, se lo agrega al carro con metodo
         const existe = carrito.some (prod => prod.id === prodId) 
         if (existe){ 
             carrito.map (prod => { 
                 if (prod.id === prodId){
                      prod.cantidad++
                  }
              })
         } else { 
              const item = data.find((prod) => prod.id === prodId)
              carrito.push(item)
          }
         
          actualizarCarrito() 
         }
 // eliminar productos del carrito
 const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

     const indice = carrito.indexOf(item) 

     carrito.splice(indice, 1) 
    
     actualizarCarrito() 
 }

 const actualizarCarrito = () => {
   
     contenedorCarrito.innerHTML = "" 

     carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
         div.innerHTML = `
       <p id='prodcarrito'>${prod.nombre}</p>
         <p id="cantidad">Cantidad: ${prod.cantidad}</p>
         <p id='preciocar'>Precio: $${prod.precio}</p>
        <button class="boton-eliminar"></button>`
        
     

         contenedorCarrito.appendChild(div)
        
    const guardar = (clave, valor,data) => { localStorage.setItem (clave, valor,data)}
     for (const data of carrito) {
      guardar(data.nombre, data.cantidad, JSON.stringify(carrito));
     }
     localStorage.setItem('carrito', JSON.stringify(carrito))

     })
     //calculador precio
     precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
 }


  document.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem('carrito')){
          carrito = JSON.parse(localStorage.getItem('carrito'))
          actualizarCarrito()
      }
  })

 botonVaciar.addEventListener('click', () => {
     carrito.length = 0
     Swal.fire({
         title: 'Estas seguro?',
         icon: 'warning',
         showCancelButton: true,
         cancelButtonText: 'Cancelar',
         confirmButtonColor: '#ec42c4d7',
         cancelButtonColor: '#35fb41d7',
         confirmButtonText: 'Si, eliminar productos.'
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire(
             'Listo!',
             'Productos eliminados',
             'success'
             )
           actualizarCarrito() }
           })
         })
    

