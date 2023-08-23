# Node.JS server template

Main idea behind this project is to build template for simple, flexible and robust Node.JS backend server.

# Goals
Here will be features list to implement to reach certain version
## To v0.0.1

- [x] Add `infra` folder for future infrastructure elements.
- [x] Add `lib` folder for core helper modules.
- [x] Add `schemas` folder for user-defined data schemas.
- [x] Add `services` folder with nested `api`, `internal` and `external` folders
- [x] Implement `event bus` with `Publish/Subscribe` (pub/sub) and `Command` pattern interfaces.  
~~- [ ] Implement `http` server based on [`fastify`](https://www.npmjs.com/package/fastify) npm module.~~
- [x] Implement `http` interface with pluggable HTTP server.
- [x] Implement custom module loader with optional `DI`.
- [ ] Add services autoload.
  - [ ] `api` should contain services available via `http` and `event bus`.
  - [ ] `internal` should contain services available only via `event bus`.
  - [ ] `external` should contain definitions for external api calls.

## Features for future
- [ ] Add optional [`ajv`](https://ajv.js.org/) schema validator to `api` incoming `payload` and returning `result`.
- [ ] Add cli util to generate `d.ts` for `services`.
- [ ] hot reload of an individual module.
- [ ] Optional mixin of user metadata (session info, access control, etc.)
