function Cell(col, value){
	if(!col){
		this.col = 255;
	}
	else{
		this.col = col;
	}
	if(!value){
		this.value = 0;
	}
	else{
		this.value = value;
	}
}