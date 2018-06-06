# instrucciones.md, instrucciones_2.md, practica.md

Los archivos de markdown instrucciones.md y instrucciones_2.md son presentaciones de Beamer.
Se pueden generar los archivos de pdf con pandoc:

* pandoc instrucciones.md -t beamer -o instrucciones.pdf
* pandoc instrucciones_2.md -t beamer -o instrucciones_2.pdf
  
El archivo practica.md es guión de prácticas. Se puede generar el archivo pdf con pandoc:

* pandoc practica.md -o practica.pdf

Se puede instalar los paquetes que se necesitan en generación con MiKTeX Package Manager.
