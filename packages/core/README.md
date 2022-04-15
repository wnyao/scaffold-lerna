# @packages/core

Opinionated shared setup, Anything underneath this directory can be shared across all packages. Usually we put shared code or functions in this place. Feel free to reconfigure to your need.

### Structure
```bash
.
├── README.md
├── client # Anything under for @packages/client
│   ├── components
│   ├── hooks
│   ├── routes
│   └── styles
├── i18n # scaffold-lerna comes with i18n setup
│   └── client
│       └── locales
│           ├── en_US
│           │   └── resource.json
│           └── zh_CN
│               └── resource.json
├── jest.config.js
├── lib # Any shared utilities
├── package-lock.json
├── package.json # Shared dependencies
├── scripts # Shared webpack configs
├── tsconfig.json # Share tsconfig
└── types
```
