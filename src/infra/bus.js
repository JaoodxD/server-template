'use strict';

const { EventEmitter } = require('node:events');
module.exports = class Bus {
  #ee;
  #services;
  constructor() {
    this.#ee = new EventEmitter();
    this.#services = new Map();
  }

  /**
   * 
   * @param {String} eventName 
   * @param {(any: any[]) => any} handler 
   * @returns {Boolean}
   */
  subscribe(eventName, handler) {
    this.#ee.on(eventName, handler);
    return true;
  }

  /**
   * 
   * @param {string} eventName 
   * @param {object?} payload 
   * @returns {boolean}
   */
  publish(eventName, payload) {
    return this.#ee.emit(eventName, payload);
  }

  /**
   * 
   * @param {string} serviceName 
   * @param {object?} payload 
   * @returns {any}
   */
  command(serviceName, payload) {
    const service = this.#services.get(serviceName);
    if (!service) throw new Error(`No such service: ${serviceName}`);
    return service(payload ?? {});
  }

  /**
   * 
   * @param {string} name 
   * @param {(any: any[]) => any} service 
   */
  registerService(name, service) {
    this.#services.set(name, service);
  }
};
