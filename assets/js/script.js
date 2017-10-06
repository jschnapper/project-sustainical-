$(document).ready(function() {

	d3.select("p").text("tomato tomato");

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

    d3.csv("energy.csv", function(data) {
    	console.log("good");
        var chart = d3.select("#energy-chart");
        chart.selectAll(".bars")
    		.data(data)
    		.enter()
			.append(".bars")
			.attr("width", function(d) {return d.TotalC2010/100000})
			.attr("y", function(d, i) {return i*10});
    });  

});


