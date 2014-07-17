function drawMap(level)
{

    switch (level)
    {
            case 2:
            {
                startPoint = { x: 100, y: 50 };
                setPosition(hero, startPoint.x, canv.height - startPoint.y);

                energys = [{ x: 270, y: 200, validity: 'uncollected' },
                            { x: 170, y: 200, validity: 'uncollected' },
                            { x: 470, y: 130, validity: 'uncollected' }
                ];
                setEnergys();

                endLine = { x: 640, y: 130 };

                map.save();
                map.lineWidth = 2;
                map.beginPath();
                map.moveTo(100, 200);
                map.lineTo(700, 200);
                map.moveTo(200, 200);
                map.lineTo(200, 50);
                map.lineTo(600, 50);
                map.lineTo(600, 200);
                map.moveTo(220, 90);
                map.lineTo(250, 90);
                map.lineTo(250, 130);
                map.lineTo(300, 130);
                map.lineTo(300, 90);
                map.lineTo(330, 90);
                map.moveTo(430, 130);
                map.lineTo(460, 130);
                //map.lineTo(460, 130);
                map.lineTo(510, 130);
                map.lineTo(510, 90);
                map.lineTo(540, 90);
                map.moveTo(330, 175);
                map.lineTo(430, 175);
                map.closePath();
                map.stroke();

                map.font = "20px gray ";
                map.strokeText("-->Next", endLine.x, canv.height - endLine.y - 10);

                map.restore();
            } break;
        case 1:
            {
                startPoint = { x: 100, y: 50 };
                setPosition(hero, startPoint.x, canv.height - startPoint.y);

                energys = [{ x: 270, y: 160, validity: 'uncollected' },
                            { x: 410, y: 160, validity: 'uncollected' }
                ];
                setEnergys();

                endLine = { x: 650, y: 50 };

                map.save();
                map.lineWidth = 2;
                map.beginPath();
                map.moveTo(100, 200);
                map.lineTo(200, 200);
                map.moveTo(220, 200);
                map.lineTo(500, 200);
                map.moveTo(560, 200);
                map.lineTo(700, 200);
                map.moveTo(250, 200);
                map.lineTo(250, 180);
                map.lineTo(250, 180);
                map.lineTo(270, 180);
                map.lineTo(270, 160);
                map.lineTo(290, 160);
                map.lineTo(290, 180);
                map.lineTo(310, 180);
                map.moveTo(330, 140);
                map.lineTo(350, 140);
                map.moveTo(350, 200);
                map.lineTo(350, 160);
                map.lineTo(430, 160);
                map.lineTo(430, 200);
                map.closePath();
                map.stroke();

                map.font = "20px gray ";
                map.strokeText("-->Next", 650, 190);

                map.restore();
            } break;
        case 0:
            {
                startPoint = { x: 100, y: 50 };
                setPosition(hero, startPoint.x, canv.height - startPoint.y);

                energys = [{ x: 280, y: 200, validity: 'uncollected' },
                            { x: 480, y: 200, validity: 'uncollected' }
                ];
                setEnergys();

                endLine = { x: 650, y: 50 };

                map.save();
                map.lineWidth = 2;
                map.beginPath();
                map.moveTo(100, 200);
                map.lineTo(700, 200);
                map.moveTo(300, 150);
                map.lineTo(300, 200);
                map.moveTo(400, 200);
                map.lineTo(400, 150);
                map.moveTo(500, 200);
                map.lineTo(500, 150);
                map.closePath();
                map.stroke();

                map.font = "20px gray ";
                map.strokeText("-->Next", endLine.x, canv.height - endLine.y - 10);

                map.restore();
            } break;
        case 2:
            {
                startPoint = { x: 0, y: 200 };
                setPosition(hero, startPoint.x, canv.height - startPoint.y);

                energys = [{ x: 280, y: 200, validity: 'uncollected' },
                            { x: 480, y: 200, validity: 'uncollected' }
                ];
                setEnergys();

                endLine = { x: 650, y: 50 };
                var img = new Image();
                img.src = 'maps/configuration.png';

                map.drawImage(img, 0, 0);

                map.font = "20px gray ";
                map.strokeText("-->Next", endLine.x, canv.height - endLine.y - 10);

                map.restore();
            } break;
    }
}