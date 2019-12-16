class Game {
  constructor(screen) {
    this.universe = new Universe(screen);
    this.control_panel = new ControlPanel(screen);
    this.score_board = new ScoreBoard();
    this.screen = new Renderer(screen, 60);
    this.screen.initialize(this.universe);
  }
  
  play() {
    this.stop();
    this.universe.exist();
    this.screen.show(this.universe, this.score_board);
  }
  
  stop() {
    this.universe.physics.stop();
    this.screen.stop();
  }
  
  init() {
    this.connect_control()
  }
  
  load(saved_json) {
    console.log(saved_json);
    const saved_space = JSON.parse(saved_json);
    console.log(saved_space);
    this.universe.space.import(saved_space);
  }
  
  save() {
    return JSON.stringify(this.universe.space.export())
  }
  
  save_locally() {
    const key = prompt(
      `
      If you want to save this game
      please enter a name for this save
      `
    );
    if (key) {
      localStorage.setItem(key, this.save());
      alert(`game has been saved to key: ${key}`);
    }
  }
  
  load_locally() {
    const key = prompt(
      `
      If you want to load a game
      please enter a name of the save
      `
    );
    if (key) {
      if (localStorage.getItem(key)) {
        this.load(localStorage.getItem(key));
        alert(`game ${key} has been loaded from storage`);
      }
      else {
        alert(`sorry, game ${key} was not found`)
      }
      
    }
  }
  
  connect_control() {
    this.control_panel.connect(this.universe.space);
    
    document.addEventListener(
      'keypress',
      event => {
        if (event.key === 'a') {
          this.play();
        }
        else if (event.key === 's') {
          this.stop();
        }
        else if (event.key === 'l') {
          this.load_locally();
        }
        else if (event.key === 'k') {
          this.save_locally();
        }
      }
    );
  }
  
  
}