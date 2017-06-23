var width, height;
var started = false;
var grid, gridcopy;
var framecounter = 0;
var freq = 5;

function setup(){
	let cellsize = 20;
	width = 801;
	height = 601;
	createCanvas(width, height);
	grid = new Grid(floor(width/cellsize), floor(height/cellsize), cellsize);
	grid.init();
	gridcopy = Object.assign({}, grid);
}
function draw(){
	background(42);
	grid.render();
	if(started){
		framecounter++;
		if(framecounter > freq){
			update();
			framecounter = 0;
		}
	}
}

function update(){
	var neighbors;
	for(x = 1; x < grid.cols-1; x++){
		for(y = 1; y < grid.rows-1; y++){
			neighbors = 0;
			var curcell = grid.cell(x, y).value;
			//console.log("value: " + curcell + " x: " + x + " y: " + y);
			for(i = -1; i <= 1; i++){
				for(j = -1; j <= 1; j++){
					try{

						neighbors += grid.cell(x+i, y+j).value;
					}catch(e){
						//console.log(e + "\nx: " + (x+i) + "y: " + (y+j));
					}
				}
			}
			neighbors = neighbors - curcell;
			if((curcell == 1) && (neighbors < 2)){
				gridcopy.setCell(x,y, new Cell(255, 0));
			}
			else if((curcell == 1) && (neighbors > 3)){
				gridcopy.setCell(x,y, new Cell(255, 0));
			}
			else if((curcell == 0) && (neighbors == 3)){
				gridcopy.setCell(x,y, new Cell(255, 1));
			}
			else {
				gridcopy.setCell(x,y, new Cell(255, curcell));
			}
		}
	}
	swap();
	//console.log("Grid: " + grid);
	//console.log("Gridcopy: " + gridcopy);
}
function swap(){
	let temp = Object.assign({}, grid);
	grid = Object.assign({}, gridcopy);
	gridcopy = Object.assign({}, temp);
}

function mouseClicked(){
	if(started || mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height){
		return;
	}
	var cell = grid.pixel(mouseX, mouseY);
	if(cell.value == 0){
		cell.value = 1;
	}
	else{
		cell.value = 0;
	}
	//console.log(cell);
	grid.setPixel(mouseX,mouseY,cell);
	//console.log(grid.pixel(mouseX,mouseY));
}
function cleargrid(){
	grid.init();
	if(started){
		started = false;
	}
}
function togglestart(){
	started = !started;
}
function fillrandomly(){
	grid.init(true);
}