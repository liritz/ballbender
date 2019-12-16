class Time {
  constructor(interval = 25) {
    this.interval = interval;
    this.actions = []
  }
  
  makes(action, target) {
    this.actions.push( setInterval( () => { action(target) },this.interval) );
  }
  
  stop() {
    this.actions = [];
  }
}