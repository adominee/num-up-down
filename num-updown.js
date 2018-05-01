'use strict';
const start=document.getElementById("start-button");
const select1=document.getElementById("option-area1")
const selectarea=document.getElementById("selection");
const lastarea=document.getElementById("result-area")
const firstarea=document.getElementById("first-button")
const next=document.getElementById("next-button");
const input=document.getElementById("continuity");
const twearea=document.getElementById("tweet");
function randomnum(){
    var random=Math.floor(Math.random()*99)+1;
    return random;
}
function randomset(){
    var random=Math.floor(Math.random()*85)+10;
    return random;
}

function choose(set,opnion){
    if(set>=opnion){
        const ab="A";
        return ab;
    }else if(set<opnion){
        const ab="B";
        return ab;
    }
}

function twe(numoftime,X){
    var body
    if(X=="O"){
        body=numoftime+"回当たりました";
    }else if(X=="N"){
        body=numoftime+"回外れました";
    }
    const anchor=document.createElement('a');
    const hrefValue="https://twitter.com/intent/tweet?button_hashtag="
    +encodeURIComponent("運試しの結果")
    +"&ref_src=twsrc%5Etfw";
    anchor.setAttribute('href',hrefValue);
    anchor.className='twitter-hashtag-button';
    anchor.setAttribute('data-text',body);
    anchor.setAttribute('data-lang','ja');
    anchor.setAttribute('data-show-count','false');
    anchor.innerText='#運試しの結果';
    return anchor;
}
var countG=0,countB=0,X="",d="",f="",count=0,lastcount=0;
start.onclick=()=>{
    //連続回数の表示
    if(countG>=2){
        const bodyofresult=document.createElement('p');
        bodyofresult.innerHTML=countG+"回連続して当たっています。";
        input.appendChild(bodyofresult);
    }else if(countB>=2){
        const bodyofresult=document.createElement('p');
        bodyofresult.innerHTML=countB+"回連続して外れています";
        input.appendChild(bodyofresult);
    }
    //上記まで
    while(firstarea.firstChild){
        firstarea.removeChild(firstarea.firstChild);
    }
    const set = randomset();
    const opnion=randomnum();
    const selection1=document.createElement('input');
    selection1.id="up";
    selection1.name="sel";
    selection1.type="radio";
    selection1.value="A";
    const contents1=document.createElement("nobr");
    contents1.innerText=set+"以上";
    selection1.innerText=set+"以上";
    const selection2=document.createElement('input');
    selection2.id="down";
    selection2.name="sel";
    selection2.type="radio";
    selection2.value="B";
    const contents2=document.createElement("nobr");
    contents2.innerText=set+"未満";
    const decision=document.createElement("button");
    decision.getAttribute('button');
    decision.classList.add('start');
    decision.innerHTML="決定";
    while(select1.firstChild){
        select1.removeChild(select1.firstChild);
    }
    select1.appendChild(contents1);
    select1.appendChild(selection1);
    select1.appendChild(contents2);
    select1.appendChild(selection2);
    while(selectarea.firstChild){
        selectarea.removeChild(selectarea.firstChild);
    }
    selectarea.appendChild(decision);
//選択肢が選択されているかを確認
    const check=document.getElementsByName("sel");
    //決定ボタンの動作
    decision.onclick=()=>{
        while(selectarea.firstChild){
            selectarea.removeChild(selectarea.firstChild);
        }
        for(var a="",i=check.length;i--;){
            if(check[i].checked){
                var a=check[i].value;
                break;
            }
        }
        if(a===""){
            //チェックされていないときには警告を出す処理をここに
            const response=document.createElement('p');
            response.classList.add('alert');
            response.innerText="選択してください。";
            while(lastarea.firstChild){
                lastarea.removeChild(lastarea.firstChild);
            }
            while(selectarea.firstChild){
                selectarea.removeChild(selectarea.firstChild);
            }
            //警告を出した後に決定のボタンを再表示するための子要素作成
            selectarea.appendChild(decision);
            lastarea.appendChild(response);
            return;
        }else{
            //ここは選択されていた場合に実行される。

            //一致か不一致化の判定
            const ab =choose(set,opnion);
                    //判定
        if(ab == a){
            var answer="G";
            const response=document.createElement('p');
            response.innerText="当たりです。おめでとうございます！";
            while(lastarea.firstChild){
                lastarea.removeChild(lastarea.firstChild);
            }
            lastarea.appendChild(response);
            f="OK";
        }else if (ab != a){
            var answer="B";
            const response=document.createElement('p');
            response.innerText="はずれです。こういうときもありますよ";
            while(lastarea.firstChild){
                lastarea.removeChild(lastarea.firstChild);
            }
            lastarea.appendChild(response);
            f="NG";
            }
            if(answer=="G"){
                countB=0;
                countG=countG+1;
                if(countG>=2){
                    const inputbody=document.createElement('p');
                    inputbody.innerText="あなたは"+countG+"回連続して当たっています";
                    while(input.firstChild){
                    input.removeChild(input.firstChild);
                }
                input.appendChild(inputbody);
            }
            } else if(answer=="B"){
                countG=0;
                countB=countB+1;
                if(countB>=2){
                    const inputbody=document.createElement('p');
                    inputbody.innerText="あなたは"+countB+"回連続して失敗しています";
                    while(input.firstChild){
                        input.removeChild(input.firstChild);
                    }
                    input.appendChild(inputbody);
                }
            }
            //最大値の保持
            lastcount=count;
            //countへの代入
            if(countG>countB){
                count=countG;
            }else if(countG<countB){
                count=countB;
            }
            if(count>=2){
                if(countG != 0){
                    d="OK";
                }else if(countB!=0){
                    d="NG";
                }
            }
            //ツイート
            if(countG>=1){
                var i=1;
                    X="O";
                if(i!=countG){
                    const tweetbody= twe(countG,X);
                    twearea.appendChild(tweetbody);
                    twttr.widgets.load();
                }
                i++;
            }else if(countB>=1){
                var i=1;
                X="N";
                if(i!=countB){
                    const tweetbody=twe(countB,X);
                    twearea.appendChild(tweetbody);
                    twttr.widgets.load();
                }
                i++;
            }
            if(f != d || d !=f)
            if(lastcount>=2){
                {
                    if(X=="O"){
                        X="N";
                    }else if(X=="N"){
                        X="O";
                    }
                    const tweetbody=twe(lastcount,X);
                    twearea.appendChild(tweetbody);
                    twttr.widgets.load();
                }
            }
        }
        //リトライボタン
        const retry=document.createElement('button');
        retry.id="next";
        retry.classList.add('start');
        retry.innerText="もう一回";
        next.appendChild(retry);
        //リトライボタンの動作実装
        retry.onclick=()=>{
            while(twearea.firstChild){
                twearea.removeChild(twearea.firstChild);
            }
            while(lastarea.firstChild){
                lastarea.removeChild(lastarea.firstChild);
            }
            while(input.firstChild){
                input.removeChild(input.firstChild);
            }
            while(next.firstChild){
                next.removeChild(next.firstChild);
            }
            start.onclick();
        }
    }
}