class actor{

  constructor(x,y,s,si,_cV,pImg){
    this.pos=createVector(x,y);
    this.posDelta=createVector(0,0);
    this.speed=s;
    this.size=si;
    this.rgb=_cV;
    this.walkTo=[];
    if(pImg != null){
      this.pImg = pImg
    }

  }

  update() {
    if(this.walkTo.length>0&&this.walkTo[0].dist(this.pos)>=4){
      let tempV=createVector(this.pos.x,this.pos.y);
      tempV.sub(this.walkTo[0]);
      if(tempV.mag()>2){
        tempV.normalize();
        tempV.mult(-this.speed);
      }
      this.posDelta.set(tempV);
    }else if(this.walkTo.length>0&&this.walkTo[0].dist(this.pos)<4){
      this.walkTo.splice(0,1);
    }
    this.pos.add(this.posDelta);
    this.posDelta.set(0,0);
    fill(this.rgb.x,this.rgb.y,this.rgb.z);
    noStroke();
    rectMode(CENTER);
    push();
    translate(this.pos.x,this.pos.y);
    rect(0,0,this.size,this.size);
    if(this.pImg != null){
      image(this.pImg, -this.size/2, -this.size/2, this.size,this.size);
    }
    pop();
  }

  addWalkPos(pos){
    if(pos.x!=null&&pos.y!=null){
      append(this.walkTo,pos);
    }
  }
}
