class ScoreBoard {
  constructor() {
    this.score = 0;
    this.gametime = 0;
    if(!localStorage.getItem('highscore')) {
      localStorage.setItem('highscore', '0');
    }
    this.highscore = parseInt(localStorage.getItem('highscore'));
    this.did_win = false;
    this.did_lose = false;
    this.message_shown = false;
    this.message = null;
    this.color = 'rgba(100,100,100,0.4)';
  }
  
  update_score(space) {
    this.score += 100 * space.count_crashes * (1000 / this.gametime);
    this.score = Math.floor(this.score);
    space.count_crashes = 0;
  }
  
  update_gametime() {
    if (!this.did_win && !this.did_lose) {
      this.gametime += 1;
    }
  }
  
  show_message() {
    if (this.did_win && this.score > this.highscore) {
      localStorage.setItem('highscore', this.score.toString());
      this.message = (
        [
          `Nice Work!`,
          `You finished the game with ${this.score} points.`,
          `that's a new **highscore**, congrats!`
        ]
      );
    }
    else if (this.did_win) {
      this.message = (
        [
          'Good job!',
          `You finished the game with ${this.score} points.`,
          '',
          `Your current highscore is ${this.highscore} points by the way ;-)`
        ]
      );
    }
    else {
      this.message = (
        [
        'Game over!',
        'You lost all your bending balls,',
        `but still you got ${this.score} points!`,
        '',
        'press "r" for more ballbending practice'
        ]
      );
    }
    this.message_shown = true;
  }
  
  check_victory(space) {
    if (space.blocks.length === 0 && !this.message_shown) {
      this.score = Math.floor(this.score) * 2;
      this.color = 'rgba(10,200,10,0.4)';
      this.did_win = true;
    }
  }
  
  check_gameover(space) {
    if (space.balls.length === 0 && !this.did_win && !this.message_shown) {
      this.score = Math.floor(this.score);
      this.color = 'rgba(200,10,10,0.4)';
      this.did_lose = true;
    }
  }
  
  work_on(space) {
    if ((this.did_win || this.did_lose) && !this.message_shown) {
      this.show_message();
    }
    this.update_gametime();
    this.update_score(space);
    this.check_victory(space);
    this.check_gameover(space);
  }
}