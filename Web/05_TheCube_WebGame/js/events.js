/*
事件响应的脚本文件，需要和Operation及basicAction.js一起调用。
Neo Zackton
2014-07
*/

function takeAction(event) {                         //  
    var key = event.keyCode;
    switch (key) {
        case 67: useCube(map); break;
        case 37: moveHoriziontallyL(); break;
        case 38: moveVerticallyUp(); break;
        case 39: moveHoriziontallyR(); break;

        case 65: setCubeDirection('left'); break;
        case 68: setCubeDirection('right'); break;
        case 83: setCubeDirection('down'); break;
        case 87: setCubeDirection('up'); break;
    };
}

function removeAction(event) {
    var key = event.keyCode;
    switch (key) {
        //case 32: alert("使用魔方了！"); break;
        case 37: engine.speedX = 0; break;
            //case 38: moveVerticallyUp(); break;
        case 39: engine.speedX = 0; break;

            //case 65: setCubeDirection('right'); break;
    };
}

function nextLevel() {
    if(currentLevel == maxLevel) {
        currentLevel = -1;
        alert('已通关！');
    }
    currentLevel++;
    loadMap(currentLevel);
    start();
}

function clearMap() {
    startPoint = { x: 0, y: 0 };
    endLine = { x: 800, y: 0 };
    map.clearRect(0, 0, canv.width, canv.height);
    resetEnergy();
    resetCube();
    clearInterval(timer);
}

function loadMap(level) {

    clearMap();
    $('div#systemNotice')[0].innerHTML = 'Level ' + String(level);
    drawMap(level);
    

    //url = 'maps/level' + String(currentLevel) + '.json';
    //var xmlhttp;
    //if (window.XMLHttpRequest) {
    //    xmlhttp = new XMLHttpRequest();
    //}
    //else {
    //    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    //}
    //xmlhttp.onreadystatechange = function(){
    //    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //        var mapDrawing = xmlhttp.responseText;
    //        alert(mapDrawing);
    //    }
    //}   
    //var url = 'localhost:8888/start?level=' + String(level);
    //xmlhttp.open('GET', url, true);
    //xmlhttp.send();
}
function dead() {
    alert("You are dead!");
    restart();
}
//abandoned codes
/**/
