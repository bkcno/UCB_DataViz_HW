// D3 Scatterplot 
var svgWidth = 720;
var svgHeight = 600;
var margin = { top: 20, right: 40, bottom: 120, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var chart = svg.append("g");
d3.csv("data/data.csv", function(err, stateData) {
    if (err) {
        throw err;
    }
    stateData.forEach(function(data) {
        data.education = +data.education;
        data.healthcare = +data.healthcare;
        console.log(data)
    });
    // Create scale functions
    var yLinearScale = d3.scaleLinear()
        .range([height, 0]);
    var xLinearScale = d3.scaleLinear()
        .range([0, width]);
    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    // Scale the domain d3.extent(stateData, function(data)
    xLinearScale.domain([5, d3.max(stateData, function(data) {
        return +data.education;
    })]);
    yLinearScale.domain([0, d3.max(stateData, function(data) {
        return +data.healthcare;
    })]);
   
    var toolTip = d3
        .tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(data) {
            var stateName = data.state;
            var educationLevel = +data.education;
            var healthcareCoverage = +data.healthcare;
            return (stateName + "<br> Education: " + educationLevel + "<br> Healthcare: " + healthcareCoverage);
        });

    chart.call(toolTip);

    chart.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", function(data, index) {
            return xLinearScale(data.education);
        })
        .attr("cy", function(data, index) {
            return yLinearScale(data.healthcare);
        })
        .attr('text-anchor', "middle")
        .attr('dy', '0.35em')
        .text(function(data) { 
            return data.abbr;
        })    
        .attr("r", "12")
        .attr("fill", "steelblue")
        .style("stroke", "grey")
        .style("opacity", 0.8)
        .on("mouseover", toolTip.show)
        .on("mouseout", toolTip.hide);

    chart.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .attr("class", "stateAbbr")
        .text(function(data) { return data.abbr })
        .attr("x", function(data, index) {
            return xLinearScale(data.education);
        })
        .attr("y", function(data, index) {
            return yLinearScale(data.healthcare);
        });
        
     
    chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chart.append("g")
        .call(leftAxis);
    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");

    // Append x-axis labels
    chart.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 30) + ")")
        .attr("class", "axis-text active")
        .attr("data-axis-name", "education")
        .text("Education Level, less than high school graduate (%)");
    
    chart.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 48) + ")")
        .attr("class", "axis-text inactive")
        .attr("data-axis-name", "higheducation")
        .text("Education Level, college graduate or higher (%)");    

    chart.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 64) + ")")
        .attr("class", "axis-text inactive")
        .attr("data-axis-name", "poverty")
        .text("In Poverty %");
    
    function labelChange(clickedAxis) {
            d3
                .selectAll(".axis-text")
                .filter(".active")
            // An alternative to .attr("class", <className>) method. Used to toggle classes.
                .classed("active", false)
                .classed("inactive", true);
    
            clickedAxis.classed("inactive", false).classed("active", true);
        }
    
        function findMinAndMax(dataColumnX) {
            return d3.extent(stateData, function(data) {
                return +data[dataColumnX];
            });
        }
    
        d3.selectAll(".axis-text").on("click", function() {
        // Assign a variable to current axis
            var clickedSelection = d3.select(this);
            // "true" or "false" based on whether the axis is currently selected
            var isClickedSelectionInactive = clickedSelection.classed("inactive");
            // console.log("this axis is inactive", isClickedSelectionInactive)
            // Grab the data-attribute of the axis and assign it to a variable
            // e.g. if data-axis-name is "poverty," var clickedAxis = "poverty"
            var clickedAxis = clickedSelection.attr("data-axis-name");
            console.log("current axis: ", clickedAxis);
    
            // The onclick events below take place only if the x-axis is inactive
            // Clicking on an already active axis will therefore do nothing
            if (isClickedSelectionInactive) {
                // Set the domain for the x-axis
                xLinearScale.domain(findMinAndMax(clickedAxis));
                // Create a transition effect for the x-axis
                svg
                    .select(".x-axis")
                    .transition()
                // .ease(d3.easeElastic)
                    .duration(1800)
                    .call(bottomAxis);
                // Select all circles to create a transition effect, then relocate its horizontal location
                // based on the new axis that was selected/clicked
                d3.selectAll("circle").each(function() {
                    d3
                        .select(this)
                        .transition()
                    // .ease(d3.easeBounce)
                        .attr("cx", function(data) {
                            return xLinearScale(+data[clickedAxis]);
                        })
                        .duration(1800);
                });
    
                labelChange(clickedSelection);
            }
        });       
});

// resizing for mobile phone users
// d3.select(window).on('resize', [name of function])
