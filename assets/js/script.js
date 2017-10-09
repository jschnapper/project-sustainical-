$(document).ready(function() {

	// d3.select("p").text("tomato tomato");

	// https://scrimba.com/casts/cast-1953 for me to learn how it works
	var numbers = [30, 86, 168, 281, 303, 365];

	d3.select(".chart")
  		.selectAll("div")
  		.data(numbers)
    		.enter()
    		.append("div")
    		.classed("more", true)
    		.style("width", function(d) { return d + "px"; })
    		.text(function(d) { return d; });


    // HOME

   //  d3.csv("energy.csv", function(data) {
   //  	console.log("good");
   //      var chart = d3.select("#energy-chart");
   //      chart.selectAll(".bars")
   //  		.data(data)
   //  		.enter()
			// .append(".bars")
			// .attr("width", function(d) {return d.TotalC2010/100000})
			// .attr("y", function(d, i) {return i*10});
   //  });

// FROM CHART.JS

    var ctx = $(".chart1");
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"],
            datasets: [{
                label: "Ida Sproul Energy Consumption",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data:[30, 42, 38, 35, 41, 27, 25],
                fill: false,
        }],
            options: {}
        },

    });



});


