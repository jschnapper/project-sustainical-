$(document).ready(function() {

    console.log("welcome to the dash");

    let api = "https://api.us.pulseenergy.com/pulse/1/spaces/";
    let key = "key=FB433A2160AB2CB9F47F92FAB33E412C";
    // building order = 2,3,4,7,8,9,11,14
    let buildings = ["1000319", "1000320", "1000321", "1000322", "1000323", "1000324", "1000325", "1000326"];
    let endingPart = "/data.json?";
    let elecConsump = "&resource=Electricity";
    let quantity = "&quantity=Energy";
    let intervals = ["&interval=hour", "&interval=day", "&interval=week", "&interval=month"];
    let kerr = [[],[],[],[],[]];
    let url = [];
    let tracker = [];
    let currLabels = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let now = new Date();
    let dayIndex;
    let hourIndex;
    let timeString;
    let energy; 
    console.log("variables loaded");
    let checkAPI = false;

    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    function setupWeek() {
        now = new Date();
        kerr = [[],[],[],[],[]];
        currLabels = [];
        url = [];
        energy;
        callEnergyWeek();
    }


    function callEnergyWeek() {
        for (let m = 0; m < 5; m ++) {
            url.push(api + buildings[m] + endingPart + key + elecConsump + intervals[2] + quantity + '&callback=?');
            console.log(url[0]);
            dayIndex = now.getDay() - 1;
            while (currLabels.length < 7) {
                if (dayIndex == -1) {
                    dayIndex = 6;
                    currLabels.push(days[dayIndex]);
                    dayIndex -= 1;
                }
                else {
                    currLabels.push(days[dayIndex]);
                    dayIndex -= 1;
                }
            }
            currLabels = currLabels.reverse();
            $.getJSON(url[m], function(datum) {
                checkAPI = true;
                energy = datum.data;
                if (energy) {
                    tracker = [];
                    let k = 0;
                        while (kerr[m].length < 7) {
                            if (energy[k][1] == null || energy[k][1] == 0 || energy[k][1] == undefined) {
                                energy.splice(k, 1);
                            }
                            else {
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

    // DAYS

    function setupDay() {
        console.log("OH YEAH DAY");
        now = new Date();
        timeString;
        kerr = [[],[],[],[],[]];
        currLabels = [];
        url = [];
        energy;
        callEnergyDay();
    }


    function callEnergyDay() {
        console.log("enery day called");
        for (let m = 0; m < 5; m ++) {
            url.push(api + buildings[m] + endingPart + key + elecConsump + intervals[1] + quantity + '&callback=?');
            console.log(url[0]);
            hourIndex = now.getHours() - 1;
            while (currLabels.length < 23) {
                if (hourIndex == -1) {
                    hourIndex = 23;
                    timeString = hourIndex.toString() + ":00";
                    currLabels.push(timeString);
                    hourIndex -= 1; 
                }
                else {
                    timeString = hourIndex.toString() + ":00";
                    currLabels.push(timeString);
                    hourIndex -= 1;
                }
            }
            currLabels = currLabels.reverse();
            $.getJSON(url[m], function(datum) {
                checkAPI = true;
                energy = datum.data;
                if (energy) {
                    tracker = [];
                    let k = 0;
                        while (kerr[m].length < 23) {
                            if (energy[k][1] == null || energy[k][1] == 0 || energy[k][1] == undefined) {
                                energy.splice(k, 1);
                            }
                            else {
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

    $(".chart-options").click(function() {
        $(".chart-options").removeClass("active-tab");
        $(this).addClass("active-tab");
    //     if ($(this).html() == "week") {
    //         console.log("weeeeeek");
    //         setupWeek();
    //     }
    //     else if ($(this).html() == "day") {
    //         console.log("daaaaay");
    //         setupDay();
    //     }
    // });
});











    // IN CASE THE API HAS BEEN CALLED TOO MANY TIMES
    setTimeout(function() {
        if (!checkAPI) {
        console.log("back up data in case API called too many times");
        setupError();
        }
    }, 7500);


        // Error handling API
    let apiError = "https://api.eia.gov/series/?";
    let keyError = "api_key=2ac7c2560b1ced48de2d1c77c09ddda1";
    let seriesError = ["&series_id=ELEC.CONS_TOT.COW-AL-98.", "&series_id=ELEC.CONS_TOT.COW-CO-98.", "&series_id=ELEC.CONS_TOT.COW-AR-98.", "&series_id=ELEC.CONS_TOT.COW-AZ-98.", "&series_id=ELEC.CONS_TOT.COW-FL-98."];
    let mS = "M";
    let qS = "Q";
    let aS = "A";



    function setupError() {
        kerr = [[],[],[],[],[]];
        callEnergyError();
    }


    function callEnergyError() {
        for (let m = 0; m < 5; m ++) {
            url.push(apiError + keyError + seriesError[m] + mS);
            $.getJSON(url[m], function(datum) {
                energy = datum.series[0].data;
                if (energy) {
                    tracker = [];
                    let k = 0;
                    console.log(energy[0][1]);
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
                        setInterval(chart.update(), 4000);
                
                }
            });
        }
    }

Chart.defaults.global.defaultFontFamily = "Source Sans Pro";
var ctx = document.getElementById('fixedChart-1').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: currLabels,
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
            backgroundColor: '#2ecc71',
            borderColor: '#2ecc71',
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
        // title: {
        //     display: true,
        //     text: "Clark Kerr Energy Consumption (kWh)"
        // },
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
        legend: {
            position: 'bottom',
        }
    }
});


// *********************
// POINTS DOUGHNUT CHART
// *********************

var ctxUser = document.getElementById('user-points-chart').getContext('2d');
var userPointsChart = new Chart(ctxUser, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#2ecc71', '#eee']
        }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'completed',
            'to complete'
        ]
    },
    options: {
        cutoutPercentage: 70,
        legend: {
            display: false,
        }
    },
});

var ctxBuild = document.getElementById('building-points-chart').getContext('2d');
var buildingPointsChart = new Chart(ctxBuild, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [0, 154, 2369, 1979, 1574],
            backgroundColor: ['#ff6384', '#F7CE5B', '#2ecc71', '#F0B67F', '#9AC4F8' ]
        }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Building 2',
            'Building 3',
            'Building 4',
            'Building 7',
            'Building 8'
        ]
    },
    options: {
        cutoutPercentage: 70,
        legend: {
            display: false,
        }
    },
});

// *******************
// TALLYING THE POINTS
// *******************

// needs to be constantly running :(
// let timeCheck = new Date();
// setTimeout(604800000) milliseconds between 7 days 

// only want to take from one month for now to prevent over calling API

// let histDates = ['&start=2017-09-03', '&start=2017-09-10', '&start=2017-09-17', '&start=2017-09-24'];  
// let currSum;  
// let perc;
// let minusPerc;
// let multPerc;
// kerrPoints = [[],[],[],[],[]];       



//         for (let m = 0; m < 5; m ++) {
//             for (let x = 0; x < 4; x++)
//                 url.push(api + buildings[m] + endingPart + key + elecConsump + histDates[x] + intervals[2] + quantity + '&callback=?');
//             $.getJSON(url[m], function(datum) {
//                  {
//                     currSum = datum.sum;
//                     perc = currSum/4168;
//                     if (perc > 1) {
//                         points = 0;
//                     }
//                     else {
//                         minusPerc = 1 - perc;
//                         multPerc = minusPerc * 1000;
//                         kerrPoints[m][0] = kerrPoints[m][0] + multPerc;
//                     }
//                 }
// Currently a simple proportional relationship, 
// but we are working on creating a multiplier for continuous good trends
// 
// from 2017-09-03 to 2017-10-01 to avoid overcalling API for now


let sumPoints; 

function localData() {              
    $.getJSON("js/data.json", function(thePoints) {
        console.log(thePoints.kerr[0].name);
        for (let y = 0; y < 5; y ++) {
            sumPoints = 0;
            for (let p = 0; p < 5; p ++) {
                sumPoints = thePoints.kerr[y].points[p] + sumPoints;
            }
            $('#point-leaders > tbody:last-child').append("<tr><td>"+thePoints.kerr[y].name+"</td><td>"+sumPoints+"</td></tr>");
        }
    });
}

localData();

        





});