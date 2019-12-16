class Renderer {
  constructor(canvas_id, framerate) {
    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext('2d');
    this.refresh_time = 16;
    // this.refresh_time = Math.ceil(1000 / framerate);
    this.actions = [];
    this.screensaver = false;
    this.debug = false;
  }
  
  initialize(universe) {
    this.canvas.height = universe.space.height;
    this.canvas.width = universe.space.width;
    this.draw(universe);
  }
  
  show(universe, score_board) {
    this.actions.push(
      setInterval(
        () => {
          this.draw(universe);
          score_board.work_on(universe.space);
          this.drawScoreBoard(score_board);
        },
        this.refresh_time
      )
    );
  }
  
  stop() {
    this.actions.forEach(act => clearInterval(act));
    this.actions = [];
  }
  
  draw(universe) {
    // collect all the rendering functions and call them
    this.renderSpace(universe.space);
  }
  
  drawScoreBoard(score_board) {
    if (!this.screensaver && !this.debug) {
      this.ctx.fillStyle = score_board.color;
      this.ctx.fillRect(10, 10, 200, 50);
  
      this.ctx.fillStyle = score_board.color;
      this.ctx.fillRect(10, 70, 200, 50);
  
      this.ctx.fillStyle = 'lightgrey';
      this.ctx.font = '25px sans-serif';
      this.ctx.fillText(`${Math.floor(score_board.gametime/62.5)}s Gametime`, 25, 105);
  
      this.ctx.fillStyle = 'lightgrey';
      this.ctx.font = '25px sans-serif';
      this.ctx.fillText(`${score_board.score} Points`, 25, 45);
      if (!!score_board.message) {
        this.ctx.fillStyle = score_board.color;
        this.ctx.font = '40px sans-serif';
        for (let i = 0; i < score_board.message.length; i++) {
          this.ctx.fillText(score_board.message[i], 10, i * 100 + 230);
        }
      }
    }
  }
  
  renderSpace(space) {
    if (this.screensaver) {
      this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
      this.ctx.fillRect(0, 0, space.width, space.height);
    }
    else {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, space.width, space.height);
      // this.ctx.clearRect(0, 0, space.width, space.height);
  
      space.walls.forEach(w => this.renderWall(w));
      
      if (this.debug) {
        space.walls.forEach(w => this.renderClosestPoint(space.balls[0], w)); // Just for debugging
        space.controllers.forEach(c => this.renderBall(c));
      }
  
      space.paddles.forEach(p => this.renderBlock(p));
      space.blocks.forEach(b => this.renderBlock(b));
    }
    
    space.balls.forEach(b => this.renderBall(b));
  }
  
  renderWall(wall) {
    this.ctx.beginPath();
    this.ctx.moveTo(...wall.start.val);
    this.ctx.lineTo(...wall.stop.val);
    this.ctx.lineWidth = wall.width;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = wall.color;
    this.ctx.stroke();
  }
  
  // Just for debugging purposes! this comment as well!
  renderClosestPoint(ball, wall) {
    const closest_point = wall.area.closestPointTo(ball.state.pos);
    const representation = new Ball(0, closest_point.val, [0,0], 10, 'limegreen');
    this.renderBall(representation);
  }
  
  renderBlock(block) {
    
    this.ctx.fillStyle = block.color;
    this.ctx.fillRect(
      block.area.horizontal.start,
      block.area.vertical.start,
      block.size.width,
      block.size.height
    );
  }
  
  renderBall(ball) {
    let area = ball.area;
    
    this.ctx.beginPath();
    this.ctx.arc(area.center.x, area.center.y, area.radius, 0, 2 * Math.PI, false);
    // this.ctx.shadowColor = ball.color;
    // this.ctx.shadowBlur = 5;
    this.ctx.fillStyle = ball.color;
    this.ctx.fill();
  }
}