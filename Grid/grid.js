
const col = document.querySelector('#col'); //cột
const row = document.querySelector('#row'); // dòng
const start = document.querySelector('#start');
const content = document.querySelector('.content');
start.addEventListener("click", todo)

let datas = [];
function  obj(_x, _y, _content) {
    this.x = _x;
    this.y = _y;
    this.content = _content;
}

function todo() {
    let grid_template_columns = "grid-template-columns: ";
    let grid_template_rows = "grid-template-rows: ";
    let r= row.value;
    let c = col.value;
    r++;
    c++;
    for(let i = 0; i< r; i++){
        grid_template_rows +="30px "
    }
    for(let i = 0; i<c ; i++){
        grid_template_columns +="30px "
    }
    grid_template_columns += ";";
    grid_template_rows += ";";
    let style = ' style = "'+grid_template_columns + grid_template_rows+'"';

    var resum = '<div'+style +' class="wrapper">';


    let a = 0;
    for (let i=0; i< r ; i++)
    {
        for (let j=0;j< c;j++){
            if(i===0){
                if(j===0 )resum += '<div style="background: #7EE0AD;"  class="item item1 ">STT</div>';
                else resum += '<div id="'+(i+""+j)+'" style="background: #7EE0AD;" class="item item1 ">'+(j)+'</div>';
            } else if(j===0 ){
                resum += '<div style="background: #7EE0AD;"  class="item item1 ">'+(i)+'</div>';
            }else {
                let id = (j+1)+""+(i+1);
                const _number = randInt(1,1000);
                console.log(_number);
                datas.push(new obj((i+1), (j+1) , _number));
                resum += '<div class="item item1 ">'+_number+'</div>';
            }

        }
        console.log(a);
    }
    resum +="</div>";
    console.log(resum);
    content.innerHTML = resum;

    console.table(datas);
}
function randInt(start ,end) {

    return  Math.ceil(Math.random()*(end-start)+ start);
}

content.addEventListener("mousedown", check);
function check(e) {

    let dataNew = [];
    let x0 = Math.ceil((e.screenX -570 -260-10)/30);
    let y0  = Math.ceil((e.screenY -100)/30);
    let _id =""+0+""+(x0-1);
    var element = document.getElementById(_id);
    if (element) {

    }
    console.log(x0);
    if(y0 != 1) return;

    let grid_template_columns = "grid-template-columns: ";
    let grid_template_rows = "grid-template-rows: ";
    let r= row.value;
    let c = col.value;
    r++;
    c++;
    Math.ceil((e.screenX -570 -260-10)/30)
    for(let i = 0; i< r; i++){
        grid_template_rows +="30px "
    }
    for(let i = 0; i<c ; i++){
        grid_template_columns +="30px "
    }
    grid_template_columns += ";";
    grid_template_rows += ";";
    let style = ' style = "'+grid_template_columns + grid_template_rows+'"';

    var resum = '<div'+style +' class="wrapper">';

    let a = 1;
    let b =1;
    let d = 2;

    let x =2 ;
    let y = 2;

    let idx =0;
    let idy =1;
    for (let i=0; i< r ; i++)
    {
        d =2;
        for (let j=x0-1;j< (c+x0-1);j++){
            if(i===0){
                if(j===x0 -1){
                    resum += '<div style="background: #7EE0AD;"  class="item item1 ">STT</div>';
                } else {
                    console.log("hi");
                    if(j<=c ) {
                        let _id= idx+""+(idy++);
                        resum += '<div id="'+_id+'" style="background: #7EE0AD;" class="item item1 ">'+(j-1)+'</div>';
                    }
                    else {
                        let _id= idx+""+(idy++);
                        resum += '<div id="'+_id+'" style="background: #7EE0AD;" class="item item1 ">'+(b++)+'</div>';
                    }

                }
            } else if(j===x0 -1) {
                resum += '<div style="background: #7EE0AD;"  class="item item1 ">' + (a++) + '</div>';
            }else {

                let ind;
                if(j<=c) {
                    ind = search((i+1), (j));
                    console.log((i+1) +"D"+ j);
                }
                else{
                    console.log((i+1)+"B"+ d);
                    ind = search((i+1), (d++));
                }
                let _number = (ind[0].content);
                dataNew.push(new obj(x, y++, _number));
                if(y === c+1){
                    x++;
                    y = 2;
                }
               // let _number = ind[0].content;
                resum += '<div  class="item item1 "> '+(_number)+'</div>';
            }
        }
    }
    resum +="</div>";
    console.log(resum);
    content.innerHTML = resum;

    datas = dataNew;

    console.table(datas);
}
function  search(_x , _y) {
    return datas.filter((data) =>{
        return  data.x ===_x && data.y ===_y;
    })
}
