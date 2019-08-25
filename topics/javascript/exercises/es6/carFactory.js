// car.js
var carFactory = (function() {
    function createCar(data) {
        var car = {
            make: data.make,
            model: data.model,
            value: data.value,
            engine: data.engine || '2000D',
            luxLevel: data.luxLevel || 'standard',
            depreciate: function(options) {
                this.value -= options.value;
            },
            setValue: function(value) {
                if (value < 0)
                    throw new Error('invalid value');
                this.value = value;
            },
            delayLogName: function(timeout) {
                timeout = timeout || 100;
                var that = this;
                setTimeout(function() {
                    console.log('name', that.make);
                }, timeout);
            },
            sayWroom: function() {
                return 'Wroom ' + this.make + ' ' + this.model;
            },
            addOptions(optionList) {
                this.options = this.options || []
                optionList.forEach(function(option) {
                    this.options.push(option)
                })
            },
            start(callback) {
                global.engine.start(function() {
                    callback
                });
            }
        };
        return car;
    }

    return {
        createCar: createCar
    }
})()

// main.js
const value = 50000
var options = {
    make: 'Bmw',
    model: '520',
    value
}
car = carfactory.createCar(options);

