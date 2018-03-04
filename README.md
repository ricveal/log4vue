# log4vue

> It works with Vue.js 2.x

## Installation

```bash
npm install log4vue --save
```

or using Yarn:

```bash
yarn add log4vue
```

## Usage

```js
// ready
import log4vue from 'log4vue';

Vue.use(log4vue, {
  prefix: () => new Date(),
  shortname: true,
})
```

```js
// using
export default {
  ready () {
    // when shortname is set to true.
    this.$error('hello world');

    // using in global
    Vue.console.log('hello world');
    // or
    this.$console.log('hello world');

    // as window object
    window.logger.log('hello world');
  }
}
```

The default level group are `['log', 'debug', 'warn', 'error']`, but you can modify them using
'levels' property in configuration:

```js
Vue.use(vueLogger, { levels: ['info'] });

this.$info('hello world');
```

### Options

| Name      | Type    | Default                                  | Description                              |
| --------- | ------- | ---------------------------------------- | ---------------------------------------- |
| prefix    | string  | None                                     | The prefix can be dynamically generated  |
| severity       | boolean | true                                     | Allows you to set which message will be shown |
| shortname | boolean | true                                     |                                          |
| levels    | array   | ['log', 'debug', 'warn', 'error'] |                                          |

## Development Setup

```bash
# install deps
yarn

# build dist files
yarn build

# run all tests
yarn test

# run linter
yarn lint
```

