class Vectormath {
  constructor() {
    this.author = 'Linus';
  }
  
  plus(vect, other) {
    return vect.map((v,i) => v + other[i]);
  }
  
  minus(vect, other) {
    return vect.map((v,i) => v - other[i]);
  }
  
  times(vect, num) {
    return vect.map(v => v * num);
  }
  
  length(vect) {
    return Math.sqrt(vect.reduce((t,v) => t + v * v, 0));
  }
  
  norm(vect) {
    return this.times(vect, 1 / this.length(vect));
  }
  
  to(vect, other) {
    return this.minus(other, vect);
  }
  
  distanceTo(vect, other) {
    return this.length(this.to(vect, other));
  }
}
