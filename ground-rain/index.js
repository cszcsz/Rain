window.onload=main;                  //当浏览器加载html文档事件时执行开始main函数

  function main()
{
    var dropList=[];                 //创建反弹雨滴对象数组
    var linelist=[];                 //创建下落雨滴对象数组
    var canvasEl = document.getElementById('canvas');        //取得画布元素
    var ctx = canvasEl.getContext('2d');                     //获取画布上下文
    canvasEl.width=canvasEl.clientWidth;                     //获取当前画布宽度
    canvasEl.height=canvasEl.clientHeight;                   //获取当前画布高度

   //随机创建雨滴并初始化
   function createLine(e)
    {
    var temp= 0.25*( 50+Math.random()*100);
    var myline={
      speed:5.5*(Math.random()*6+3),        //速度为随机值
      die:false,                            //die属性两个值，ture代表雨滴消失，false
      posx:e,                               //x坐标值为对象参数e的值
      posy:-200,                            
      h:temp,
     };
       linelist.push(myline);               //push()方法为数组添加新元素
    }
     
  //创建反弹雨滴
   function createDrop(x,y)
  {
    var mydrop={
      die:false,
      posx:x,
      posy:y,
      vx:(Math.random()-0.5)*8,
      vy:Math.random()*(-6)-3,
      radius:Math.random()*5+1               //随机设置反弹雨滴半径
    };
   return mydrop;
  }
  
  //随机为反弹雨滴初始化
  function madedrops(x,y)
   {
    var maxi=Math.floor(Math.random()*5+5);   //floor：向下取整函数，random：产生0~1的随机数
    for(var i=0;i<maxi;i++)
    {
      dropList.push(createDrop(x,y));     
    }
  }
  
  //更新函数，主要删除下落雨滴和反弹雨滴对象实例，并每隔一段时间重新调用，实现雨滴下落和反弹的动画效果
  function update() {
    if(dropList.length>0)
    {
       dropList.forEach(function (e) {               //forEach能遍历dropList数组中的所有元素
         e.vx=e.vx;
         e.posx=e.posx+e.vx;
         e.vy=e.vy+0.5;
         e.posy=e.posy+e.vy;
         if(e.posy>canvasEl.clientHeight)             //反弹雨滴的y坐标大于画布高度则让其消失
         {
           e.die=true;
         }
       });
    }
    for(var i=dropList.length-1;i>=0;i--)
    {

      if(dropList[i].die){
        dropList.splice(i,1);                         //从第i个位置开始剔除1个数组元素
      }
    }
    
    //调用createLine函数，使雨滴初始位置随机分布在x轴上，可以设置雨滴的多少
    createLine(Math.random()*2*canvasEl.width-(0.5*canvasEl.width));
    createLine(Math.random()*2*canvasEl.width-(0.5*canvasEl.width));
    createLine(Math.random()*2*canvasEl.width-(0.5*canvasEl.width));
    
    var mydeadline=canvasEl.clientHeight- Math.random()*canvasEl.clientHeight/5;          //设置下落雨滴消失的高度，即死亡线

     //遍历下落雨滴数组中每个对象，如果雨滴y坐标加上一个随机高度大于死亡线或大于画布高度则令其die值为真
     linelist.forEach(function (e) {
       if((e.posy+e.h)>mydeadline)
       {
           if(Math.random()>0.85)
           {
             madedrops(e.posx,e.posy+e.h);
             e.die=true;
           }
       }
       if(e.posy>=canvasEl.clientHeight)
       {
          e.die=true;
       }
       else                               //否则，继续下落  
       {
         e.posy=e.posy+e.speed;
         e.posx=e.posx;
       }
     });

    //将下落雨滴die值为真的数组元素剔除
    for(var i=linelist.length-1;i>=0;i--) 
    {
      if(linelist[i].die){
        linelist.splice(i,1);
      }
    }
     render();                                          //调用画线函数
     window.requestAnimationFrame(update);              //每隔一定间隔时间重新调用update函数
  }


  function  render() {
     //设置画布背景图片
      var img=new Image()
      img.src="bc3.jpg"
      ctx.drawImage(img,0,0);

     linelist.forEach(
      function (line) {
        ctx.strokeStyle ="#FFFFFD";                    //设置下落雨滴颜色
        ctx.lineWidth=3.5;                             //设置下落雨滴宽度
        ctx.beginPath();                               //开始路径绘制，绘图函数均为画布对象内置方法
        ctx.moveTo(line.posx,line.posy);
        ctx.lineTo(line.posx,line.posy+line.h);        //两点之间连线
        ctx.stroke();
      });
           ctx.strokeStyle = "#FFFFFF";                     //设置反弹雨滴颜色
           ctx.lineWidth=3;                                 //设置反弹雨滴宽度     
           dropList.forEach(function (e) {
           ctx.beginPath();
           ctx.arc(e.posx,e.posy,e.radius,Math.random()*Math.PI*2,1*Math.PI);           //绘制圆形
           ctx.stroke();
       });
  }
  
    window.requestAnimationFrame(update);                                       //不断刷新调用main函数
}


