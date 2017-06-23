function Grid(cols, rows, cellsize){
	this.rows = rows;
	this.cols = cols;
	this.cellsize = cellsize;
	this.data = [];

	this.init = function(rand){
		for(i = 0; i < this.rows * this.cols; i++){
			if(rand){
				if(random() < 0.05){
					this.data[i] = new Cell(255, 1);
				}	
			}
			else{
				this.data[i] = new Cell(255, 0);
			}
		}
	}

	this.render = function(){
		this.drawGridLines();
		var cell;
		for(x = 0; x < this.cols; x++){
			for(y = 0; y < this.rows; y++){
				cell = this.cell(x, y);
				if(cell.value == 1){
					this.drawCell(x, y, 255, false);
				}
			}
		}
	}
	this.setPixel = function(x,y, cell){
		this.data[this.rows * floor(x/this.cellsize) + floor(y/this.cellsize)] = cell;
	}
	this.setCell = function(x,y,cell){
		this.data[this.rows * x + y] = cell;
	}
	this.pixel = function(x, y){
		return this.data[this.rows * floor(x/this.cellsize) + floor(y/this.cellsize)];
	}
	this.cell = function(x, y){

		//console.log("x: " + x + "y: " + y);
		if(x > this.cols){
			//console.log("ICH RASTE AUS!");
			x = 0;
			//return this.data[this.rows * 0 + y];
		}
		if(x < 0){
			//console.log("HALLO!!!!");
			x = this.cols-1;
			//return this.data[this.rows * this.cols-1 + y];
		}
		if(y > this.rows){
			//console.log("MAMI?");
			y = 0;
			//return this.data[this.rows * x + 0];
		}
		if(y < 0){
			y = this.rows-1;
			//console.log("SUPER!" + x + " " + y);
			//return this.data[this.rows * x + this.rows-1];
		}
		return this.data[this.rows * x + y];
	}

	this.drawGridLines = function(col){
		push();
		if(col){
			color(col);
			stroke(col);
		}
		else {
			color(255);
			stroke(255);
		}
		for(i = 0; i < this.cols; i++){
			let x = i*this.cellsize;
			line(x, 0, x, height);
		}
		for(i = 0; i < this.rows; i++){
			let y = i*this.cellsize;
			line(0, y, width, y);
		}
	}

	this.drawCell = function(x, y, cell, debugText){
		push();
		stroke(parseInt(cell.col));
		fill(parseInt(cell.col));
		if(x > this.cols || x < 0){
			return;
		}
		if(y > this.rows || y < 0){
			return;
		}
		rect(x*this.cellsize, y*this.cellsize, this.cellsize, this.cellsize);
		if(debugText){
			push();
			stroke(0);
			fill(0);
			strx = "X: " + x;
			stry = "Y: " + y;
			drawText(strx, x * this.cellsize + 2, y * this.cellsize + 11);
			drawText(stry, x * this.cellsize + 2, y * this.cellsize + 22);
			pop();
		}
		pop();
	}
}
