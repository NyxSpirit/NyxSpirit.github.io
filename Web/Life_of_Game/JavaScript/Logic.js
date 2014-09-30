/*
这是Canvas绘制的逻辑代码
*/

//常量
var MAX_STEP=100;
var dx=[-1,-1,0,1,1,1,0,-1];
var dy=[0,1,1,1,0,-1,-1,-1];
var canvasWidth=400;
var canvasHeight=400;

//画布控件
var canvas;
var ctx;

//变量
var speed;
var rows,cols;
var cellWidth,cellHeight;

var map=new Array();
var history=new Array();

var endPoint;

var cellNumber;
var generationNumber;

var timer=null;

//清空历史记录
function initHistory(){
	for (var i=0;i<MAX_STEP;i++){
		history[i]=new Array();
		for (var j=0;j<rows;j++){
			history[i][j]=new Array();
			for (var k=0;k<cols;k++)
				history[i][j][k]=0;
		}
	}
	
	history=[];
}

//设置新的状态
function newState(){
	generationNumber=0;
	document.getElementById("Genaration-Number").innerHTML="繁衍代数："+generationNumber;
	
	initHistory();
	history[0]=map;
	endPoint=0;
}

//判断是否是整数
function isNumber(num){
	var re=/^[0-9]*[1-9][0-9]*$/;
	return re.test(num);
}

//初始化画布
function initCanvas() {

	//获取所设定的行数和列数
	rows = document.getElementById("Input-Row").value;
	cols = document.getElementById("Input-Col").value;

	//判断输入是否合法
	if (!isNumber(rows)||!isNumber(cols)||rows<1||rows>100||cols<1||cols>100){
		alert("请输入1到100间的整数！");
		return;
	}
	
	//绘制画布
	canvas = document.getElementById("map");
	ctx = canvas.getContext('2d');
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	//计算细胞的尺寸
	cellWidth=(canvasWidth-cols-1)/cols;
	cellHeight=(canvasHeight-rows-1)/rows;

	//并绘制网格线
	for (var i=0;i<=cols;i++)
		drawLine(i*(cellWidth+1),0,i*(cellWidth+1),canvasHeight);
	for (var i=0;i<=rows;i++)
		drawLine(0,i*(cellHeight+1),canvasWidth,i*(cellHeight+1));
	
	//初始化细胞
	for (var i=0;i<rows;i++){
		map[i]=new Array();
		for (var j=0;j<cols;j++){
			map[i][j]=0;
		}
	}
	
	//初始化细胞个数和细胞状态
	cellNumber=0;
	document.getElementById("Cell-Number").innerHTML="细胞个数："+cellNumber;
	
	newState();

}

//绘制线段
function drawLine(x1,y1,x2,y2){
	ctx.strokeStyle="#999999";
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

//绘制格子
function drawCell(x1,y1,x2,y2,stat) {
	if (stat==0)
		ctx.fillStyle='#000000';
	else
		ctx.fillStyle='#ffffff';
	ctx.fillRect(x1,y1,x2,y2);
}

//程序初始化
function init() {
    
	//初始化画布
    initCanvas();

	//为画布添加鼠标点击和滚轮滚动监听器
	canvas = document.getElementById("map");
	canvas.addEventListener("click",function (evt) { 
		var mousePos = getMousePos(canvas, evt); 
		setCell(mousePos.x,mousePos.y);
	}, false);
	
	canvas.addEventListener("mousewheel",function (e){
		var dis=e.wheelDelta;
		speed=Number(document.getElementById("Input-Speed").value);
		if (dis>0){
			for (var i=0;i<speed;i++){
				if (backSex()==-1)
				break;
			}
		}
		else{
			for (var i=0;i<speed;i++){
				proceedSex();
			}
		}
		e.returnValue = false;
	},false);
}

//获取鼠标相对于画布的位置
function getMousePos(canvas, evt){
	var rect = canvas.getBoundingClientRect(); 
	return { 
		x: evt.clientX - rect.left * (canvas.width / rect.width),
		y: evt.clientY - rect.top * (canvas.height / rect.height)
	}
}

//绘制所有细胞
function drawCells(){
	cellNumber=0;
	
	for (var i=0;i<rows;i++)
		for (var j=0;j<cols;j++)
			if (map[i][j]==0)
				drawCell(j*(cellWidth+1)+1,i*(cellHeight+1)+1,cellWidth,cellHeight,0);
			else{
				drawCell(j*(cellWidth+1)+1,i*(cellHeight+1)+1,cellWidth,cellHeight,1);
				cellNumber++;
			}
	
	document.getElementById("Cell-Number").innerHTML="细胞个数："+cellNumber;
}

//随机生成细胞状态
function randomCells(){
	for (var i=0;i<rows;i++)
		for (var j=0;j<cols;j++)
			map[i][j]=Math.round(Math.random()/1.75);
			
	
	drawCells();
	newState();
}

//设置单一细胞状态
function setCell(x,y){
	//获取细胞的坐标
	var j=Math.floor(x/(cellWidth+1));
	var i=Math.floor(y/(cellHeight+1));
	if (i<0||i>=cols||j<0||j>=rows)
		return -1;
	
	//对细胞状态取反
	if (map[i][j]==0){
		drawCell(j*(cellWidth+1)+1,i*(cellHeight+1)+1,cellWidth,cellHeight,1);
		cellNumber++;
	}
	else{
		drawCell(j*(cellWidth+1)+1,i*(cellHeight+1)+1,cellWidth,cellHeight,0);
		cellNumber--;
	}
	map[i][j]=1-map[i][j];
	document.getElementById("Cell-Number").innerHTML="细胞个数："+cellNumber;
	
	newState();
}

//开始进化
function startSex(){
	proceedSex();
	speed=Number(document.getElementById("Input-Speed").value);
	timer=setTimeout("startSex()",1000/speed);
}

//停止进化
function stopSex(){
	clearTimeout(timer);
}

//繁衍一代
function proceedSex(){

	generationNumber++;
	document.getElementById("Genaration-Number").innerHTML="繁衍代数："+generationNumber;
	
	var pos=generationNumber%MAX_STEP;
	
	//判断是否是新的状态
	if (pos==endPoint+1||pos==0&&endPoint==(MAX_STEP-1)){
		endPoint=pos;
		
		var nextMap=new Array();
		
		for (var i=0;i<rows;i++){
			nextMap[i]=new Array();
			for (var j=0;j<cols;j++){
				var aliveCells=0;
				for (var dir=0;dir<8;dir++){
					var tx=i+dx[dir];
					var ty=j+dy[dir];
					tx=(Number(tx)+Number(rows))%rows;
					ty=(Number(ty)+Number(cols))%cols;
					if (map[tx][ty]==1)
						aliveCells++;
				}
				if (aliveCells==3){
					nextMap[i][j]=1;
				}
				else if (aliveCells==2)
					nextMap[i][j]=map[i][j];
				else
					nextMap[i][j]=0;
			}
		}
		map=nextMap;
		history[pos] = map;
	}
	else{
		map=history[pos];
	}
	
	drawCells();
}

//回溯到上一代
function backSex(){
	if (generationNumber==0){
		alert("已经到了最初代！");
		return -1;
	}
	
	generationNumber=generationNumber-1;
	var pos=generationNumber%MAX_STEP;
	if (pos==endPoint){
		alert("已经回溯到了存储极限！");
		generationNumber++;
		return -1;
	}
	document.getElementById("Genaration-Number").innerHTML="繁衍代数："+generationNumber;
	
	map=history[pos];
	drawCells();
	return 0;
}
