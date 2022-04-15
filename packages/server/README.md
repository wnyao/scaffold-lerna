# @packages/server

Opinionated restful api server setup, Feel free reconfigure to your need.

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
Typscripts, ExpressJs, winston
```

### Sample API

```bash
# Sample api
curl -v -b "./cookie.txt" localhost:8082/server/test
```
