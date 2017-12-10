$(document).ready(function() {

    console.log("welcome to the dash");

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
    let checkAPI = false;

    function setupWeek() {
        kerr = [[],[],[],[],[]];
        callEnergyWeek();
    }


    function callEnergyWeek() {
        for (let m = 0; m < 5; m ++) {
            url.push(api + buildings[m] + endingPart + key + elecConsump + intervals[2] + quantity + '&callback=?');
            console.log(url[0]);
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

    setupWeek();
    
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


});