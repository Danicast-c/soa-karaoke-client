# Karaoke 99


Karaoke 99 es una plataforma de Karaoke que permite a los usuarios registrarse y acceder con su cuenta a una lista de canciones para cantar, si los usuarios son de tipo premium tienen la opcion de modificar canciónes y sus letras asi como añadir canciones nuevas al sistema.

## Diseño e Implementación
### Diagramas C4
<!-- #### Nivel 1: Contexto -->
<!-- ![lvl1](https://user-images.githubusercontent.com/18470228/136119457-d01267fc-454d-4763-a263-62b07d8865b0.png) -->


#### Nivel 1: Contexto
<p align="center">
<img src="http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Danicast-c/soa-karaoke-client/gh-pages/c4/level1.puml"  />
</p>



#### Nivel 2: Contenedores
<p align="center">
<img src="http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Danicast-c/soa-karaoke-client/gh-pages/c4/level2.puml"  />
</p>

#### Nivel 3: Componentes
<p align="center">
<img src="http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Danicast-c/soa-karaoke-client/gh-pages/c4/level3.puml" />
</p>

#### Nivel 4: C

<p align="center">
<img src="http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Danicast-c/soa-karaoke-client/gh-pages/c4/level4.puml"  />
</p>


### Lenguajes de Programación
Para la creación de REST APIs y web apps existen diferentes lenguajes populares que pueden usarse. Por ejemplo, está PHP, JavaScript (con Node), Ruby, Python, las cuales son todas opciones válidas para la resolución de este proyecto. Sin embargo, de entre todas estas destaca especialmente Node.js, el runtime de JavaScript para el servidor que ha explotado en popularidad en la última década, principlamente por la fácilidad de programar en él y la portabilidad, siendo muy fácil correr un proyecto de Node en una máquina nueva.

Otra área en la que Node se ha vuelto muy popular en los últimos años es para el desarrollo de interfaces, o clientes front-end. Con bibliotecas como Vue, React, Svelte se vuelve muy fácil y rápida la creación de interfaces.

Debido a estos beneficios y la familiaridad de los desarrolladores de este proyecto con Node, se eligió esta tecnología para la creación de tanto el back-end como del front-end.

### Frameworks / Toolkits
#### Front-end: Nuxt JS
Como se discutió en la sección anterior, existen muchos frameworks para el desarrollo de interfaces web. Según el informe [State of JS del año 2020](https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/), los frameworks más populares son React, Angular, y Vue.js. Todos son increíblemente populares en la industria y cumplen su función de acelerar el desarrollo de front-ends.

Para este proyecto, se decidió utitizar el framework de interfaz Vue.js, debido a su facilidad de uso (en comparación con React, el cual tiene una curva de aprendizaje muy grande) y mayor flexibilidad (en comparación con Angular). Además, los desarrolladores de este proyecto tenían familiaridad con el framework, lo que ayudó a la elección.

Para complementar Vue, se utilizó un framework llamado Nuxt.js. Este framework agrega funcionalidades a Vue.js, facilitando el renderizado del lado del servidor, generando rutas automáticamente, entre otras funcionalidades que Vue por solo no incluye. Esto facilita y permite generar una interfaz sencilla y limpia que permite desarrollar la pagina de Karaoke rapidamente. 


Usando Nuxt.js y Vue.js, se programó toda la interfaz, la cual cuenta con pantallas iniciales de registro e inicio de sesión. Se tiene un menú principal donde se encuentran la lista de canciones para reproducir, a través de la cual es posible acceder a la vista para editar canciones, incluir nuevas o eliminarlas.


#### Back-end: Nest JS
Para el back-end, Node igualmente ofrece variedad de frameworks listos para usar. Desde iniciar solo con Express, sobre el cual se puede montar manualmente todo lo que necesite nuestro servidor, hasta usar bibliotecas más completas, que traen todo lo necesario para empezar (batteries included), como lo son FeathersJS, NestJS, entre otras. Analizando las diferentes opciones, se decidió usar NestJS por que se determinó que era la biblioteca más completa, tanto en términos de características como de documentación, además de una gran cantidad de plug-ins creados por la comunidad. 

Una característica interesante de NestJS es que adopta la rigidez de Angular respecto a módulos, servicios y componentes, lo cual al inicio es raro para un proyecto de back-end y aumenta la curva de aprendizaje al tener que adaptarse al estilo de programación que impone el framework, sin embargo, a medida que progresa el desarrollo, se van viendo los beneficios que da esta arquitectura, ya que separa muy bien cada módulo de la aplicación, eliminando dependencias entre ellos, lo cual puede facilitar en el futuro separar cada módulo en un microservicio totalmente aparte.

### Base de Datos: MongoDB
  Para la base de datos, se optó por utilizar MongoDB, una base de datos no relacional muy popular. La razón principal por la que se optó por usar Mongo en lugar de una base de datos relacional es por su facilidad de uso, permitiendo un prototipado rápido de la aplicación, ya que MongoDB almacena documentos que se pueden convertir fácilmente a JSON u objetos JavaScript, lo que ahorra el tiempo a los desarrolladores de estar cambiando el esquema cada vez que se decide hacer un cambio, como sí ocurriría con una base de datos relacional como lo es SQL.

Otro beneficio provisto por MongoDB es compatibilidad con la biblioteca TypeORM, un ORM (Object-Relational mapping) para TypeScript, que permite manejar fácilmente los datos en la base de datos como objetos nativos de TypeScript, haciendo la asignación de atributos tan fácil como cambiar una variable de un objeto.

### Estandares de Programación
### Organización de los proyectos de código.





<!-- You can use the [editor on GitHub](https://github.com/Danicast-c/soa-karaoke-client/edit/gh-pages/index.md) to maintain and preview the content for your website in Markdown files. -->

<!-- Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files. -->

<!-- Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
``` -->
<!-- 
For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/Danicast-c/soa-karaoke-client/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out. -->
