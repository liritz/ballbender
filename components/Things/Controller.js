class Controller extends Ball {
  constructor(id, position = [0,0], speed = [1,1], size = 30,
              color = '#'+Math.floor(Math.random()*16777215).toString(16),
              gravity_mass = 200000, collision_mass = 20000) {
    super(id, position, speed, size, color);
    this.type = `controller`;
    this.id = `${this.type}_${id}`;
    this.state.mov = false;
    this.state.last_pos = new Vector(...position);
    this.gravity_mass = gravity_mass;
    this.collision_mass = collision_mass;
  }
  
  get mass() {
    return this.gravity_mass;
  }
  
}