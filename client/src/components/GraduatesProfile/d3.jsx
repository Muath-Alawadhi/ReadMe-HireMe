import React, { useEffect } from 'react';
import * as d3 from 'd3';

function CommitGraph({ commitData }) {
    
    useEffect(() => {
        
       // sets up dimensiosn for grapgh  
        const width = 1000;  
        const height = 300; 
        const marginTop = 20; 
        
       // sets up dimensions for x axis 
        const xScale = d3.scaleBand()
            .domain(commitData.map(d => d.month))
            .range([30, width])
            .padding(0.2);
     // sets up dimensions for y axis
       const yScale = d3.scaleLinear()
            .domain([0, d3.max(commitData, d => d.commits) * 1.1])  // Merged max and padding into domain
            .range([height - marginTop, 0]);
      // sets up dimensions for the chart 
        const svg = d3.select("#my-svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "white")
            .style("border", "1px solid black");  // Add a border
     //   sets up dimensions for the bar
        svg.selectAll("rect")
            .data(commitData)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.month))
            .attr("y", d => yScale(d.commits))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.commits) - marginTop)
            .attr("fill", "green")
            .on("mouseover", function(event, d) {
              d3.select(this).attr("fill", "red");
              svg.append("text")
              .attr("id", "tooltip")
              .attr("x", xScale(d.month))
              .attr("y", yScale(d.commits) - 5)
              .attr("text-anchor", "middle")
              .text(d.commits);
            })
           .on("mouseout", function() {
             d3.select(this).attr("fill", "green");
             d3.select("#tooltip").remove();
            });

        // details for the X-axis
       const xAxis = d3.axisBottom(xScale);
         svg.append("g")
         .attr("transform", `translate(0, ${height - 20})`)  // Adjust position
         .attr("color", "black")  // Text Color
         .style("font-size", "14px")  // Font Size
         .style("font-weight", "bold")  // Font Weight
         .call(xAxis);

       // details for the y-axis
      const yAxis = d3.axisLeft(yScale).ticks(5);
         svg.append("g")
         .attr("color", "black")
         .attr("transform", "translate(30, 0)") 
         .style("font-size", "14px")
         .style("font-weight", "bold")
         .call(yAxis);
      // graph title
         svg.append("text")
         .attr("x", width / 2)
         .attr("y", 20)
         .style("text-anchor", "middle")
         .text("GitHub Contributions");

    // y-axis label
        svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -10)  
         .attr("x", 0 - height / 2)
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text("Commits");


    }, [commitData]);

    return (
        <div className="graph-container" style={{ overflowX: 'scroll', width: '600px' }}>
            <svg id="my-svg"></svg>
        </div>
    );
}

export default CommitGraph;

