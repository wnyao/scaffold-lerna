# @packages/server

Opinionated restful api server setup.

### Structure
```bash
./src
├── api # api folders
├── index.ts
├── lib # utilities
├── routes
│   ├── constant.ts
│   ├── index.ts
│   └── util.ts
├── services
│   ├── cookie # setup your cookies
│   ├── index.ts
│   ├── logger # winston as logger
│   └── server # server setup
└── tests
```

### Tools

```bash
Typscripts, ExpressJs, Winston, Jest
```

### Sample API

```bash
# Sample api
curl -v localhost:8082/server/test
```
