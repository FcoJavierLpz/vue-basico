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
  el: '#app',
  data(){
    return {
      img:'images/pick.png',
      name:'titulo alternativo',
      url: 'htpps://...'
    }
  }
})
```
Use:
```html
<img v-bind:src="img" v-bind:alt="name"/>
<a v-bind:href="url">
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
  el: '#app',
  data(){
    return {
      changePercent:0
    }
  }
})
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
  el: '#app',
  data(){
    return {
      prices: [1233, 1233, 19397, 98763],
      pricesWithDays: [
        { day: 'Lunes', value: 8400 },
        { day: 'Martes', value: 7900 },
        { day: 'Miercoles', value: 8200 }
      ],
    }
  }
})
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
  el: '#app',
  data(){
    return {
      changePercent:0,
      price:8944
    }
  }
})
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
    v-bind:key="p.day">
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
  <h1> {{ title }} </h1>
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
  el: '#app',
  data(){
    value: 0
  }
})
```
Use:
```html
<input type="number" v-model="value"/>
<span>{{ value }}</span>
```

