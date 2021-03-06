# Typescript React Redux Boilerplate

[![Build Status](https://travis-ci.org/kaykayehnn/typescript-react-redux-boilerplate.svg?branch=master)](https://travis-ci.org/kaykayehnn/typescript-react-redux-boilerplate)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<img src="https://user-images.githubusercontent.com/19822240/52233118-ef9a1900-28c6-11e9-9cb2-a81e9b34df09.png" alt="TRRB Logo" width="150">

### What's included:

- React & Redux
- TypeScript
- Webpack
- SASS & CSS Modules
- Service Worker support
- Jest & React testing library
- Hot Module Replacement
- ESLint & Prettier
- Redux DevTools via Chrome extension

### Usage

- Clone the project
- `rm -rf .git`
- `git init`
- Update `package.json` with relevant settings (name, description, keywords, etc.)
- Update `LICENSE`
- Review all lines (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>) annotated with "FIXME:" and change where needed if defaults don't suit your use case

**ADVICE:** Check out [trrb-cli](https://github.com/kayKayEhnn/trrb-cli)

See [Commands](#commands) for more information.

---

### Folder Structure

The example folder structure is inspired by Angular and offers the ability to group files both by feature and by type. As the React docs say, [don't overthink it](https://reactjs.org/docs/faq-structure.html#dont-overthink-it). Folder structures have their advantages and disadvantages and pondering over it is just a waste of time.

The master branch contains only a minimal subset of the folder structure in order to allow faster setup. For a full look of the folder structure check out the [example branch](https://github.com/kayKayEhnn/typescript-react-redux-boilerplate/tree/example).

```
.
├── public
├──── index.html
├──── static
├────── images
├────── fonts
├────── icons
├────── etc.
├
├── src
├──── components
├────── {Component}
├──────── index.ts
├──────── {Component}.component.tsx
├──────── {Component}.module.scss
├──────── {Component}.test.tsx
├──── containers
├────── {Container}
├──────── index.ts
├──────── {Container}.container.tsx
├──────── {Container}.test.tsx
├──── declarations
├────── styles.d.ts
├──── store
├────── actions
├──────── {State}.action.ts
├──────── index.ts
├────── reducers
├──────── {State}
├────────── {State}.reducer.ts
├────────── {State}.test.ts
├────────── index.ts
├────── state
├──────── App.state.ts
├──────── {State}.state.ts
├────── configureStore.ts
├──── types
├────── Redux.ts
├────── {Model}.ts
├──── utilities
├────── app.ts
├──── index.tsx
├──── polyfills.ts
├──── style.css
├
├── package.json
├── tsconfig.json
```

### The src folder

#### Components

All presentational components reside here. They can be split in two types:

- **Views** - views are usually passed to connect function and later serve as app routes.
- **Subcomponents** - subcomponents are smaller and serve as building blocks for the views.

These components should receive any app state through props, their stateful concerns are limited to UI state. Props shape is defined in a container as the union of MapStateFromProps and MapDispatchFromProps for views and as an interface in the same file for subcomponents.

Component folders consist of 4 files for ease of navigation in editor (Quick Open is useful when searching by component name) and brevity when importing (@Components/Component instead of @Components/Component/Component).

#### Containers

**Containers** export higher-order components, connecting views to the Redux store. They define the data passed to components via MapStateToProps and the actions they can trigger via MapDispatchToProps. Those mappings use modified interfaces (`types`) which enforce certain restrictions and simplify the usage of built-in types in redux and react-redux.

#### Declarations

**Declarations** serve for defining usage of miscellaneous file types, which get processed by webpack loaders, e.g. styles, vectors, graphql etc.

#### Store

**Actions** define action types and action creators. They also export a union of their action types, which is then used in reducers.
**Actions** define action types and action creators. Each state piece also exports a union of its action types, which are later merged in AppActions.ts.

**Reducers'** signatures are defined using State and ActionType types and by using `switch..case` branches for each action we get strong typing via [Discriminated Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions).

**State** holds shape definitions of the different pieces of data the reducers manage. AppState shows the shape of the whole state tree.

#### Types

**Types** hold application-specific contracts (models, enums, etc.) . The Redux types specify overridden definitions of intrinsic redux and react-redux types. They serve for brevity when defining containers and actions but they also solve type definitions problems with defining props for container components.

#### Top level files

**Index** is the bundle entry point. It renders `<App />` and shouldn't hold any program logic.

**App** is the root component. It renders wrapper components and specifies app routes.

**Polyfills** is an entry point containing polyfills for older browsers. They get processed in a separate bundle for better long-term caching and are loaded unconditionally as their size tends to be negligible comprared to other assets.

**Style** is the entry point for global styles and importing CSS frameworks.

---

### Commands

Install dependencies

```bash
npm install
```

Run development server

```bash
npm start
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

### Credits

- [Create React App](https://github.com/facebook/create-react-app)
