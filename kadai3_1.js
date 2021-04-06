'use strict';
/*ブロックを作ってる中括弧。スコープの範囲設定してる。*/
{
  
  /*htmlの各idの値を格納しているっぽい*/
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  

  const reset2 = document.getElementById("reset2");
  const startstop = document.getElementById("startstop");
  
  /*getElementById JavaScriptでHTML要素にclassの追加や削除等の処理をするには、HTML要素を取得する必要がある。
  処理の流れは、HTMLの要素を取得する⇨取得した要素にclassListで処理をする⇨処理結果を得る。
  Idの部分を書き換えることでclassも取得できる。ただし、一つだったり全部だったりで使い分けが必要。
  
  
  let ブロック内でアクセス可能な変数宣言
  connst 書き換え不可能な変数宣言
  ver どこでも書き換え可能な変数宣言。バグの温床になるらしい。
  
  */
  
  
  let startTime;       // Startボタンクリック時の時刻
  let timeoutid;       // ID
  let elapsedTime = 0; // StartからStopまでの経過時間

  /*スタートからストップまでの時間をカウントする関数*/
  function countUp() {
    
    /*dにDateオブジェクトを作成。*/
    let d = new Date(Date.now() - startTime + elapsedTime);
    
    /* padStart()で二桁または三桁固定表示とする */
    /*get~はその時の分や秒、ミリ秒を取得できる、Javaに最初から定義されてる組み込みのオブジェクト。
    クラス定義をしなくてもnewでインスタンスを作成可能。*/
    
    /*DateオブジェクトdにgetMinutesを用いて分を取得。
    その取得した文字列に対してpadStartを用いて桁数を調整。
    d.getMinutes()で 分を取得。
    String(d.getMinutes())で取得した分を格納。
    String(d.getMinutes()).padStart(2, '0')で桁数を調整。*/
    let m = String(d.getMinutes()).padStart(2, '0');
    let s = String(d.getSeconds()).padStart(2, '0');
    let ms = String(d.getMilliseconds()).padStart(3, '0');
    
    /* 描画 */
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutid = setTimeout(() => {
      //再帰呼び出し
      countUp();
    }, 10);
    /*ここの10は10msごとに値を取得するという意味
    数字をデカくするとガバガバカウントになる。
    これ、ヒントに書いてあったsetIntervalで良いのでは？
    setIntervalで繰り返し処理をおこなった場合：処理開始時点から一定時間後に同じ処理を繰り返す
    setTimeoutで繰り返し処理をおこなった場合：処理終了時点から一定時間後に同じ処理を繰り返す
    
    */
    
  }




  // 状態:初期 または Reset直後
  /* ーー.classList.〜〜(""); 
  ーーにはidやclass名、
  〜にはadd、removeが入る。
  ()の中身はcssに記述したクラス名。
  指定したidやclassにクラスの追加や削除ができる。
  */
  function setButtonStateInitial() {
    start.classList.remove('inactive'); // 活性
    stop.classList.add('inactive');     // 非活性
    reset.classList.add('inactive');    // 非活性
    reset.classList.add("change_color");
  }
  
  
  function setButtonStateInitial2() {
    startstop.classList.remove("working");
    reset2.classList.add('inactive');    // 非活性
  }  
  
  

  // 状態:タイマー動作中
  function setButtonStateRunning() {
    start.classList.add('inactive');    // 非活性
    stop.classList.remove('inactive');  // 活性
    reset.classList.add('inactive');    // 非活性
    reset.classList.remove("change_color");
  }


  function setButtonStateRunning2() {
    //タイマー動作中はstartがstop表示になるようにしたい。
    
    /*
    $(document).ready(function(){
      $("#startstop").click(function() {
        $("#startstop").text("Stop"); 
      });
    });
    */
    startstop.innerHTML = "Stop";
    startstop.classList.add("working");   //動作中
    reset2.classList.add('inactive');    // 非活性
    
  }



  // 状態:タイマー停止中
  function setButtonStateStopped() {
    start.classList.remove('inactive'); // 活性
    stop.classList.add('inactive');     // 非活性
    reset.classList.remove('inactive'); // 活性
    reset.classList.add("change_color");
  }
  
  
  function setButtonStateStopped2() {
    startstop.classList.remove('working'); //   停止中
    startstop.innerHTML = "Start";
    reset2.classList.remove('inactive'); // 活性
  }  
  
  

  // ボタンを'初期'状態とする
  //setButtonStateInitial();
  setButtonStateInitial2();


  // Startボタンクリック
  // …タイマーを開始します
  /*
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      
      return;
    }
    // ボタンをタイマー'動作中'状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });
  */

  startstop.addEventListener('click', () => {
    if (startstop.classList.contains("working") === false) {
    // ボタンをタイマー'動作中'状態とする
    setButtonStateRunning2();
    startTime = Date.now();
    countUp();
    } 
    else  {
    // タイマーを'停止中'状態とする
    setButtonStateStopped2();
    clearTimeout(timeoutid);
    elapsedTime += Date.now() - startTime;
    }
    
  });



  // Stopボタンクリック
  // …タイマーを停止します
  /*
  stop.addEventListener('click', () => {
    if (stop.classList.contains('working') === true) {
      return;
    }
    // タイマーを'停止中'状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid);
    elapsedTime += Date.now() - startTime;
  });
  */
  
  /*
  startstop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
  
  
  });
  */







  // Resetボタンクリック
  // …タイマーを「00:00.000」で上書きします
  /*
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    // ボタンを'初期'状態とする
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
  */
  
  reset2.addEventListener('click', () => {
    if (reset2.classList.contains('inactive') === true) {
      return;
    }
    // ボタンを'初期'状態とする
    setButtonStateInitial2();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
    
  

}