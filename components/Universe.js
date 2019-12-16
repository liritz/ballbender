class Universe {
  constructor(screen) {
    //this.time = new Time();
    this.domElement = document.getElementById(screen);
    this.space = new Space([this.domElement.width,this.domElement.height]);
    this.physics = new Physics(this.space);
  }
  
  exist() {
    this.physics.happens();
    //this.time.makes( this.physics.workOn, this.space);
  }
}