const screen = document.getElementById('game-screen');

screen.width = innerWidth;
screen.height = innerHeight;

let game = new Game('game-screen');

const margin = 50;

game.init();

const reset = () => {
  
  game.universe.space.walls = [];
  game.universe.space.balls = [];
  game.universe.space.controllers = [];
  game.universe.space.blocks = [];
  
  game.score_board.gametime = 0;
  game.score_board.score = 0;
  game.score_board.message_shown = false;
  game.score_board.did_lose = false;
  game.score_board.did_win = false;
  game.score_board.message = null;
  game.score_board.color = 'rgba(100,100,100,0.4)';
  
  game.universe.space.add_Block(
    [
      (screen.width / 4),
      (screen.height / 2)
    ],
    40,
    40
  );
  game.universe.space.add_Planet(50, 0);
  game.play();
};

const add_vortex = (size = 0) => {
  game.universe.space.add_Controller(size, [screen.width/2,screen.height/2], 'fixed_1', 'transparent', 35000, 5000);
};

const add_black_holes = (number) => {
  for (let i = 0; i < number; i++) {
    game.universe.space.add_Controller(100, [(i+1) * screen.width/(number+1),screen.height/2], 'fixed_1', 'transparent', 35000, 5000);
  }
};

const add_ball_cloud = () => {
  for (let i = 0; i < 10; i++) {
    window.setTimeout( () => game.universe.space.add_Planet(33, 30), i * 400);
  }

  for (let i = 0; i < 20; i++) {
    window.setTimeout( () => game.universe.space.add_Planet(16, 30) , i * 333);
  }
  
  for (let i = 0; i < 33; i++) {
    window.setTimeout( () => game.universe.space.add_Planet(5, 30) , i * 500);
  }
};

const add_random_blocks = (number = 10) => {
  for (let i = 0; i < number; i++) {
    const side_length = Math.random() * 20 + 20;
    window.setTimeout( () =>
      game.universe.space.add_Block(
        [
          Math.random() * (screen.width - 2 * margin) + margin,
          Math.random() * (screen.height - 2 * margin) + margin
        ],
        side_length,
        side_length
      ),
      i * 200
    );
  }
};

game.universe.space.add_Block(
  [
    (screen.width / 4),
    (screen.height / 2)
  ],
  40,
  40
);
game.universe.space.add_Planet(50, 0);

game.play();
// setTimeout( () => game.stop(), 20);


document.addEventListener(
  'keypress',
  event => {
    if (event.key === 'b') {
      add_ball_cloud();
    }
    else if (event.key === 'n') {
      add_random_blocks(10);
    }
    else if (event.key === 'v') {
      add_vortex();
    }
    else if (event.key === 'm') {
      game.screen.screensaver = !game.screen.screensaver;
      game.universe.space.screensaver = !game.universe.space.screensaver;
    }
    else if (event.key === 'f') {
      add_black_holes(1);
    }
    else if (event.key === 'd') {
      game.screen.debug = !game.screen.debug;
    }
    else if (event.key === 'r') {
      reset();
    }
    else if (event.key === 'w') {
      game.universe.physics.active = !game.universe.physics.active;
    }
    else if (event.key === 'c') {
      game.universe.space.reset_Controllers();
    }
  }
);




const doubleG = () => { game.universe.physics.G *= 2 };

const halfG = () => { game.universe.physics.G *= 0.5 };
