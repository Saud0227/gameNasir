class actor{

  constructor(x,y,_cV){
    this.pos=createVector(x,y);
    this.posDelta=createVector(0,0);
    this.speed=3;
    this.size=15;
    this.rgb=_cV;
    this.walkTo=[];

  }

  update() {
    if(this.walkTo.length>0&&this.walkTo[0].dist(this.pos)>=2){
      let tempV=createVector(this.pos.x,this.pos.y);
      tempV.sub(this.walkTo[0]);
      if(tempV.mag()>2){
        tempV.normalize();
        tempV.mult(-this.speed);
      }
      this.posDelta.set(tempV);
    }else if(this.walkTo.length>0&&this.walkTo[0].dist(this.pos)<2){
      this.walkTo.splice(0,1);
    }
    this.pos.add(this.posDelta);
    this.posDelta.set(0,0);
    fill(this.rgb.x,this.rgb.y,this.rgb.z);
    noStroke();
    rectMode(CENTER);
    rect(this.pos.x,this.pos.y,this.size,this.size);
  }

  addWalkPos(pos){
    if(pos.x!=null&&pos.y!=null){
      append(this.walkTo,pos);
    }
  }
}
