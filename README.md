## product manager entregable v1.0

## Objetivo del proyecto

### Descripción

Backend de practica de un "e-commerce" con persistencia de datos en archivos

### Estado Actual

En proceso

## Instrucciones de uso

1. Clonar el repositorio
2. **npm install**
3. usar **npm run dev** para iniciar modo desarrollador

### Servidor corriendo en http://localhost:8080

## API Endpoints

### Productos

-   **<code>GET</code> /api/products** 
> devuelve un array con todos los productos listado, acepta limit como parametro en la query, con el maximo de productos que se desea listar

-   **<code>GET</code> /api/products/:pid** 
> devuelve 1 objecto con las propiedades del producto requerido por el pid, si el producto no existe devuelve un status 404, y un objeto con la propiedad "error" y un mensaje de producto no encontrado

-   **<code>POST</code> /api/products** 
> recibe un body con las propiedades title, description, code, price, stock, category, status(este opcional)
> en caso de crear el producto, lo devuelve con el id generado, sino devuelve un array con los problemas encontrados

-   **<code>PUT</code> /api/products/:pid** 
> recibe el id por parametro del producto a modificar, y un body con las propiedades a cambiar
> si lo modifica devuelve el producto modificado, sino devuelve un array con los problemas encontrados

-   **<code>DELETE</code> /api/products/:pid** 
> recibe un id por parametro del producto a eliminar, 
> si lo pudo eliminar devuelve un status 200 con el mensaje "Product deleted", sino devuelve un 400 con un mensaje de producto no borrado, o un 404 con un mensaje de producto no encontrado

### Carritos

-   **<code>POST</code> /api/carts** 
> Genera un nuevo carrito

-   **<code>GET</code> /api/carts/:cid** 
> devuelve 1 objecto con las propiedades del carrito requerido por el id del parametro, si el carrito no existe ...

-   **<code>POST</code> /api/carts/:cid/product/:pid**
> recibe un body con las propiedades ... , en caso de crear el producto, lo devuelve con el id generado, sino ...
