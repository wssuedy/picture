//创建相册

//相册名输入框
const textDom = document.querySelector(".container .box .main >form >input:nth-child(1)");
//相册创建确认提交
const subDom = document.querySelector(".container .box .main >form >input:nth-child(2)");
const reg = /^[a-zA-Z][\w]{1,5}$/;
subDom.addEventListener("click",function(event){
  if(!reg.test(textDom.value)){
    alert(" 输入有误,请重新输入！");
  }
})


//选择图片 form-a  input-file  input-submit
const imgaDom = document.querySelector(".formimg .afile");
const upDom = imgaDom.querySelector(".selectfiles");
const imgsubDom = document.querySelector(".forming .submit");
// 点击事件关联
imgaDom.addEventListener("click",e=>upDom.click);



//左册相册栏
const leftDom = document.querySelector(".container .box .left");
const defaultxc = leftDom.querySelector("a");
const editxc = leftDom.querySelector("button");
const delDom = leftDom.querySelector(".xclist .del");
const xclistDom = document.querySelectorAll(".container .left .xclist a");
let xcclone = defaultxc.cloneNode(true);
//左侧当前相册 当前索引设置
var currxc = defaultxc;
// currxc.style.color = "#1166dd";

editxc.addEventListener("click",function(event){
  console.log(document.querySelector(".del"));
  document.querySelectorAll(".del").forEach(function(delitem){
    delitem.style.display = 'inline';
  })
})

//
// //分页
// let pageDom = document.querySelectorAll(".container .box .main .pagination > ul >li");
//
// //变量
// var currpage ={};
// const maxp = 2;
// var p = 1;
// var currp = 1;
// var num = 0;
// var imgs = [];
//
//
//
// //**********************创建相册***************
// // 创建相册
// // subDom.addEventListener("click",function(event){
// //   if(textDom.value != ""){
// //     xcclone.innerHTML = textDom.value;
// //     xclistDom.appendChild(xcclone);
// //     textDom.value = null;
// //     // alert("成功创建相册 " + textDom.value );
// //     leftaDom = xclistDom.querySelectorAll("a");
// //     var index = leftaDom.length -1;
// //     addevent(leftaDom[index],index);
// //     lisDom[leftaDom.length-1] = "空相册";
// //     lisNum[leftaDom.length-1]=0;
// // }else{
// //  alert("请输入相册名称 ");
// // }
// // })
//
//
//
// // *******************左侧相册*************************
//
//
//
//
// // ***************上传相册 加载处理函数************************
//
// // const fileDom = document.querySelector(".container .main .images");
// // function handleFiles(files){
// //   if(num == 0 && fileDom){
// //     fileDom.innerText = ``;
// //   }
// //   if(files.length){
// //     var file = files[0];
// //       if(!/image\/\w+/.test(file.type)){
// //            alert("请上传图片！");
// //            return false;
// //        }
// //
// //
// //     var reader = new FileReader();
// //     reader.readAsDataURL(file);
// //     reader.onload = function(){
// //       var img = new Image();
// //       img.src = this.result;
// //       img.height = 200;
// //       img.width = 180;
// //
// //       fileDom.insertAdjacentHTML("beforeEnd",img.outerHTML);
// //       imgs[num] = document.querySelectorAll(".container .box .main .images >img")[num];
// //       imgs[num].style.display = "inline-block";
// //       currDom = document.querySelector(".container .box .main .images");
// //
// //       num++;
// //
// //       changePage(num);
// //
// //
// //       }
// //     }
// //   }
// //
// //
// //
// //
// //
// //
// //   //改变页数函数
// //   function changePage(n){
// //     // let pdoms = document.querySelectorAll(".pagination >ul >li");
// //
// //     // let pdom = pdoms[p];
// //     let pdom = pageDom[p];
// //     if(num == p*maxp + 1){
// //       // alert("new page");
// //       if(currp == p){
// //         changeStyle(p,"page");
// //       }else if( currp!= p){
// //         hidepimg(currp);
// //       }
// //       p++;
// //       currp = p;
// //
// //
// //
// //       newdom.querySelector("a").innerText = p;
// //       newdom.querySelector("a").style.color="#333333";
// //
// //       pdom.insertAdjacentHTML("afterEnd",newdom.outerHTML);
// //       pdom.querySelector("a").style.color="#999999";
// //
// //       pageDom = document.querySelectorAll(".container .box .main .pagination > ul >li");
// //
// //       if(p>5){
// //         pageDom[p-5].style.display = 'none';
// //       }
// //
// //       console.log(pageDom[p]);
// //
// //       addeventp(pageDom[p],p);
// //     }
// //   }
// //
// //   // 改变页面改变图片显示样式
// //   function changeStyle(p,type){
// //     if(type == "page"){
// //       for(var i= (maxp*p-maxp) ; i < p*maxp ; i++){
// //         imgs[i].style.display = 'none';
// //       }
// //     }else if (type == "all") {
// //       for(var i= 0 ; i < imgs.length ; i++){
// //
// //         imgs[i].style.display = 'none';
// //       }
// //     }
// //   }
// //
// //
// //
// //
// //     pageDom.forEach(function(page,index){
// //       if(index == 0){
// //         if(currp == 1){
// //           page.addEventListener("click",function(event){
// //           alert(" 当前为第一页！");
// //         })
// //         }else{
// //           addeventp(pageDom[currp-1],currp-1);
// //         }
// //
// //       }else if(index == pageDom.length -1){
// //         if(currp == pageDom.length - 2){
// //           page.addEventListener("click",function(event){
// //           alert(" 已经是最后一页了！");
// //         })
// //         }else{
// //           addeventp(pageDom[currp+1],currp+1);
// //         }
// //
// //       }else{
// //         addeventp(page,index);
// //       }
// //
// //
// //
// //     })
// //
// //     function addeventp(page,index){
// //       page.addEventListener("click",function(event){
// //
// //           if(currp != index){
// //             // alert("改变原来的页面样式**********"+currp);
// //
// //             pageDom[currp].querySelector("a").style.color = "#999999";
// //             page.querySelector("a").style.color = "#333333";
// //             hidePimg(currp);
// //             showPimg(index);
// //             currp = index;
// //
// //           }
// //
// //
// //       })
// //     }
// //
// //     // 页面对应图片显示
// //     function showPimg(index){
// //        // alert("show index"+index);
// //       var en = index*maxp > num? num : index*maxp;
// //       alert("show en"+en);
// //       for(var i = index*maxp-maxp;i<en;i++){
// //         imgs[i].style.display = 'inline-block';
// //       }
// //     }
// //
// //     function hidePimg(currp){
// //       if(p != 1){
// //         // alert("hide currp"+currp);
// //         var en = currp*maxp > num? num : currp*maxp;
// //         // alert("hide en"+en);
// //         // alert("当前最后一张图片索引为"+en);
// //         for(var i = currp*maxp - maxp;i<en;i++){
// //           imgs[i].style.display = 'none';
// //         }
// //       }
// //     }
//
//     // function getcurrxc(index){
//     // // alert("=====in getcurrxc="+lisDom[index]);
//     //   if(lisDom[index] != "空相册"){
//     //     fileDom.innerHTML = ``;
//     //
//     //     fileDom.insertAdjacentHTML("beforeEnd",lisDom[index].innerHTML);
//     //     imgs[index] = fileDom.querySelectorAll("img")[index];
//     //   }else{
//     //     fileDom.innerHTML = ``;
//     //
//     //     fileDom.insertAdjacentHTML("beforeEnd",lisDom[index]);
//     //     imgs[index] = [];
//     //   }
//     //
//     // }
