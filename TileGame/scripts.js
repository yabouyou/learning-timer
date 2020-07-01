const cards = document.querySelectorAll('.memory-card');

grid = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', 'SPACE']
]

cardTransformations = {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': []
}

function slideCard(){
    cardNumber = this.dataset.position;
    directionInfo = getMoveDirection(grid, cardNumber);
    if (directionInfo){
        let newTransformation = directionInfo[0];
        let oldCoords = directionInfo[1];
        let newCoords = directionInfo[2];

        this.classList.add("slide" + cardNumber);
        cardTransformations[cardNumber].push(newTransformation);

        translations = cardTransformations[cardNumber].join(' ');
        curr = '--transformations'+cardNumber;
        
        document.documentElement.style.setProperty(curr, translations);
        // update grid array representation
        swap(oldCoords, newCoords);

        if (isGameOver()){
            console.log("GAME OVER");
            endGame();
        }
    }
}

function swap(oldCoords, newCoords){
    oldX = oldCoords[0];
    oldY = oldCoords[1];
    newX = newCoords[0];
    newY = newCoords[1];
    tmp = grid[oldX][oldY];
    grid[oldX][oldY] = grid[newX][newY];
    grid[newX][newY] = tmp;
}
 
function getMoveDirection(grid, cardNumber){
    //index: 0        1      2         3
    //dir:  right    left     down    up
    let dxdy = [[0,1], [0, -1], [1,0], [-1, 0]]

    let transformDict = {
        0: "translateX(214px)", //right
        1: "translateX(-214px)", //left
        2: "translateY(214px)", //down
        3: "translateY(-214px)"  //up
    }

    cardIndex = indexOf2D(grid, cardNumber);

    for (i=0; i<dxdy.length; i++) {
        dir = dxdy[i];
        var x = cardIndex[0] + dir[0];
        var y = cardIndex[1] + dir[1];

        if (checkIndexValid(grid, x, y) && grid[x][y] == "SPACE"){
            newCoord = [x,y];
            return [transformDict[i], cardIndex, newCoord];
        }
    }

    return null
}

function checkIndexValid(arr, x, y){
    if(x < 0 || x >= arr[0].length || y < 0 || y >= arr.length){
        return false;
    }
    return true;
}

function indexOf2D(grid, elem) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == elem) {
                return [i,j];
            }  
        }
    }
}

//Fisher Yates algorithm for shuffling arrays
function shuffleArr(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function shuffleCards() {

    //create random ordered array out of grid elements
    var arr = [];
    grid.forEach(row => row.forEach(elem => arr.push(parseInt(elem))));
    arr.pop();
    arr = shuffleArr(arr);

    //update grid 
    for (var i=0; i<arr.length; i++){
        elem = arr[i];
        cutOff = grid.length;
        row = Math.floor(elem/cutOff);
        col = elem%cutOff;
        grid[row][col] = i.toString();
    }

    //update card orders
    for (var i = 0; i<cards.length; i++){
        cards[i].style.order = parseInt(arr[i]);
    }

}

function isGameOver(){
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (parseInt(grid[i][j]) != (3*i + j) && !(i==2 && j==2)) {
                return false;
            }  
        }
    }
    return true;
}

function endGame(){
    let msg = {
        txt: "challengeCompleted"
    }
    chrome.runtime.sendMessage(msg);
}

var imgs = document.querySelectorAll('img');

for (var i = 0; i < imgs.length; i++){
    picIndex = (imgs.length + 1) - i;
    
    imgs[i].src = "split-landscape/" + picIndex.toString() + ".jpg";
}

cards.forEach(card => card.addEventListener('click', slideCard));
