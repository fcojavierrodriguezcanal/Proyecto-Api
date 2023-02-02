# Proyecto-Api

### 🔍 Análisis del problema




Queremos crear una rest api que disponga de un repositorio




#### 🤔 ¿Como lo vamos a ejemplificar?


Para ello usaré node con mongo para crear una api de diseño donde los usuarios, puedan ver, descargar y subir sus obras.







### 📐 Diseño de la solución

La Api dispondrá de dos tipos de usuarios:clientes(que podran comprar o descargar ciertas obras de arte) a estos les deberá llegar un correo con la confirmacion de su compra o descarga. También existirá el usuario artista que puede añadir nuevas obras de varios tipos(dibujos, libros, y quizas musica). El usuario artista recibirá una notificacion si un cliente ha comprado una de sus obras. Usare swagger para la documentación de la api