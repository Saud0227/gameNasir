let grid1;
let showPath=[];
let unWalkableX=[];
let unWalkableY=[];

let player,bot;
let bTick = 200,bTickD = bTick;

//pFindingVariablesGlobal
const moveStraight=10;
const moveDiagonal=14;


//

let dataFile;


function preload(){
  //dataFile = loadJSON("level1.json");
  dataFile = loadJSON("level1.json");
}

function setup() {
  createCanvas(520,520);

  for(let i = 0; i< dataFile.VlistLen; i++){
    unWalkableX[i] = dataFile.xList[i];
    unWalkableY[i] = dataFile.yList[i];
  }

  let sP = createVector(10,10);
  grid1=new grid(dataFile.xS,dataFile.yS,25,sP,pNode)
  grid1.gDebug=false;

  let playerSPos=grid1.getWPos(dataFile.pSpawnX,dataFile.pSpawnY);
  player=new actor(playerSPos.x+grid1.sqSize*0.5,playerSPos.y+grid1.sqSize*0.5);
  let botAiSP = grid1.getWPos(11,19)
  bot = new actor(botAiSP.x+grid1.sqSize*0.5,botAiSP.y+grid1.sqSize*0.5)


}

function draw() {
  background(255);
  //fill(255);

  rectMode(CORNER);
  grid1.drawG();
  player.update();
  aiUpdate();


}



/* 
function mousePressed(){
  let pPos = grid1.getSqIndex(mouseX,mouseY);

  let playerPos = grid1.getSqIndex(player.pos.x,player.pos.y);

  if(pPos!= false&&playerPos!=false){

    let returnP=(pFind(playerPos.x,playerPos.y,pPos.x,pPos.y,grid1,unWalkableX,unWalkableY));
    if(returnP!=null){
      showPath=[];
      player.walkTo=[];
      for (let i = 0; i < returnP.length; i++) {
        showPath[i]=createVector(returnP[i].x,returnP[i].y);
        let tempV = createVector(grid1.getWPos(returnP[i].x,returnP[i].y).x+grid1.sqSize*0.5,grid1.getWPos(returnP[i].x,returnP[i].y).y+grid1.sqSize*0.5);

        player.addWalkPos(tempV);
      }

    }
  }





}
 */


function aiUpdate(){
  if(bTickD > bTick){
    bTickD = int(random(-bTick/4,bTick/4));
    let cPos = grid1.getSqIndex(bot.pos.x,bot.pos.y)
    if(cPos == false){
      bTickD = 0;
      //break;
    }

    let target = false;
    let targetCords = createVector(0,0)
    while (target == false){
      targetCords.set(int(random(0,grid1.xLen)),int(random(0,grid1.yLen)));
      target = grid1.checkSize(targetCords.x,targetCords.y) && (() => {
        for (let i = 0; i < unWalkableX.length; i++) {
          if(targetCords.x == unWalkableX[i] && targetcords.y == unWalkableY[i]){
            return false;
          }
          
        }
        return true;
      })
    }
    let nPath = pFind(cPos.x,cPos.y,targetCords.x,targetCords.y,grid1,unWalkableX.unWalkableY)
    if(nPath != null){

    }
  }else{bTickD++;}
}