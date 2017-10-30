// function getDataPointsFromCSV(csv) {
//     var dataPoints = csvLines = points = [];
//     csvLines = csv.split(/[\r?\n|\r|\n]+/);
        
//     for (var i = 1; i < csvLines.length; i++)
//         if (csvLines[i].length > 0) {
//             points = csvLines[i].split(",");
//             dataPoints.push({ 
//                 x: parseFloat(points[3]), 
//                 y: parseFloat(points[4])    
//       });
//   }
//     return dataPoints;
// }

// var dataPoints = [];

// $(document).ready(function() {
// 	// d3.select("p").text("tomato tomato");

// 	// https://scrimba.com/casts/cast-1953 for me to learn how it works

// 	// d3.select(".chart")
//  //  		.selectAll("div")
//  //  		.data(dataPoints)
//  //    		.enter()
//  //    		.append("div")
//  //    		.classed("more", true)
//  //    		.style("width", function(d) { return d + "px"; })
//  //    		.text(function(d) { return d; });

//   //  var ctx = $(".chart1");
//     var chart = new CanvasJS.Chart("chartContainer", {
//     // var chart = new Chart(ctx, {
//         title: {
//       text: "Chart from CSV",
//         },
//         data: [{
//       type: "line",
//       dataPoints: getDataPointsFromCSV('energy.csv')
//        }]
//        // data: {
//        //     labels: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"],
//        //     datasets: [{
//        //         label: "Ida Sproul Energy Consumption",
//        //         backgroundColor: 'rgb(255, 99, 132)',
//        //         borderColor: 'rgb(255, 99, 132)',
//        //         data:[30, 42, 38, 35, 41, 27, 25],
//        //         fill: false,
//        // }],

//     });
//     chart.render();
// });


// Removed below on 10/29
// $(document).ready(function () {

// function getDataPointsFromCSV(csv) {
//     var dataPoints = csvLines = points = [];
//     csvLines = csv.split(/[\r?\n|\r|\n]+/);
        
//     for (var i = 0; i < csvLines.length; i++)
//         if (csvLines[i].length > 0) {
//             points = csvLines[i].split(",");
//             dataPoints.push({ 
//                 x: parseFloat(points[0]), 
//                 y: parseFloat(points[1])    
//       });
//   }
//     return dataPoints;
// }
   
// $.get("dataPoints.csv", function(data) {
//     var chart = new CanvasJS.Chart("chartContainer", {
//         title: {
//       text: "Chart from CSV",
//         },
//         data: [{
//       type: "line",
//       dataPoints: getDataPointsFromCSV(dataPoints.csv)
//   }]
//     });
    
//     chart.render();
 
// });

$(document).ready(function () {

    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    })      

    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
    $('#myTab a:first').tab('show'); // Select first tab
    $('#myTab a:last').tab('show'); // Select last tab



var ctx = document.getElementById('fixedChart-1').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["March", "April", "May", "June", "July", "August", "September"],
        datasets: [{
            label: "Ida Sproul",
            backgroundColor: '#ff6384',
            borderColor: '#ff6384',
            data: [5800, 5690, 5240, 3250, 3230, 5990, 5870],
            fill: false,
        },
        {
            label: "Priestley",
            backgroundColor: '#F7CE5B',
            borderColor: '#F7CE5B',
            data: [5980, 5860, 5490, 4050, 3970, 5670, 5780],
            fill: false,
        },
        {
            label: "Norton",
            backgroundColor: '#A1C349',
            borderColor: '#A1C349',
            data: [5750, 5320, 5300, 4010, 4100, 5860, 5780],
            fill: false, 
        },
        {
            label: "Spens-Black",
            backgroundColor: '#F0B67F',
            borderColor: '#F0B67F',
            data: [5980, 5700, 5800, 3580, 3330, 6000, 6010],
            fill: false,   
        },
        {   
            label: "Beverly Cleary",
            backgroundColor: '#9AC4F8',
            borderColor: '#9AC4F8',
            data: [4790, 4550, 4400, 3300, 4560, 4770, 5100],
            fill: false,   

        }]
    },
    // Configuration options go here
    options: {
        title: {
            display: true,
            text: "Unit 3 Energy Consumption Monthly Average (kWh)"
        },
        scales: {
            xAxes: [{
                    ticks: {
                    fontFamily: 'Source Sans Pro',
                    fontSize: 14
                },
            }],
            yAxes: [{
                ticks: {
                    fontFamily: 'Source Sans Pro',
                    min: 3000,
                    fontSize: 14
                },

            }],
        },
    }
});

});








 