let grid;
let cols;
let rows;
let resolution;
let run;

function setup() {
    let w = floor(windowWidth/10) *10;
    let h = floor(windowHeight/10) *10;
    let canvas = createCanvas(w, h); //(width, height) ie. (cols, rows)
    canvas.parent('sketch-holder');
    background(0);

    // Setup the initial grid
    run = false;
    resolution = 5;
    rows = height / resolution;
    cols = width / resolution;   
    grid = make2DArray(rows, cols)

    // Initialize the grid with random 'alive' or 'dead' cells 
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++)
            grid[i][j] = floor(random(2));          
    }

    updateGridGraphics()
}

function windowResized() {
    let w = floor(windowWidth/10) *10;
    let h = floor(windowHeight/10) *10;
    resizeCanvas(w, h);
}
//=======================================================
// COMMAND FUNCTIONS FOR CONSOLE:
function randomizeGrid(){
    clearGrid();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++)
            grid[i][j] = floor(random(2));          
    }

    updateGridGraphics()
}

function clearGrid(){
    stopLife();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++)
            grid[i][j] = 0;          
    }

    background(0)
}

function runLife(){
    run = true;
}

function stopLife(){
    run = false;
}
//=======================================================

function updateGridGraphics(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * resolution;
            let y = i * resolution;

            let state = grid[i][j]; 

            if(state == 1){
                fill(255);
                rect(x, y, resolution, resolution);
            }      
        }    
    }
}

function mousePressed() {
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        let xPos = floor(mouseX / resolution);
        let yPos = floor(mouseY / resolution);
        if(mouseButton === LEFT){    
            grid[yPos][xPos] = 1;
            fill(255);
            rect(xPos*resolution, yPos*resolution, resolution, resolution);
        }else if(mouseButton === RIGHT){
            grid[yPos][xPos] = 0;
            fill(0);
            rect(xPos*resolution, yPos*resolution, resolution, resolution);
        }
    }
}
  
function draw() {  
    if(run){
        background(0);
        let newState = make2DArray(rows, cols);

        updateGridGraphics();

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                
                let sum = checkNeighbors(grid, i, j);
                let state = grid[i][j]

                if(state == 0 && sum == 3){
                    newState[i][j] = 1;
                }else if(state == 1 && (sum < 2 || sum > 3)){
                    newState[i][j] = 0;
                }else{
                    newState[i][j] = state;
                }       
            }
        }
        grid = newState;
    }
}

function make2DArray(row, col){
    let arr = new Array(row);
    for (let i = 0; i < row; i++) {
        arr[i] = new Array(col);
        for (let j = 0; j < col; j++)
            arr[i][j] = 0;          
    }
    return arr;
}

function checkNeighbors(grids, x, y){
    let sum = 0;
    if(x > 0 && y > 0) sum += grids[x-1][y-1];
    if(x > 0) sum += grids[x-1][y];
    if(x > 0 && y < cols-1) sum += grids[x-1][y+1];
    if(y > 0) sum += grids[x][y-1];
    if(y < cols-1) sum += grids[x][y+1];
    if(x < rows-1 && y > 0) sum += grids[x+1][y-1];
    if(x < rows-1 ) sum += grids[x+1][y];
    if(x < rows-1 && y < cols-1) sum += grids[x+1][y+1];

    return sum;
}

function drawGosperGliderGun(){
    clearGrid();
    let x = [20,21,21,22,22,22,22,22,22,23,23,23,23,23,23,24,24,24,24,24,24,25,25,25,25,25,25,25,25,26,26,26,27,27,28,28];
    let y = [47,45,47,35,36,43,44,57,58,34,38,43,44,57,58,23,24,33,39,43,44,23,24,33,37,39,40,45,47,33,39,47,34,38,35,36];

    for (let i = 0; i < x.length; i++) {
        grid[x[i]][y[i]] = 1;     
    }
    updateGridGraphics();
}

function drawAcorn(){
    clearGrid();
    let x = [60,61,62,62,62,62,62];
    let y = [123,125,122,123,126,127,128];

    for (let i = 0; i < x.length; i++) {
        grid[x[i]][y[i]] = 1;     
    }
    updateGridGraphics();
}

function drawNoahsArc(){
    clearGrid();
    let x = [60,60,61,62,62,63,63,63,69,70,70,72,72,73,73,74];
    let y = [140,142,139,140,143,142,143,144,131,130,132,130,133,132,133,133];

    for (let i = 0; i < x.length; i++) {
        grid[x[i]][y[i]] = 1;     
    }
    updateGridGraphics();
}
   
