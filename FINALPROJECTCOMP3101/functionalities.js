"use strict";

//declaration of variables that contain data
var $currTableRow = $("#FCFS #start");
var curValue = parseInt($currTableRow[0].textContent.trim().split("")[1]);
var $second_currTableRow = $("#SJN #second_start");
var second_currValue = parseInt($second_currTableRow[0].textContent.trim().split("")[1]);
var $third_currTableRow = $("#PS #third_start");
var third_currValue = parseInt($third_currTableRow[0].textContent.trim().split("")[1]);
var $fourth_currTableRow = $("#RR #fourth_start");
var fourth_currValue = parseInt($fourth_currTableRow[0].textContent.trim().split("")[1]);


//Responsible for displaying chart when an algorithm is selected
$("#FCFS-list").click(() => {
    myChart.options.title.text = "Visualization for the First Come First Served Algorithm";
    myChart.update();
});

$("#RR-list").click(() => {
    myChart.options.title.text = "Visualization for the Round Robin Algorithm";
    myChart.update();
});

$("#PS-list").click(() => {
    myChart.options.title.text = "Visualization for the Priority Scheduling Algorithm";
    myChart.update();
});

$("#SJN-list").click(() => {
    myChart.options.title.text = "Visualization for the Shortest Job Next Algorithm";
    myChart.update();
});

//Generates a row to obtain process information based on algorithm selected
$(".add-row").click(function () {
  if ($("#FCFS").is(".active")) {
    let val = curValue + 1;
    let row = `<tr class="P${val}"> 
                  <td>P${val}</td>
                  <td><input type="number" class="form-control p-0" name="arrivalTime" id="arrTime${val}" min="0" value="${val}"></td> 
                  <td><input id="service${val}" class="form-control p-0" type="number" value="${val}" min="0"></td>
              </tr>`;
    $("#FCFS-table").append(row);
    curValue = val;
    return
  }

  if ($("#SJN").is(".active")) {
        let sec_val = second_currValue + 1;
        let sec_row = `<tr class="P${sec_val}">
                  <td>P${sec_val}</td>
                  <td><input class="form-control p-0" type="number" value="${sec_val}"></td>
                  <td><input class="form-control p-0" type="number"></td>
              </tr>`;
        $("#SJN-table").append(sec_row);
        second_currValue = sec_val;
        console.log("Functioning")
        return
    }

  if ($("#PS").is(".active")) {
        let third_val = third_currValue + 1;
        let third_row = `<tr class="P${third_val}">
                  <td>P${third_val}</td>
                  <td><input class="form-control p-0" type="number" value="${third_val}"></td>
                  <td><input class="form-control p-0" type="number"></td>
                  <td><input class="form-control p-0" type="number"></td>
              </tr>`;
        $("#PS-table").append(third_row);
        third_currValue =  third_val;
        console.log("Functioning")
        return
   }

  if ($("#RR").is(".active")) {
    let fourth_val = fourth_currValue + 1;
    let fourth_row = `<tr class="P${fourth_val}">
                  <td>P${fourth_val}</td>
                  <td><input class="form-control p-0" type="number" value="${fourth_val}"></td>
                  <td><input class="form-control p-0" type="number"></td>
              </tr>`;
    $("#RR-table").append(fourth_row);
    fourth_currValue = fourth_val;
    return
  }

});


//Deletes a row that the user no longer wants to use 
$(".remove-row").click(function () {
  if ($("#FCFS").is(".active")) {
    let FCFSTableRows = $("#FCFS-table tr");

    if (FCFSTableRows.length > 2) {
      FCFSTableRows.last().remove();
      curValue -= 1
      return
    }
  }

  if ($("#SJN").is(".active")) {
    let SJNTableRows = $("#SJN-table tr");

    if (SJNTableRows.length > 2) {
      SJNTableRows.last().remove();
      second_currValue -= 1
    return
    }
   }

  if ($("#PS").is(".active")) {
    let PSTableRows = $("#PS-table tr");

    if (PSTableRows.length > 2) {
      PSTableRows.last().remove();
      third_currValue -= 1
    return
    }
    console.log("Functioning");
  }

  if ($("#RR").is(".active")) {
    let RRTableRows = $("#RR-table tr");

    if (RRTableRows.length > 2) {
      RRTableRows.last().remove();
      fourth_currValue -= 1
    return
    }
    console.log("works");
  }
});

//References canvas element for simulation
let ctx = $("#produce");

//Handles the fcfs algorithm
$("#FCFS-btn").click(function () {
  let readyQueue = []; //Queue for storing the data inputted
  $("#FCFS-table tbody tr td").each(function (index, value) { 
    if ($(value).find(".form-control").length) { //Adds data to queue
      readyQueue.push($(value).find(".form-control").val()); 
    } else {
      readyQueue.push(value.innerText);
    }
  });
  FCFS(groupByThree(readyQueue)); //Calls function to group values
});

function FCFS(readyQueue) { //Sends queue with information to chart function to display
  readyQueue.sort((a, b) => a[1] - b[1]);
  replaceChartData(myChart, readyQueue);
}


function groupByThree([a, b, c, ...rest]) { //Group values of three
  if (rest.length === 0) return [[a, b, c].filter((x) => x !== undefined)];
  return [[a, b, c]].concat(groupByThree(rest));
}

function replaceChartData(chart, data) { //Removes previous chart data and places new information to be displayed
  let x_start = 0;
  let x_end = 0;
  chart.data.datasets = [];
  data.forEach((info, index) => {
    x_end = index == 0 ? info[2] : parseInt(info[2]) + parseInt(x_start);

    let chartData = {
      label: info[0],
      backgroundColor: `rgba${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},1)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},1)`,
      fill: false,
      borderWidth: 15,
      pointRadius: 0,
      data: [
        {
          x: x_start,
          y: 15 - index - 1,
        },
        {
          x: x_end,
          y: 15 - index - 1,
        },
      ],
    };
    x_start = x_end;
    chart.data.datasets.push(chartData);
  });
  chart.update();
}

//Handles the sjn algorithm
$("#SJN-btn").click(function (){
    let new_que = []; //Queue for storing the data inputted
    $("#SJN-table tbody tr td").each(function(index, value){ //Adds data to queue
       if ($(value).find(".form-control").length){
            new_que.push($(value).find(".form-control").val());
       } else{
        new_que.push(value.innerText);
        }
    });
        SJN(groupByThree(new_que)); //Calls function to group values
});

function SJN(readyQueue) { //Sends queue with information to chart function to display
  readyQueue.sort((a, b) => a[1] - b[1]);
  readyQueue = performSJN(readyQueue)
  replaceChartData(myChart, readyQueue);
}
function performSJN(data) { 
  let current_time = 0; //shows the current time in the system
  let waiting_queue = []; //shows the number of items needed to be added to the resulting queue which would be then added to the chart
  let resulting_queue = []; // shows the resulting queue which would be then added to the chart

  function arrayIsEmpty(arr){ //Checks if queue is empty
    return arr.length === undefined || arr.length === 0;
  }

  while (!arrayIsEmpty(data)) { //Finds the shortest job next among the processes
    waiting_queue.push(...data.filter( el => el[1] <= current_time));
    data =  data.filter(el => el[1] > current_time);
    waiting_queue.sort((el1, el2) => el1[2]-el2[2]);

    if (arrayIsEmpty(data)) {
        resulting_queue.push(...waiting_queue);
    }else{
        resulting_queue.push(waiting_queue[0]);
        current_time += parseInt(waiting_queue[0][2]);
        waiting_queue = waiting_queue.filter(el => !(el[0]===waiting_queue[0][0]));
    }
  }

  return resulting_queue; 
}

//Handles the priority scheduling algorithm
$("#PS-btn").click(function () {
  let readyQueue = []; //Queue for storing the data inputted
  $("#PS-table tbody tr td").each(function (index, value) { //Adds data to queue
    if ($(value).find(".form-control").length) {
      readyQueue.push($(value).find(".form-control").val());
    } else {
      readyQueue.push(value.innerText);
    }
  });
  PS(groupByFour(readyQueue)); //Calls function to group values
});

function groupByFour([a, b, c, d, ...rest]) { //Groups four values 
  if (rest.length === 0) return [[a, b, c, d].filter((x) => x !== undefined)];
  return [[a, b, c, d]].concat(groupByFour(rest));
}

function PS(readyQueue) { //Sends queue with information to the chart function to display
  readyQueue.sort((a, b) => a[3] - b[3]);
  readyQueue = performPS(readyQueue);
  replaceChartData(myChart, readyQueue);
}

function performPS(data){ //Finds highest priority
    let current_priority = 0; //shows the current priority in the system
    let ps_queue = []; //shows the priority in a queue
    let resulting_queue = [];

    function arrayIsEmpty(arr){
        return arr.length === undefined || arr.length === 0;
    }

    while (!arrayIsEmpty(data)) { //Checks if queue is empty
       ps_queue.push(...data.filter( el => el[1] <= current_priority));
       data =  data.filter(el => el[1] > current_priority);
       ps_queue.sort((el1, el2) => el1[4]-el2[4]);

       if (arrayIsEmpty(data)) {
            resulting_queue.push(...ps_queue);
       }else{
        resulting_queue.push(ps_queue[0]);
        current_priority += parseInt(ps_queue[0][3]);
        ps_queue = ps_queue.filter(el => !(el[0]===ps_queue[0][0]));
       }

    }

    return resulting_queue;
}


//Handles the Round Robin algorithm
$("#RR-btn").click(function () {
  let readyQueue = []; //Queue for storing the data inputted
  $("#RR-table tbody tr td").each(function (index, value) { //Adds data to queue
    if ($(value).find(".form-control").length) {
      readyQueue.push($(value).find(".form-control").val());
    } else {
      readyQueue.push(value.innerText);
    }
  });
  RR(groupByThree(readyQueue)); //Calls function to group values
});


function RR(readyQueue) { //Sends queue with information to chart function to display
  readyQueue.sort((a, b) => a[1] - b[1]);
  replaceChartData(myChart, readyQueue);
}


//Creates chart for Visualization
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [],
  },
  options: {
    animation: {
        easing:"linear"
    },  
    title: {
      display: true,
      text: "Visualization of the First Come First Served Algorithm",
      fontFamily: `system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
      fontSize: 16,
    },
    legend: {
      display: true,
      labels: {
        padding: 30,
        fontFamily: `system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
        fontSize: 19,
      },
    },
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
          ticks: {
            beginAtzero: true,
            stepSize: 1,
          },
          scaleLabel:{
            display: true,
            labelString: "Summation of CPU Cycles",
            fontSize: 19,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
            max: 20,
            stepSize: 1,
          },
        },
      ],
    },
  },
});