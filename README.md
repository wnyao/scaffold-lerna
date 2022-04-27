# scaffold-lerna

![Scafffold Lerna](https://github.com/wnyao/assets/blob/main/scafffold-lerna.png)

Opinionated lerna monorepo setup, get you up and running quick. Open to configure to your needs.

### Structure

```bash
.
├── .env # Global environment variables
├── lerna.json # Lerna config
├── package.json
└── packages
    ├── client
    ├── core
    └── server
```

- [@packages/core](./packages/core)
- [@packages/client](./packages/client)
- [@packages/server](./packages/server)

### Support

 ```
 React, React Router, Styled Components, TypeScript, i18n, Prettier, Husky, ExpressJs, Axios, webpack, Jest
 ```

### Installation

```bash
# install
npm install && npm run postinstall

# dev client
npm run dev:client

# dev server
npm run dev:server

# test client
npm run test:client

# test server
npm run test:server

# prod client
npm run prod:client

# prod server
npm run prod:server

# Add dependencies
npx lerna add \
  --scope=<@packages/core OR @packages/client OR @packages/server> \
  <package you want to install>
```

### Contributing

Any improvements to the base template are welcome. No strict contributing guidelines. Simply fork the repo and open a pull request with description.

### Reference

- [Lerna](https://lerna.js.org/)
