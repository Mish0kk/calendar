'use strict'

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
         if(i == 25 && month[D.getMonth()] == "Апрель" && D.getFullYear() == "2023"){
          calendar += '<br>' + '<p id="large" class="parag">Кол-во платежей - 10</p><p id="large" class="parag">Общая сумма -<br>1 500 000 руб</p> <div id="small" class="point">10</div>';          
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
});
calendar("calendar", new Date().getFullYear(), new Date().getMonth());




 
  

  

