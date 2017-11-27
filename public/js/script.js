$(document).ready(function () {

    console.log("work");

    // Temporary API while gathering data from school 
    let api = "https://api.eia.gov/series/?";
    let key = "api_key=2ac7c2560b1ced48de2d1c77c09ddda1";
    let series = ["&series_id=ELEC.CONS_TOT.COW-AL-98.M", "&series_id=ELEC.CONS_TOT.COW-CO-98.M", "&series_id=ELEC.CONS_TOT.COW-AR-98.M", "&series_id=ELEC.CONS_TOT.COW-AZ-98.M", "&series_id=ELEC.CONS_TOT.COW-FL-98.M"];
    let month = [[],[],[],[],[]];
    let url = [];
    let tracker = [];
    let energy; 
    console.log("variables loaded");

    // temporary variable
    let tempData = [];
    let build0;
    let build1;
    let build2;
    let build3;
    let build4;


    // What we want to work, but can't due to asynchronous nature 


    function setup() {
        console.log("setting");
        // setInterval(callEnergy, 10000);
        callEnergy();
    }


    function callEnergy() {
        console.log("calling");
        for (let m = 0; m < 5; m ++) {
            url.push(api + key + series[m]);
            $.getJSON(url[m], function(datum) {
                energy = datum.series[0].data;
                if (energy) {
                    tracker = [];
                    let k = 0;
                    console.log(energy[0][1]);
                        while (month[m].length < 7) {
                            if (energy[k][1] == null || energy[k][1] == 0 || energy[k][1] == undefined) {
                                energy.splice(k, 1);
                                console.log(tracker.length);
                            }
                            else {
                                console.log(tracker);
                                month[m].push(energy[k][1])
                                k ++;
                            }
                        }
                        energy = 0;
                
                }
            });
        }
    }
    
    setup();

    let checking = setInterval(check, 1000);

    function check() {
        console.log("check");
        if (month.length == 5) {
            console.log("success");
            console.log(month[0]);
            chart.update();
            clearTimeout(checking);
        }
    }

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
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            label: "Ida Sproul",
            backgroundColor: '#ff6384',
            borderColor: '#ff6384',
            data: month[0],
            fill: false
        },
        {
            label: "Priestley",
            backgroundColor: '#F7CE5B',
            borderColor: '#F7CE5B',
            data: month[1],
            fill: false
        },
        {
            label: "Norton",
            backgroundColor: '#A1C349',
            borderColor: '#A1C349',
            data: month[2],
            fill: false
        },
        {
            label: "Spens-Black",
            backgroundColor: '#F0B67F',
            borderColor: '#F0B67F',
            data: month[3],
            fill: false
        },
        {   
            label: "Beverly Cleary",
            backgroundColor: '#9AC4F8',
            borderColor: '#9AC4F8',
            data: month[4],
            fill:false
        }

        ]
    },
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
                    fontSize: 14
                },

            }],
        },
    }
});

// Summation

let sum0 = month[0].reduce(add, 0);
let sum1 = month[1].reduce(add, 0);
let sum2 = month[2].reduce(add, 0);
let sum3 = month[3].reduce(add, 0);
let sum4 = month[4].reduce(add, 0);

function add(a, b) {
    return a + b;
}




});








 