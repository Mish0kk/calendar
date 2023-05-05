'use strict'

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

var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];    

function calendar(id, year) {     
  $("table.year td").click(function(){
    year = $(this).text(); 
  });
  $("table.month td").click(function qwe(){   
    var index = month.indexOf($(this).text());
    var month1 = index;       
    var Dlast = new Date(year, month1 + 1, 0).getDate();    
    var D = new Date(year, month1, Dlast);
    var DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
    var DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
    var calendar = '<tr>';
    if (DNfirst != 0) {
      for (var i = 1; i < DNfirst; i++) calendar += '<td class="day">';
    } else {
       for (var i = 0; i < 6; i++) calendar += '<td class="day">';
    }   
    for (var i = 1; i <= Dlast; i++) {
       if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += '<td tabindex="0" class="day" id="today">' + i;
       } else {
         calendar += '<td tabindex="0" class="day">' + i;
         if(i == 25 && month[D.getMonth()] == "Май" && D.getFullYear() == "2023"){
          calendar += '<br>' + '<p id="large" class="parag">Кол-во платежей - 10</p><p id="large" class="parag">Общая сумма -<br>1 500 000 руб</p> <p tabindex="0" id="small" class="point">10</p>';          
         }; 
                 
       }
       if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
         calendar += '<tr>';
       }       
    }
    for (var i = DNlast; i < 7; i++);
    document.querySelector('#' + id + ' tbody').innerHTML = calendar;        
      document.querySelector('#nazv').innerHTML = $(this).text() + ' ' + D.getFullYear();     
  });       
}    
document.querySelector('#today').innerHTML = month[new Date().getMonth()];  
$("document").ready(function() {
  $("table.month td#today").trigger('click');  
  loadYearsL();
  loadYearsS();
  tr = 1;
});
calendar("calendar", new Date().getFullYear(), new Date().getMonth());




 
  

  

