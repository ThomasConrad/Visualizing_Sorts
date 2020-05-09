let sizeX = window.innerWidth;
let sizeY = window.innerHeight - 5;
let numbers = [];
let sorted = [];
let buckets = 200;
let delta = buckets;
let sortActive = false;
let count = 1;
let mode = 'Bubble';

function setup() {
    createCanvas(sizeX, sizeY);
    //getFPS().then(fps => frameRate(round(fps)));
    frameRate(60);
    background(255, 255, 255);
    rect(10, 10, sizeX - 20, sizeY / 2 - 40);
    rect(10, 40 + (sizeY / 2 - 20), sizeX - 20, sizeY / 2 - 40);
    button = createButton("Sort data");
    button.position((sizeX - 20) / 2 - 100, sizeY / 2 - 40 + 24);
    button.mousePressed(doSort);
    button1 = createButton("Clear");
    button1.position((sizeX - 20) / 2 - 25, sizeY / 2 - 40 + 24);
    button1.mousePressed(restart);
    for (let i = 0; i < buckets; i++) {
        numbers.push(Math.floor(Math.random() * delta + 1));
    }   
    selector = createSelect();
    selector.position((sizeX - 20) / 2 + 30, sizeY / 2 - 40 + 24);
    selector.option('Bubble');
    selector.option('Insertion');
    selector.option('Merge');
    selector.changed(changeEvent);
    sorted = numbers.slice(0);
    drawBars();        

    
}

function draw() {
    if (sortActive) {
        clear();
        if(mode == "Insertion"){
            let smol = true;
                for (let j = count; j >= 0; j--){
                    if (sorted[count] > sorted[j]){
                        let temp = sorted[count];
                        sorted.splice(count,1);
                        sorted.splice(j+1,0,temp);
                        smol = false;
                        break;
                    }
                }
                if(smol && count < buckets){
                    let temp = sorted[count];
                    sorted.splice(count,1);
                    sorted.splice(0,0,temp);
                }
                if (count >= buckets){
                    sortActive = false
                }
        }
        else if (mode == "Bubble"){
                for (let j = 0; j < buckets-count; j++){
                    if (sorted[j] > sorted[j+1]){
                        let temp = sorted[j];
                        sorted[j] = sorted[j+1];
                        sorted[j+1] = temp;
                    }
                }                
        }
        else if (mode == "Merge"){
            for (let j = 0; j < buckets-count; j++){
                if (sorted[j] > sorted[j+1]){
                    let temp = sorted[j];
                    sorted[j] = sorted[j+1];
                    sorted[j+1] = temp;
                }
            }                
    }
       
        noFill();
        rect(10, 10, sizeX - 20, sizeY / 2 - 40);
        rect(10, 40 + (sizeY / 2 - 20), sizeX - 20, sizeY / 2 - 40);
        drawBars();        
        count++;

    }
}

function mergeSort(arr, l, r){
    let m = 1;
}

function doSort() {
    restart();
    sortActive = true;
}

function changeEvent() {
    sortActive = false;
    mode = selector.value();
    console.log(mode)
    restart();
}

function restart() {
    count = 0;
    sorted = numbers.slice(0);
    clear();
    noFill();
    rect(10, 10, sizeX - 20, sizeY / 2 - 40);
    rect(10, 40 + (sizeY / 2 - 20), sizeX - 20, sizeY / 2 - 40);
    drawBars();


    sortActive = false;
}

function getFPS() {
    return new Promise(resolve => {
        requestAnimationFrame(timeFrame1 => {
            requestAnimationFrame(timeFrame2 => {
                resolve(1000 / (timeFrame2 - timeFrame1));
            });
        });
    });
}

function drawBars(){
    for (let i = 0; i < buckets; i++) {
        angle = (numbers[i]/delta)*2*Math.PI
        fill((sin(angle)+1)*255/2,(sin(angle+2/3*Math.PI)+1)*255/2,(sin(angle+4/3*Math.PI)+1)*255/2);
        rect(
            10 + ((sizeX - 20) * i) / buckets,
            10 + sizeY / 2 - 40,
            (sizeX - 20) / buckets,
            (-numbers[i] / delta) * (sizeY / 2 - 40)
        );
        angle = (sorted[i]/delta)*2*Math.PI
        fill((sin(angle)+1)*255/2,(sin(angle+2/3*Math.PI)+1)*255/2,(sin(angle+4/3*Math.PI)+1)*255/2);
        rect(
            10 + ((sizeX - 20) * i) / buckets,
            10 + sizeY - 30,
            (sizeX - 20) / buckets,
            (-sorted[i] / delta) * (sizeY / 2 - 40)
        );
    }
}