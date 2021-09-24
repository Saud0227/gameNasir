class grid{
  constructor(_x,_y,sqSize,sPos, type){
    this.grid=[];
    this.xLen=_x;
    this.yLen=_y;
    this.sqSize=sqSize;
    this.sPos=createVector(sPos.x,sPos.y)
    for (let x = 0; x < this.xLen; x++) {
      this.grid[x]=[];
      for (let y = 0; y < this.yLen; y++) {
        if(type==false){
          this.grid[x][y]=0;
        }else{this.grid[x][y]=new type(x,y);}
      }
    }
    this.gDebug=false;
    this.gDebugV=false;
    this.drawPFind=true;
    //print(this.grid);
  }


  drawG(){
    rectMode(CORNER);
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        let tstForP=false;
        let tstForW=false;
        for (let i = 0; i < showPath.length; i++) {
          if(showPath[i].x==x&&showPath[i].y==y){
            tstForP=true;
          }
        }
        for (let i = 0; i < unWalkableX.length; i++) {
          if(unWalkableX[i]==x&&unWalkableY[i]==y){
            tstForW=true;
          }
        }
        if(tstForP){fill(0,255,0);}else if(tstForW){fill(0);}else{fill(255);}
        stroke(0);
        rect(this.sqSize*x+this.sPos.x,this.sqSize*y+this.sPos.y,this.sqSize,this.sqSize);
        if(this.gDebug){
          textAlign(CENTER,CENTER);
          fill(0);
          if(this.gDebugV){
            text(this.getContent(x,y),this.sqSize/2+this.sqSize*x+this.sPos.x,this.sqSize/2+this.sqSize*y+this.sPos.y);
          }else{
            text(x+" "+y,this.sqSize/2+this.sqSize*x+this.sPos.x,this.sqSize/2+this.sqSize*y+this.sPos.y);
          }
        }
      }
    }
  }


    getWPos(x,y){
      if(this.checkSize(x,y)){
      let wP = createVector(x*this.sqSize+this.sPos.x,y*this.sqSize+this.sPos.y);
      return(wP);


    }else {return false;}
  }


    checkSize(x,y){if(x>=0&&x<this.xLen&&y>=0&&y<this.yLen){return(true);}}

    getSqIndex(x,y){
      let _x=floor((x-this.sPos.x)/this.sqSize);
      let _y=floor((y-this.sPos.y)/this.sqSize);
      if(this.checkSize(_x,_y)){
        let indexPos = createVector(_x,_y);
        return(indexPos);
      }else{return false;}
    }
    getContent(x,y){
      if(this.checkSize(x,y)){
        return(this.grid[x][y])
      }
    }
    getNeighbours(x1,y1){
      let neighbours=[];
      if(this.checkSize(x1-1,y1+1)){append(neighbours,this.getContent(x1-1,y1+1));}
      if(this.checkSize(x1-1,y1)){append(neighbours,this.getContent(x1-1,y1));}
      if(this.checkSize(x1-1,y1-1)){append(neighbours,this.getContent(x1-1,y1-1));}

      if(this.checkSize(x1,y1+1)){append(neighbours,this.getContent(x1,y1+1));}

      if(this.checkSize(x1,y1-1)){append(neighbours,this.getContent(x1,y1-1));}

      if(this.checkSize(x1+1,y1+1)){append(neighbours,this.getContent(x1+1,y1+1));}
      if(this.checkSize(x1+1,y1)){append(neighbours,this.getContent(x1+1,y1));}
      if(this.checkSize(x1+1,y1-1)){append(neighbours,this.getContent(x1+1,y1-1));}
      return(neighbours);

    }

}
