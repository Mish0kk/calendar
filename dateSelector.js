'use strict'

const months = ["","Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];

const { createApp } = Vue

createApp({
  data() {
    return {        
      selectYearVis: false,
      selectMonthVis: false,
      CalendarVis: true,
    }
  },
  methods: {
    hide: function() {
      this.selectYearVis = false;        
      this.selectMonthVis = true;        
    },
    hide1: function() {     
      this.selectMonthVis = false;
      this.CalendarVis = true;
    },
    hide2: function() {     
      this.selectYearVis = true;
      this.CalendarVis = false;
      
    }
  }
}).mount('#app')

let tr = 1;
let td = 1;
var table = '';
var count = 0
function back(){
  count -= 24;
  count1 -= 24;
  tr = 1;
  tr1 = 1;
  loadYearsL();  
  loadYearsS();
};
function next(){
  tr = 1
  tr1 = 1;
  loadYearsL();
  loadYearsS();
};
function loadYearsL(){
  while(tr <= 2){  
    while(td <= 6){   
      table = document.querySelector('#large1 tbody tr:nth-child('+ tr +') td:nth-child('+ td +')'); 
      table.innerHTML = 2012+count;
      td ++;
      count ++;
    }    
    tr ++;
    td = 1;  
  }  
};
let tr1 = 1;
let td1 = 1;
var table1 = '';
var count1 = 0
function loadYearsS(){
  while(tr1 <= 3){  
    while(td1 <= 4){   
      table1 = document.querySelector('#small1 tbody tr:nth-child('+ tr1 +') td:nth-child('+ td1 +')'); 
      table1.innerHTML = 2012+count1;
      console.log(table1)
      td1 ++;
      count1 ++;
    }    
    tr1 ++;
    td1 = 1;  
  }  
};

function fillDays(offset = 0){
  const params = decodeURIComponent(document.cookie).split(";");
  const today = new Date();
  var m = today.getMonth()+1;
  var y = today.getFullYear();
  params.forEach(param => {
      param = param.trim();
      const keyVal = param.split("=");
      if(keyVal[0] == "m"){
          m = keyVal[1];
      }
      if(keyVal[0] == "y"){
          y = keyVal[1];
      }
  });
  if(offset < 0){
      if(m == 1){y-=1; m=12;}
      else m-=1;
  }else if(offset > 0){
      if(m == 12){y = parseInt(y)+1; m=1;}
      else m = parseInt(m)+1;
  }
  
  const httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function(){
      if(httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200){
          const daysHtml = httpReq.responseText;
          const daysTable = document.querySelector("#days-table");
          daysTable.innerHTML = daysHtml;
          const newDays = daysTable.querySelectorAll("td");
          newDays.forEach(day => {
            day.addEventListener("click", jsGetPayments);
          });
      }
  };
  httpReq.open("POST","generateDays.php");
  httpReq.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded;  charset=UTF-8"
  );
  document.cookie = "m="+m;
  document.cookie = "y="+y;
  httpReq.send(`y=${y}&m=${m}`);

  document.querySelector("#nazv").innerHTML = months[m] + " " + y;
}

function jsGetPayments(event){
  const params = decodeURIComponent(document.cookie).split(";");
  const today = new Date();
  let m = today.getMonth()+1,y = today.getFullYear(),d = today.getDate();
  params.forEach(param => {
      param = param.trim();
      const keyVal = param.split("=");
      if(keyVal[0] == "m"){
          m = keyVal[1];
      }
      if(keyVal[0] == "y"){
          y = keyVal[1];
      }
      if(keyVal[0] == "d"){
          d = keyVal[1];
      }
  });
  if(event.currentTarget.getAttribute("name"))
      d = event.currentTarget.getAttribute("name");

  const httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function(){
      if(httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200){
          const payments = JSON.parse(httpReq.responseText);
          const scrollContainer = document.querySelector("#event");
          scrollContainer.innerHTML = '';
          if(payments == 0) return;
          payments.forEach(payment => {
              const newLi = document.createElement("li");
              newLi.innerHTML = payment;
              scrollContainer.appendChild(newLi);
          });
      }
  };
  httpReq.open("POST","getPayments.php");
  httpReq.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded;  charset=UTF-8"
  );
  httpReq.send(`y=${y}&m=${m}&d=${d}`);

  document.cookie = "d="+d;

  const date = new Date(y, m-1, d);
  if(date.toDateString() == today.toDateString())
      document.querySelector(".events p").innerHTML = "Платежи за Сегодня";
  else
      document.querySelector(".events p").innerHTML = "Платежи за " + ('0' + d).slice(-2) + "." + ('0' + m).slice(-2) + "." + y;    
}

function attatch(){
  $("table.year td").click(function(){
    document.cookie = "y=" + $(this).text();
  });
  $("table.month td").click(function(){
    document.cookie = "m=" + months.indexOf($(this).text());
    fillDays();
  });
  document.querySelectorAll("#prev").forEach(button => {
    button.addEventListener("click",function(){fillDays(-1)});
  });
  document.querySelectorAll("#next").forEach(button => {
    button.addEventListener("click",function(){fillDays(1)});
  });
}

document.addEventListener("DOMContentLoaded", fillDays);
document.addEventListener("DOMContentLoaded", attatch);