class pNode{
  constructor(x,y){
    this.x=x;
    this.y=y;

    this.gCost;
    this.hCost;
    this.fCost;
    this.cameFromNode;

    this.isWalkable=true;
  }

  calculateFCost(){
    this.fCost=this.gCost+this.hCost;
  }

}



function pFind(x1,y1,x2,y2,grid,unPFindX,unPFindY) {
  let openList=[];
  let closedList=[];
  let startNode=grid.getContent(x1,y1);
  let endNode = grid.getContent(x2,y2);
  append(openList,startNode);

  for (let x = 0; x < grid.xLen; x++) {
    for (let y = 0; y < grid.yLen; y++) {
      let node=grid.getContent(x,y);
      node.gCost=pow(10,1000);
      node.calculateFCost();
      node.cameFromNode=null;
    }
  }
  for (let i = 0; i < unPFindX.length; i++) {
    grid.getContent(unPFindX[i],unPFindY[i]).isWalkable=false;
  }
  startNode.gCost=0;
  startNode.hCost=calculateDistanceCost(startNode,endNode);
  startNode.calculateFCost();


  while(openList.length>0){

    let current = getLowestFCost(openList);
    if(current==endNode){

      return calculatedPath(endNode);
    }
    let currentIndex=openList.indexOf(current);
    openList.splice(currentIndex,1);


    append(closedList,current);



    let currentNeighbours = grid.getNeighbours(current.x,current.y);


    for (let i = 0; i < currentNeighbours.length; i++) {

      if(closedList.indexOf(currentNeighbours[i])==-1){
        if(currentNeighbours[i].isWalkable==true){



        let tentativeGCost = current.gCost + calculateDistanceCost(current,currentNeighbours[i]);
        if(tentativeGCost<currentNeighbours[i].gCost){
          currentNeighbours[i].gCost=tentativeGCost;
          currentNeighbours[i].cameFromNode=current;
          currentNeighbours[i].hCost=calculateDistanceCost(currentNeighbours[i],endNode);
          currentNeighbours[i].calculateFCost();
          if(openList.indexOf(currentNeighbours[i])==-1){
            append(openList,currentNeighbours[i]);
          }
        }else{append(closedList,currentNeighbours[i]);}
        }
      }
    }
  }
  //out of options
  print("No path",x2,y2);
  return(null);
}



function calculateDistanceCost(a,b){
  let xDif = abs(a.x-b.x);
  let yDif =abs(a.y-b.y);
  let remaining = abs(xDif- yDif);
  return(moveDiagonal*min(xDif,yDif) + moveStraight*remaining);
}


function getLowestFCost(pNodesList) {
  let lowest = pNodesList[0];
  for (let i = 1; i < pNodesList.length; i++) {
    if(pNodesList[i].fCost < lowest.fCost){
      lowest=pNodesList[i];
    }
  }
  return(lowest);
}
function calculatedPath(pNode){
  let finalPath =[];
  append(finalPath,pNode);
  let cNode = pNode;
  while(cNode.cameFromNode!=null){
    append(finalPath,cNode.cameFromNode);
    cNode = cNode.cameFromNode;
  }
  finalPath.reverse();
  return(finalPath);


}
