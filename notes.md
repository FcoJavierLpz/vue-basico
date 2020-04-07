# Apuntes Curso Básico de Vue

## Expresiones y propiedades

**Ejemplo:**

```html
<div id="app">
  <h1>{{ title }}</h1>
  <p>{{ 1 + 1 + 1 }}</p>
  <p>{{ true || false }}</p>
  <p>{{ true ? true : false }}</p>
  <p>{{ 'string'.toUpperCase() }}</p>
  <p>{{ JSON.stringify({ name: 'Francisco' }) }}</p>
</div>
```

## Atributos Dinámicos

**Directivas:**

v-bind: Se alipca sobre directivas html y te permite definir valores dinamicos (enlazados al estado de la aplicación) en los atributos aplicados

**Tip:**

Necesitamos hacer uso de directivas, es una herramienta que nos provee Vue para poder manipular el DOM

**Ejemplo:**

Syntax JS:

```js
new Vue({
  el: "#app",
  data() {
    return {
      img: "images/pick.png",
      name: "titulo alternativo",
      url: "htpps://...",
    };
  },
});
```

Use:

```html
<img v-bind:src="img" v-bind:alt="name" /> <a v-bind:href="url"></a>
```

## Control de Flujo con Directivas

**Directivas:**

v-if, v-else-if, v-else : Remueve los elementos del DOM

v-show : Modifica la propiedad display de css para mostrar u ocultar los elementos

**Tip:**

Si el elemento esta cambiando constantemente por performance es mejor hacer uso del v-show (evita menos mutaciones en el DOM), de lo contrario utilizar v-if

**Ejemplo:**

Syntax JS:

```js
new Vue({
  el: "#app",
  data() {
    return {
      changePercent: 0,
    };
  },
});
```

Use:

```html
<span v-if="changePercent > 0">👍</span>
<span v-else-if="changePercent < 0">👎</span>
<span v-else>🤞</span>

<span v-show="changePercent > 0">👍</span>
<span v-show="changePercent < 0">👎</span>
<span v-show="changePercent === 0>🤞</span>
```

## Renderizado de Listas

**Directivas:**

v-for : Además de arrays planos, nos permite iterar sobre un array objetos

**Tips:**

**Key:** Rastrea la identidad de cada nodo y, por lo tanto, reutiliza y reordena los elementos existentes. Un valor ideal para key sería el ID único de cada elemento.
Se recomienda proporcionar una key con v-for siempre que sea posible, a menos que el contenido DOM iterado sea simple.
**index:** Accede al elemento indice que representa a cada elemento dentro del array.

**Ejemplo:**

Syntax JS:

```js
new Vue({
  el: "#app",
  data() {
    return {
      prices: [1233, 1233, 19397, 98763],
      pricesWithDays: [
        { day: "Lunes", value: 8400 },
        { day: "Martes", value: 7900 },
        { day: "Miercoles", value: 8200 },
      ],
    };
  },
});
```

Use:

```html
<ul>
  <li v-for="(p, i) in prices" v-bind:key="p">
    {{ i }} - {{ p }}
  </li>
  # Objects
  <li v-for="(p, i) in pricesWithDays" v-bind:key="p.day">
    {{ i }} - {{ p.day }} - {{ p.value }}
  </li>
</ul>
```

## Modo abreviado

Vue.js proporciona abreviaturas especiales para dos de las directivas más utilizadas, v-bind y v-on :

### v-bind Abreviado

```html
<!-- full syntax -->
<a v-bind:href="url"> ... </a>

<!-- abreviado -->
<a :href="url"> ... </a>
```

### v-on Abreviado

```html
<!-- full syntax -->
<a v-on:click="doSomething"> ... </a>

<!-- abreviado -->
<a @click="doSomething"> ... </a>
```

## Manejo de Eventos

**Methods:** Objeto de la instancia de Vue donde se puede definir funciones, que se pueden utilizar en diferentes contexto, principalmente para atacharse a eventos que pueden ser disparados por la vista.

**Directivas:**

v-on: Directiva que sirve para escuchar eventos del DOM, tales como onclick, onmouseover, mouseout, entre otros, para ejecutar alguna función.

**Tips:**

Cualquier evento valido del DOM es posible utilizarlo con la directiva v-on.

**Ejemplo:**

Syntax JS:

```js
new Vue({
  el: '#app',
  data(){
    ...
  },
  methods: {
    toggleShowPrices () {...}
  },
})
```

Use:

```html
<span v-on:click="toggleShowPrices">
  {{ showPrices ? '🙈' : '🐵'}}
</span>
```

## Clases CSS en tiempo real

Directivas:
v-bind

**Tips:**

El uso de clases dinámicas con v-bind se pueden combinar con clases sin v-bind asignando una clase por default.

**Ejemplo:**

Syntax JS:

```js
new Vue({
  el: "#app",
  data() {
    return {
      changePercent: 0,
      price: 8944,
    };
  },
});
```

Use:

```html
// Ternary
<h1 v-bind:class="changePercent > 0 ? 'green' : 'red'">Texto</h1>
```

```html
// String y Object
<ul>
  <li
    class="uppercase"
    v-bind:class="{{ orange: p.value ==== price, red: p.value < price, green: p.value > price }}"
    v-for="(p, i) in pricesWithDays"
    v-bind:key="p.day"
  >
    {{ i }} - {{ p.day }} - {{ p.value }}
  </li>
</ul>
```

## Estilos CSS en tiempo real

Directivas:

v-bind

**Tips:**

color: Debe ser alguna propiedad en Data

**Ejemplo:**

```html
<div id="app" v-bind:style="{ background: '#' + color }">...</div>
```

## Computed Properties

Son aquellas propiedades que se generan a patir de los valores de otras propiedades, son funciones que siempre devuelven un valor y se declaran dentro de la instancia de vue.

**Ejemplo:**

Syntax:

```js
computed: {
    title () {
      return `${this.coin.name} - ${this.coin.symbol}`
    }
  }
```

Use:

```html
<h1>{{ title }}</h1>
```

## Watchers

A partir del cambio u observación de alguna variable se dispara una función.

El nombre de la función se debe corresponder con el nombre de una propiedad de data

**Ejemplo:**

```js
  watch: {
    showPrices(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  }
```

## Two-Way Data Binding

**Directivas:**

v-model: Permite linkear las cosas que puede escribir el usuario a través de un formulario con las propiedades que tenemos definidas dentro de data.

**Ejemplo:**

Syntax JS:

```js
new Vue({
  el: "#app",
  data() {
    value: 0;
  },
});
```

Use:

```html
<input type="number" v-model="value" /> <span>{{ value }}</span>
```

## Componentes Custom

**Vue.component().** Registra un componente en Vue, lo cual nos permite crear pequeños componentes para reutilizar a través de la aplicación. Recibe 2 parametros el nombre y un objeto que nos permitirá disponer de data, template, methods, watchers, computed, excepto 'el: '#app''.
**new Vue().** Siempre vamos a tener una única instancia de Vue que representa la aplicación, luego los componentes que se vayan creando va a depender de esta instancia.

**Ejemplo**

Syntax JS:

```js
Vue.component('counter0, {
  data(){
    return {
      counter: 0
    }
  },
  template: `
    <div>
      <button>Click me!</button>
      <span>{{ counter }}</span>
    </div>
  `
})
```

Use:

```html
<counter></counter>
```

## Comunicación entre Componentes (padre a hijo): propiedades

**props.** Nos permite definir cuales son las propiedades que el componente padre le va a enviar al componente hijo, estas tienen la misma funcionalidad que las propiedades dentro de data (se pueden acceder a través de this).

El componente hijo que hereda las propiedades no puede modificarlas ya que pertenecen al componente padre.
Para pasarle al componente hijo las propiedades se realiza a través de sus atributos como en html con ayuda de la directiva v-bind, estas propiedades podrian agruparse en un objeto de propiedades y hacer referencia con v-bind al objeto definido.

**Ejemplo**

```js
Vue.component('CoinDetail', {
  props: ['coin'],
  ...
}
```

Use:

```html
<coin-detail
  v-on:change-color="updateColor"
  v-bind:coin="btc">
</coin-detal>
```

## Formato de Nomenclatura Componentes/propiedades

Vue automaticamente parsea el formato pascalCase al formato kebab-case (nomenclatura con guiones), lo cual permite una consistencia para los tags de Html, aunque se podria seguir usando el formato pascalCase en el custom tag html

**Ejemplo**

```js
Vue.component('CoinDetail', {
  ...
}
```

Use:

```html
<coin-detal
  v-bind:title="title"
  v-bind:change-percent="changePercent"
></coin-detal>
```

## Comunicación entre Componentes (hijo a padre): eventos

Las propiedades del componente padre nunca deben ser actualizadas por el componente hijo, en caso de que estas propiedades cambien el hijo debe de notificar por estos cambios al componente padre a través de eventos.
Al momento de emitir eventos se puede enviar un valor como parametro.

**Ejemplo**

Componente Hijo

```js
methods: {
  toggleShowPrices () {
    this.$emit('change-color', this.showPrices ? 'FF96C8' : '3D3D3D')
  }
}
```

Use:

```html
<coin-detail v-on:change-color="updateColor"> </coin-detail>
```

Componente padre:

```js
methods: {
  updateColor (color) {
    this.color = color || this.color
      .split('')
      .reverse()
      .join('')
  }
}
```

## Slots

API de distribución de contenido, que permite que un componente padre inyecte a un componente hijo. Hay muchos casos que en lugar de recibir propiedades, necesitan recibir contenido html.
Contenido customizable que puede ser referenciado a través de los templates con la directiva v-slot y el nombre del slot.

**Ejemplo**
1 slot
Componente Padre:

```html
<coin-detail v-on:change-color="updateColor">
  <p>lorem ipsum...</p>
</coin-detail>
```

Use:
Componente Hijo:

```js
<slot></slot> // Renderiza el contendio del tag <p></p>
```

Multiple slots (name slots). Asignarle un nombre a cada slots para que pueda ser reemplazados por el contenido correspondiente. Para hacer uso de los name slots se debe hacer uso del tag template (Nos permite rendirazar contendido sin inyectar el tag en el DOM).
Componente Padre:

```html
<coin-detail v-on:change-color="updateColor">
  <template v-slot:text>
    <p>Lorem ipsum, dolor sit amet</p>
  </template>

  <template v-slot:link>
    <a href="#">Link!</a>
  </template>
</coin-detail>
```

Use:
Componente Hijo:

```js
<slot name="text"></slot>
<slot name="link"></slot>
```

## Ciclo de vida y hooks

1. beforeCreated
2. created (Recomendado para solicitar información a un API Rest)
3. beforeMount
4. Mounted (Se encuentra disponible el DOM)
5. beforeUpdate
6. updated
7. beforeDestroy
8. destroyed

**Tip:** Componente padre y componente Hijo. Se dispara en el sig. orden:

- Created
- Created Child
- Mounted Child
- Mounted

![LiceCycle Diagram](https://es.vuejs.org/images/lifecycle.png)

## Vue-Cli

npm install -g @vue/cli

@. Significa que el cli pertenece a la organización de Vue.

**Ejemplo**

Crear un proyecto:

```
vue create platzi-exchange
```

## Single File Components

Son archivos .vue que nos ofrece el framework para poder trabajar con la lógica (css, template, js) dentro de un mismo componente.

**Estructura:**

```vue
//App.vue

<template>
  <div id="app">...</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
...
export default {
  name: '#app', //nombre del componente
  components: { //Sustituye la función Vue.Compoent()
    HelloWorld // Componentes importados
  },
  props: { //Permite indicar el nombre y el tipo de dato
    msg: String
    assets: {
      type: Array,
      default: () => []
    },
    obj: {
      type: Object,
      default: () => {}
    },
    isBoolean: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
/** Indica que el estilo pertenece solo a ese componente. **/
...;
</style>
```

```js
//main.js . Encargado de importar el componente principal e inyectarselo en la instancia de Vue.
//Cuando no tiene un path relativo hace referencia a un modulo ó libreria npm.
import Vue from "vue";

new Vue({
  render: (h) => h(App), // Es una forma de reemplazar el seteo de la aplicación dentro de nuestro componente
}).$mount("#app"); //Tiene el mismo proposito que tenia el elemento el:'#app'
```

## Funcionalidades, UI y comandos básicos

**npm run lint.** Detectar errores de linteo

**npm run build.** Generar la aplicación en modo producción. Genera una carpeta dist.

**npm i -g serve.** Permite generar un servidor web local:

**serve -s dist.** Levanta un localhost.

**vue ui.** Genera una aplicación web local, que mediante una interfaz de usuario permite gestionar los proyectos de Vue.
preset. A medida que van creando proyectos con determinada configuración, el cli de vue permite guardar esa configuración para más adelante poder utilizarla al momento de crear un proyecto.

## Setup Tailwind CSS

Tailwind CSS, es un framework de utilidad basada en clases.

vue add @ianaya89/tailwind // Es un comando del CLI que permite agregar plugins dentro del proyecto

- Genera un archivo tailwind.js en el root del proyecto
- Agrega plugins dentro del postcss.config.js
  dentro de src/assets/css genera un archivo tailwind.css
- Agrega en el package.json la dependencia
- Para utilizarlo en el proyecto se debe importar en el main.js:
  - import "@/assets/css/tailwind.css"
  - @ Es un pequeño truco de webpack y vue para hacer referencia de manera relativa al directorio src.

## Setup de Vue Router

npm i -S vue-router

- Crear un archivo llamado router.js
- Vue.use(‘xxx’) permite instalar o incorporar plugins o utilidades que tenga la librería.
- <router-view /> componente que permite establecer cual es el código de html que se reemplazará a medida que se vaya cambiando la ruta.
- v-router ofrece un componente llamado <router-link> que sirve para direccionar de una pagina a otra, necesita la propiedad to para indicarle el path hacia donde va a redirigir.

```js
import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Error from "@/views/Error";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "*",
      name: "error",
      component: Error,
    },
  ],
});
```

```html
<router-view class="container px-5 sm:px-20 py-20 flex justify-center" />

<router-link class="mt-5 text-xl text-green-600 hover:underline" to="/"
      >Volver a la página de Inicio</router-link
```

## Fetch

Una vez creada el api.js, simplemente podemos enviar la petición a tráves del hook created(), y después mapear la respuesta de la API con una de las propiedades dentro de data.

api.js

```js
const url = "https://api.coincap.io/v2";

function getAssets() {
  return fetch(`${url}/assets?limit=20`) // Devuelve una promesa lo cal debe retornarse
    .then((res) => res.json()) //resp.json() Es una promesa de res
    .then((res) => res.data);
}

export default {
  getAssets,
};
```

## UI con filtros

Utilidad de Vue.js que nos permite modificar el valor de la vista de una propiedad sin modificar el valor de la propiedad.
Permite formatear algún valor para mostrar en la interfaz de usuario.

Vue.filter() Registrar un nuevo filtro en la aplicación, recibe 2 argumentos, el nombre del filtro y la fn a ejecutar.

Use:

```html
<td>{{ a.priceUsd | dollar }}</td>
<td>{{ a.marketCapUsd | dollar }}</td>
```

## Rutas dinámicas

- **this.\$route.** Permite acceder a los valores de la url (params, queryString), disponible en cada instancia de vue a través del Vue Router.
- El nombre del parametro debe coincidir con el definido dentro del router.js
- ( :someparam ) Indica que es un parametro
- Promise.all() Es una función que nos permite ejecutar diferentes promises de manera simultanea a través de un array de promesas y con then manejar todas las promesas cuando hayan terminado a través de un array de resultados.

```js
//router.js
{
  path: '/coin/:id',
  name: 'coin-detail',
  component: CoinDetail
}

//CoinDetail.vue
methods: {
  getCoin() {
    const id = this.$route.params.id

    Promise.all([api.getAsset(id), api.getAssetHistory(id)]).then(
      ([asset, history]) => {
        this.asset = asset
        this.history = history
      }
    )
  }
}
```

## Navegación Programática

:to="{}" Con la directiva v-bind (:) a diferencia de to="/", este recibe un objeto, como primer parametro recibe el nombre, params para indicarle los parametros, pudieran ser dinamicos: params: { id: a.id } }
La ventaja es que si las rutas llegan a cambiar el name se sigue manteniendo y es más fácil el mantenimiento.

```html
<router-link
  class="hover:underline text-green-600"
  :to="{ name: 'coin-detail', params: { id: a.id } }"
>
  {{ a.name }} >
</router-link>
```

this. $ router (diferente a this.$route). Permite acceder a la instancia del router y utilizarlo para navegar.
A través de push() permite agregar nuevas rutas al stack del router y tener una navegación prograática.

```js
 methods: {
    goToCoin(id) {
      this.$router.push({ name: 'coin-detail', params: { id } })
    }
  }
```

## Componentes de terceros (VueSpinners)

- Realizamos una simple instalación con npm install:
  - npm install --save @saeris/vue-spinners
- Importar la libreria en el main.js
  - import { VueSpinners } from '@saeris/vue-spinners'
- Decirle a Vue que haga uso de la libreria en el main.js
  - Vue.use(VueSpinners)

```html
<bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
<px-assets-table v-if="!isLoading" :assets="assets" />
```

```js
created() {
  this.isLoading = true

  api
    .getAssets()
    .then(assets => (this.assets = assets))
    .finally(() => (this.isLoading = false))
}
```

## Problemas de Reactividad

El problema de reactividad se origina por que vue no puede detectar si una propiedad existe debido a que fue agregada después que el objeto se creo y esta propiedad no esta siendo rastreada por vue, ya sea porque no se establecieron en data o que no se establecierón cuando el objeto fue creado y las dependencias se agregarón y se trackearon por vue.

Los problemas de reactividad solo existen en arrays u objetos.
Para solucionarlo:

**this.\$set** Cuando quiero agregar una propiedad nueva o eliminar una propiedad existente de un objeto definido en la funcción data.

```js
this.$set(this.someObject, ‘propiedadNueva’, valor)
```

## Filtros y ordenar

```js
computed: {
  filteredAssets() {
    const altOrder = this.sortOrder === 1 ? -1 : 1

    return this.assets
      .filter(
        a =>
          a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
          a.name.toLowerCase().includes(this.filter.toLowerCase())
      )
      .sort((a, b) => {
        if (parseInt(a.rank) > parseInt(b.rank)) {
          return this.sortOrder
        }

        return altOrder
      })
  }
},
```

```html
<tr
  v-for="a in filteredAssets"
  :key="a.id"
  class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
></tr>

<th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
  <span class="underline cursor-pointer" @click="changeSortOrder">Ranking</span>
</th>
```

## Links y conversión

Un problema común al trabajar con vue-router y páginas dinámicas, cuando cambia el parámetro y se mantiene dentro de la misma vista el componente no se vuelve a crear desde cero, y no se refresca el contenido; para resolver este problema, es necesario utilizar un “watch”

```js
//App.vue
data() {
  return {
    links: [
      {
        title: 'BTC',
        to: { name: 'coin-detail', params: { id: 'bitcoin' } }
      },
      {
        title: 'ETH',
        to: { name: 'coin-detail', params: { id: 'ethereum' } }
      },
      {
        title: 'XRP',
        to: { name: 'coin-detail', params: { id: 'ripple' } }
      }
    ]
  }
}
```

```html
<px-header :links="links" />
```

```js
//PxHeader

props: {
  links: {
    type: Array,
    default: () => []
  }
}
```

```html
<!-- PxHeader Template -->
<router-link
  v-for="l in links"
  :key="l.title"
  :to="l.to"
  class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
  >{{ l.title }}</router-link
>
```
