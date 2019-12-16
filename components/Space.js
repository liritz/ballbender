class Space {
  constructor(size = [window.innerWidth,window.innerHeight], color = 'rgba(0,0,0,0.1)') {
    this.color = color;
    this.width = size[0];
    this.height = size[1];
    this.balls = [];
    this.blocks = [];
    this.controllers = [];
    this.paddles = [];
    this.walls = [];
    this.screensaver = false;
    this.count_crashes = 0;
    
    this.V = new Vector(); // This vector provides the space with a vector-factory
  }
  
  export() {
    return ({
      color: this.color,
      width: this.width,
      height: this.height,
      balls: this.balls,
      blocks: this.blocks,
      walls: this.walls
    });
  }
  
  import({color, width, height, balls, blocks, walls}) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.balls = balls;
    this.blocks = blocks;
    this.walls = walls;
  }
  
  add_Block(center = [], width = 40, height = 40) {
    this.blocks.push(new Block(this.blocks.length, center, [0,0], [width, height], 'firebrick'));
  }
  
  add_Wall(start, width = 10) {
    this.walls.push(new Wall(this.walls.length, start, start, width));
  }
  
  change_Wall(stop) {
    if (this.walls.length > 0) {
      this.walls[this.walls.length - 1].stop = new Vector(...stop);
    }
  }
  
  get ontology() {
    return [...this.balls, ...this.balls, ...this.paddles];
  }
  
  get area() {
    return new Rectangle(new Interval(0, this.width), new Interval(0, this.height));
  }
  
  clear_outside() {
    // remove every ball that is not inside the limits of space anymore.
    if (this.balls.filter(thing => !this.area.isInside(thing.state.pos)).length !== 0) {
      this.balls = this.balls.filter(thing => this.area.isInside(thing.state.pos));
    }
  }
  
  clear_crashed_things() {
    const before = this.blocks.length;
    this.blocks = this.blocks.filter(b => b.hitpoints > 0);
    const after = this.blocks.length;
    this.count_crashes = Math.max(before - after, 0);
  }
  
  add_Ball(size = 30,pos = [this.width/2, this.height / 2], spe = this.V.random().val,
           color = '#'+Math.floor(Math.random()*16777215).toString(16)) {
    this.balls.push(new Ball(this.balls.length, pos, spe, size, color));
  }
  
  // add_Wall(pos, size) {
  //   this.walls.push(new Block(this.walls.length, pos, [0,0], size));
  // }
  
  // Controller:
  
  add_Controller(size = 20, pos, id, color, gravity_mass = 100000, collision_mass = 50000) {
    this.controllers.push(new Controller(id, pos, [0,0], size, color, gravity_mass, collision_mass))
  }
  
  move_Controller(pos, pointerId) {
    const controller = this.controllers.find(ctr => ctr.id === `controller_${pointerId}`);
    if (controller) {
      controller.state.pos = new Vector(...pos);
    }
  }
  
  remove_Controller(pointerId) {
    console.log(`should remove controller_${pointerId}`);
    this.controllers = this.controllers.filter(c => `controller_${pointerId}` !== c.id)
  }
  
  reset_Controllers() {
    // this.controllers = this.controllers.filter(c => c.id === 'controller_fixed_1');
    this.controllers = [];
  }
  
  // Just for fun:
  
  add_Planet(size, distance_to_center = 0) {
    this.balls.push(
      new Ball(
        this.balls.length,
        new Vector(this.width/2, this.height / 2).plus(this.V.random(distance_to_center)).val,
        [0,0],
        size,
        '#'+Math.floor(Math.random()*16777215).toString(16)
        ));
  }
  
}