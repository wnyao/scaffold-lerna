# scaffold-lerna

Opinionated sample of lerna monorepo setup. Open to configure to your need.

### Structure

```
packages
├── client
├── core
└── server
```

- [@packages/core](./packages/core)
- [@packages/client](./packages/client)
- [@packages/server](./packages/server)

### Support

 ```
 React, React Router, Styled Components, TypeScript, i18n, ExpressJs, Axios, webpack, jest
 ```

### Installation

```bash
# install
npm install && npm run postinstall

# start client
npm run dev:client

# start server
npm run dev:server

# test client
npm run test:client

# test server
npm run test:server
```
