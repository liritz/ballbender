// 2 D Elements

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  get val() {
    return [this.x, this.y]
  }
  
  set val(arr) {
    this.x = arr[0];
    this.y = arr[1];
  }
  
  copy() {
    return new Vector(this.x, this.y);
  }
  
  randomise(factor = 1) {
    let l = this.length;
    
    this.x = 2 * Math.random() - 1;
    this.y = 2 * Math.random() - 1;
    
    this.length = l === 0 ? factor : factor * l;
  }
  
  random(factor = 1) {
    let result = new Vector();
    result.randomise(factor);
    return result;
  }
  
  plus(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }
  
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  
  minus(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }
  
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }
  
  times(num) {
    return new Vector(this.x * num, this.y * num);
  }
  
  multiply(num) {
    this.x *= num;
    this.y *= num;
  }
  
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  
  set length(new_length) {
    this.norm();
    this.multiply(new_length)
  }
  
  get direction() {
    let result = this.copy();
    result.norm();
    return result;
  }
  
  norm() {
    let factor = 1 / this.length;
    if (isFinite(factor)) {
      this.multiply(factor);
    }
  }
  
  stretch(new_length = 1) {
    let result = this.copy();
    result.length = new_length;
    return result;
  }
  
  to(vector) {
    return vector.minus(this);
  }
  
  distanceTo(vector) {
    return this.to(vector).length;
  }
  
  equals(vector) {
    return this.distanceTo(vector) < 0.0001;
  }
  
  dot(vector) {
    return (this.x * vector.x) + (this.y * vector.y);
  }
}

class Circle {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }
  
  isInside(vector) {
    return this.center.distanceTo(vector) <= this.radius;
  }
  
  closestPointOnCenterLine(vector) {
    return this.center;
  }
  
  closestPointTo(vector) {
    if (this.isInside(vector)) {
      return vector.copy();
    }
    else {
      return this.center.plus(this.center.to(vector).stretch(this.radius));
    }
  }
}

class Line {
  constructor(start, stop, width) {
    this.start = start;
    this.stop = stop;
    this.length = start.to(stop).length;
    this.width = width;
  }
  
  closestPointOnCenterLine(vector) {
    const projected_distance = this.start.to(this.stop).dot(this.start.to(vector)) / this.length;
    const interval = new Interval(0, this.length);
    const closest_point_in_1d = interval.closestValueTo(projected_distance);
    return this.start.plus(this.start.to(this.stop).stretch(closest_point_in_1d));
  }
  
  closestPointTo(vector) {
    
    if (this.isInside(vector)) {
      return vector;
    }
    
    const point_on_center_line = this.closestPointOnCenterLine(vector);
    
    return  point_on_center_line
      .plus(
        point_on_center_line.to(vector).stretch(this.width/2)
      );
  }
  
  isInside(vector) {
    return this.closestPointOnCenterLine(vector).to(vector).length < this.width / 2;
  }
}

class Rectangle {
  constructor(x_interval, y_interval) {
    this.horizontal = x_interval;
    this.vertical = y_interval;
  }
  
  intersect(rectangle) {
    return this.horizontal.intersect(rectangle.horizontal) && this.vertical.intersect(rectangle.vertical);
  }
  
  isInside(vector) {
    return this.horizontal.whereis(vector.x) === 'in' && this.vertical.whereis(vector.y) === 'in';
  }
  
  closestPointTo(vector) {
    
    return new Vector(this.horizontal.closestValueTo(vector.x), this.vertical.closestValueTo(vector.y));
    
    // let point = new Vector(0,0);
    //
    // let where_x = this.horizontal.whereis(vector.x);
    //
    // if (where_x === 'hi') {
    //   point.x = this.horizontal.end;
    // }
    // else if (where_x === 'lo') {
    //   point.x = this.horizontal.start;
    // }
    // else {
    //   point.x = vector.x
    // }
    //
    // let where_y = this.vertical.whereis(vector.y);
    //
    // if (where_y === 'hi') {
    //   point.y = this.horizontal.end;
    // }
    // else if (where_y === 'lo') {
    //   point.y = this.horizontal.start;
    // }
    // else {
    //   point.y = vector.y
    // }
    // return point;
  }
}

// 1 D Elements

class Interval {
  constructor(start, end, open = false) {
    let sorted = [start, end].sort((a,b) => a - b);
    this.start = sorted[0];
    this.end = sorted[1];
    this.open = false;
  }
  
  intersect(interval) {
    return !(interval.end < this.start || this.end < interval.start);
  }
  
  closestValueTo(num) {
    if (num < this.start) {
      return this.start;
    }
    else if (this.end < num) {
      return this.end;
    }
    else {
      return num;
    }
  }
  
  whereis(num) {
    if (this.open) {
      if (num <= this.start) {
        return 'lo';
      } else if (this.end <= num) {
        return 'hi';
      } else {
        return 'in';
      }
    }
    else {
      if (num < this.start) {
        return 'lo';
      } else if (this.end < num) {
        return 'hi';
      } else {
        return 'in';
      }
    }
  }
}