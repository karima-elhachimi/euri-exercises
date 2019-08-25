// improve code with ES6+ features

export class Car {
    #power = 0;
    constructor(options) {
        const default = {
            engine: '200D',
            luxLevel: 'standard',
        }
        Object.assign(this, default, options)
    }

    depreciate ({ value }) {
        this.value -= value
    }

    set power (power) {
        if (power < 0)
            throw new Error('invalid value')
        this.#power = power
    }

    get power() {
        return this.#power;
    }

    delayLogName (timeout = 100) {
        setTimeout(() => {
            console.log('name', this.make)
        }, timeout)
    }

    sayWroom () {
        return `Wroom ${this.make} ${this.model}`
    }

    setOptions(optionList) {
        this.options.push(...optionList)
    }

    start() {
        return new Promise(resolve => {
            engine.start(resolve)
        })
    }

}

// main.js
import { Car } from './car'

const value = 50000
var car = new Car({
    make: 'Bmw',
    model: '520',
    value,
})

