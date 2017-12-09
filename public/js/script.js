$(document).ready(function () {

    console.log("work");

    // Temporary API while gathering data from school 
    let api = "https://api.us.pulseenergy.com/pulse/1/spaces/";
    let key = "key=FB433A2160AB2CB9F47F92FAB33E412C";
    // building order = 2,3,4,7,8,9,11,14
    let buildings = ["1000319", "1000320", "1000321", "1000322", "1000323", "1000324", "1000325", "1000326"]
    let endingPart = "/data.json?"
    let elecConsump = "&resource=Electricity"
    let quantity = "&quantity=Energy"
    let intervals = ["&interval=hour", "&interval=day", "&interval=week", "&interval=month"]
    let kerr = [[],[],[],[],[]];
    let url = [];
    let tracker = [];
    let energy; 
    console.log("variables loaded");


    function setupWeek() {
        kerr = [[],[],[],[],[]];
        callEnergyWeek();
    }


    function callEnergyWeek() {
        for (let m = 0; m < 5; m ++) {
            url.push(api + buildings[m] + endingPart + key + elecConsump + intervals[2] + quantity);
            console.log(url[0]);
            $.getJSON(url[m], function(datum) {
                energy = datum.data;
                if (energy) {
                    tracker = [];
                    let k = 0;
                        while (kerr[m].length < 7) {
                            if (energy[k][1] == null || energy[k][1] == 0 || energy[k][1] == undefined) {
                                energy.splice(k, 1);
                                console.log(tracker.length);
                            }
                            else {
                                console.log(tracker);
                                kerr[m].push(energy[k][1])
                                k ++;
                            }
                        }
                        energy = 0;
                        setTimeout(chart.update(), 5000);
                
                }
            });
        }
    }
    
    setupWeek();



    $("theCharts").click(function () {
        if (this.html() == "Week") {
            $(".theCharts").removeClass("uncharted");
            $("#fixedChart-1").addClass("charted");
            setupDay();
        }
        else if (this.html() == "Month") {
            $(".theCharts").removeClass("uncharted");
            $("#fixedChart-2").addClass("charted");
            setupQ();
        }
        else if (this.html() == "Year") {
            $(".theCharts").removeClass("uncharted");
            $("#fixedChart-2").addClass("charted");
            setupY();
        }

    });

    // Temporary Fix

    // function tempSet() {
    //     let currUrl = api + key + series[0];
    //     $.getJSON(currUrl, tempGrab);
    // }

    // function tempGrab(currData) {
    //     let currEnergy = currData.series[0].data;
    //     for (let i = 0; i < 7; i ++) {
    //         tempData.push(currEnergy[i][1]);
    //     }
    //     console.log(tempData);
    //     // build0 = tempData.splice(0,6);
    //     chart.update();
    // }

    // tempSet();



    // Tabs for dashboard

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
        labels: ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        datasets: [{
            label: "Building 2",
            backgroundColor: '#ff6384',
            borderColor: '#ff6384',
            data: kerr[0],
            fill: false
        },
        {
            label: "Building 3",
            backgroundColor: '#F7CE5B',
            borderColor: '#F7CE5B',
            data: kerr[1],
            fill: false
        },
        {
            label: "Building 4",
            backgroundColor: '#A1C349',
            borderColor: '#A1C349',
            data: kerr[2],
            fill: false
        },
        {
            label: "Building 7",
            backgroundColor: '#F0B67F',
            borderColor: '#F0B67F',
            data: kerr[3],
            fill: false
        },
        {   
            label: "Building 8",
            backgroundColor: '#9AC4F8',
            borderColor: '#9AC4F8',
            data: kerr[4],
            fill:false
        }

        ]
    },
    options: {
        title: {
            display: true,
            text: "Clark Kerr Energy Consumption (kWh)"
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
                    fontSize: 14
                },

            }],
        },
    }
});


// Summation

// let sum0 = month[0].reduce(add, 0);
// let sum1 = month[1].reduce(add, 0);
// let sum2 = month[2].reduce(add, 0);
// let sum3 = month[3].reduce(add, 0);
// let sum4 = month[4].reduce(add, 0);

// function add(a, b) {
//     return a + b;
// }


$(".special.right").click(function() {
    alert("no events");
});




});








 