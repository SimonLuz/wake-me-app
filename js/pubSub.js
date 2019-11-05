// ******************************************************************
// PubSub Module 
// ******************************************************************

export const pubsub = (function() {
    
    return {
        
        events: {},
        
        subscribe: function(eventName, fn, data1) {
//            console.log(this)
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(fn);
//            console.log(this.events)
        },
        
        unsubscribe: function(eventName, fn) {
            if (this.events[eventName]) {
                for (let i=0; i<this.events[eventName].length; i++) {
                    if (this.events[eventName][i] === fn) {
                        this.events[eventName].splice(i, 1);
                        break;
                    }
                }
            }
        },
        
        emit: function(eventName, data1, data2) {
            if (this.events[eventName]) {
                this.events[eventName].forEach(function(fn) {
                    fn(data1, data2);
                })
            }
        }
    
    }
        
})();

