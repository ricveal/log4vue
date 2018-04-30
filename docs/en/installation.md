# Installation

### Direct Download / CDN

[https://unpkg.com/log4vue/dist/log4vue.js](https://unpkg.com/log4vue/dist/log4vue.js)


Include `log4vue` after Vue and it will install itself automatically:

``` html
<script src="/path/to/vue.js"></script>
<script src="/path/to/log4vue.js"></script>
```

### npm

``` bash
npm install log4vue
```

When used with a module system, you must explicitly install the router via `Vue.use()`:

``` js
import Vue from 'vue'
import Log4Vue from 'log4vue'

Vue.use(Log4Vue)
```

You don't need to do this when using global script tags.

### Dev Build

You will have to clone directly from GitHub and build `log4vue` yourself if
you want to use the latest dev build.

``` bash
git clone https://github.com/ricveal/log4vue.git node_modules/log4vue
cd node_modules/log4vue
npm install
npm run build
```
