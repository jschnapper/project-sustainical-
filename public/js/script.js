$(document).ready(function () {

    console.log("work");

    
    



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








 