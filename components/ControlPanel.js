console.log('loaded Controller.js');

class ControlPanel {
  constructor(screen) {
    this.element = document.getElementById(screen);
    this.controller_size = 60;
    this.mode = ('ontouchstart' in window) ? 'touch' : 'no-touch';
  }
  
  get color() {
    return 'yellow';
    // return '#'+Math.floor(Math.random()*16777215).toString(16);
  }
  
  connect(space) {
    
    const { controllers } = space;
    const { element, color, mode } = this;
    
    if (mode === 'touch') {
      
      element.addEventListener(
        'touchstart',
        event => {
          event.preventDefault();
          space.reset_Controllers();
          const touches = event.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            space.add_Controller(
              this.controller_size,
              [
                event.touches[i].clientX - element.offsetLeft,
                event.touches[i].clientY - element.offsetTop
              ],
              touches[i].identifier,
              color
            );
          }
        }
      );
      
      element.addEventListener(
        'touchmove',
        event => {
          event.preventDefault();
          const touches = event.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            space.move_Controller(
              [
                event.touches[i].clientX - element.offsetLeft,
                event.touches[i].clientY - element.offsetTop
              ],
              touches[i].identifier
            );
          }
        }
      );
      
      element.addEventListener(
        'touchcancel',
        event => {
          event.preventDefault();
          space.reset_Controllers();
        }
      );
      
      element.addEventListener(
        'touchend',
        event => {
          event.preventDefault();
          space.reset_Controllers();
        }
      );
      
    }
    
    else {
      // not touch optimized
      
      element.onpointerdown = event => {
        event.preventDefault();
        const place = [
          event.offsetX,
          event.offsetY
        ];
        if (event.altKey) {
          space.add_Block(
            place
          );
        }
        else if (event.shiftKey) {
          space.add_Wall(
            place,
            25
          );
        }
        else {
          space.reset_Controllers();
          space.add_Controller(
            this.controller_size,
            place,
            event.pointerId,
            color
          );
        }
      };
      
      element.addEventListener(
        'pointermove',
        event => {
          event.preventDefault();
          const place = [
            event.offsetX,
            event.offsetY
          ];
          if (event.altKey) {
            // silence
          }
          else if (event.shiftKey) {
            space.change_Wall(
              place
            )
          }
          else {
            space.move_Controller(
              place,
              event.pointerId
            );
          }
        }
      );
  
      element.onpointerup = event => {
        event.preventDefault();
        if (event.altKey) {
          // silence
        }
        else {
          space.reset_Controllers();
        }
      };
    }
  }
}