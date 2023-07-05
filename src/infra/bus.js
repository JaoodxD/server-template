'use strict';

const { EventEmitter } = require('node:events');
module.exports = class Bus {
  #ee;
  #services;
  constructor() {
    this.#ee = new EventEmitter();
    this.#services = new Map();
  }

  subscribe(eventName, handler) {
    this.#ee.on(eventName, handler);
    return true;
  }

  publish(eventName, payload) {
    return this.#ee.emit(eventName, payload);
  }

  command(serviceName, payload) {
    const service = this.#services.get(serviceName);
    if (!service) throw new Error(`No such service: ${serviceName}`);
    return service(payload ?? {});
  }

  registerService(name, service) {
    this.#services.set(name, service);
  }
};
