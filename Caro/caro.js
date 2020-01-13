
const row = document.querySelector('#row');


const n = document.querySelector('#n');
const btnreset = document.querySelector('#btnreset');

const play = document.querySelector('.play');


play.addEventListener("click",draw);
btnreset.addEventListener("click",draw);
document.getElementById('btnreset').style.display = "none"
function  draw() {
    console.log("Done");
    createBoard();
    document.getElementById('btnreset').style.display = "none"
}

const content = document.querySelector('.content');
let caros = [];

function  obj(_x, _y, _text) {
    this.x = _x;
    this.y = _y;
    this.text = _text;
}
function createBoard() {
    let grid_template_columns = "grid-template-columns: ";
    let grid_template_rows = "grid-template-rows: ";
    for(let i = 0; i< row.value ; i++){
        grid_template_columns += "30px ";
        grid_template_rows +="30px "
    }
    grid_template_columns += ";";
    grid_template_rows += ";";


    let style = ' style = "'+grid_template_columns + grid_template_rows+'"';
    var resum = '<div'+style +' class="wrapper">';

    for (let i=0; i<row.value; i++)
    {
        for (let j=0;j<row.value;j++){
            let id = (j+1)+""+(i+1);
            resum += '<div id="'+id+'" class="item item1 "></div>';
        }
    }
    resum +="</div>";
    content.innerHTML = resum;
}

function  search(x, y) {
    return caros.filter((caro) =>{
        return caro.x===x&& caro.y ===y;
    })
}
function check(e ){
    let number = n.value -1;
    let _x = Math.ceil((e.screenX)/30) -28;
    let _y = Math.ceil((e.screenY)/30) -3;
    for(let i =0; i<caros.length; i++)
        if(caros[i].x===_x && caros[i].y===_y) return;
    if(caros.length%2===0) {
        caros.push(new obj(_x, _y, "X"));
    }else caros.push(new obj(_x, _y, "O"));
    let _id = _x+""+_y;
    var element = document.getElementById(_id);
    if (element) {
        element.textContent = caros[caros.length-1].text;
    }
    if(checkcrossRight(caros[caros.length-1] , number) ||
        checkcrossLeft(caros[caros.length-1] , number) ||
        checkColumn(caros[caros.length-1] , number) ||
        checkRow(caros[caros.length-1] , number) ){
        console.log("Done");
        content.innerHTML = caros[caros.length-1].text+" WIN";
        document.getElementById('btnreset').style.display = "block"
    }
}
function checkRow(objX, _count){
    let count = _count ;
    let chan = false;
    let left = true;
    let right = true;
    let _x= objX.x;
    do{
        let point = search(++_x,objX.y);

        console.log(point);
        if(point.length===0) break;
        if(point[0].text!= objX.text) {
            chan = true;
            count ++;
            left = false;
            break;
        }
        count --;
    }while(left)
    _x= objX.x;
    do{
        let point = search(--_x, objX.y);
        if(point.length===0) break;
        if(point[0].text!= objX.text ) {
            chan = true;
            count ++;
            right = false;
            break;
        }
        count --;
    }while(right|| count >0)

    console.log("count row "+count);
    if(count <=0) return true;
    else return  false;
}

function checkColumn(objX, _count){
    let count = _count ;
    let chan = false;
    let left = true;
    let right = true;
    let _y= objX.y;
    do{
        let point = search(objX.x,++_y);
        console.log(point);
        if(point.length===0) break;
        if(point[0].text!= objX.text) {
            chan = true;
            count ++;
            left = false;
            break;
        }
        count --;
    }while(left)
    _y = objX.y;
    do{
        let point = search(objX.x,--_y);
        console.log(point);
        if(point.length===0) break;
        if(point[0].text!= objX.text ) {
            chan = true;
            count ++;
            right = false;
            break;
        }
        count --;
    }while(right|| count >0)

    console.log("count col"+count);
    if(count <=0) return true;
    else return  false;
}

function checkcrossRight(objX, _count){
    let count = _count ;
    let chan = false;
    let left = true;
    let right = true;
    let _y= objX.y;
    let _x = objX.x;
    do{
        let point = search(++_x,++_y);
        if(point.length===0) break;
        if(point[0].text!= objX.text) {
            chan = true;
            count ++;
            left = false;
            break;
        }
        count --;
    }while(left)

    _y= objX.y;
    _x = objX.x;
    do{
        let point = search(--_x,--_y);
        if(point.length===0) break;
        if(point[0].text!= objX.text) {
            chan = true;
            count ++;
            left = false;
            break;
        }
        count --;
    }while(left)

    console.log("count ri"+count);
    if(count <=0) return true;
    else return  false;

}
function checkcrossLeft(objX, _count){
    let count = _count ;
    let chan = false;
    let left = true;
    let right = true;
    let _y= objX.y;
    let _x = objX.x;
    do{
        let point = search(--_x,++_y);
        if(point.length===0) break;
        if(point[0].text!= objX.text) {
            chan = true;
            count ++;
            left = false;
            break;
        }
        count --;
    }while(left)

    _y= objX.y;
    _x = objX.x;
    do{
        let point = search(++_x,--_y);
        if(point.length===0) break;
        if(point[0].text!= objX.text) {
            chan = true;
            count ++;
            left = false;
            break;
        }
        count --;
    }while(left)

    console.log("count le"+count);
    if(count <=0) return true;
    else return  false;
}
content.addEventListener("mousedown", check);