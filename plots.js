function init_menu() {
    //var selectElement = d3.select("select");

    // import source data.json
    d3.json("samples.json").then((data) =>{
            data.names.forEach((indiv) => {
            // append new tag under <select>
            d3.select("#selDataset").append("option")
                                    .text(indiv)
                                    .property("value", indiv);
        });
    }) ;
    buildPanel("940");
    buildCharts("940")
};



function buildPanel(id) {
     d3.json("samples.json").then((data) =>{
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == id);
        var result = resultArray[0];  // filter returns an array!! we need the element(an obj) of this array

        // populate into html
        var PANEL = d3.select("#sample-metadata");
        PANEL.html(""); // clear any previous record in panel
        Object.entries(result).forEach(([k,v]) =>{  //entries returns Array, then use foeEach to string
            var resultKey = k;
            var resultVulue = v;
            PANEL.append("h6").text(resultKey.toUpperCase() + ":" + resultVulue);
        });

    });
};

function buildCharts(id) {
    d3.json("samples.json").then((data) =>{
        var samplesData =  data.samples;
        var sampleResultArray = samplesData.filter(sampleObj => sampleObj.id == id);
        var sampleResult = sampleResultArray[0];
        
        var barXdata = sampleResult.sample_values.map((val) =>parseInt(val)).slice(0,10);
        var barYdata = sampleResult.otu_ids.map((oi) =>"OTU " + oi).slice(0,10);
        var barHoverText = sampleResult.otu_labels.slice(0,10);
        
        var barTrace = {
            x:barXdata, y: barYdata, text: barHoverText, 
            type: "bar", orientation: "h"
        };
        var barLayout = {
            title: "Volunteer Samples Top 10 Bacterial Species (OTUs)",
            xaxis: {title: "Sample Values"},
            yaxis: {autorange: "reversed"}
        };
        // build Bar Chart 
        Plotly.newPlot("bar", [barTrace], barLayout);

        //------------------------------------
        var bubbleXdata = sampleResult.otu_ids;
        var bubbleYdata = sampleResult.sample_values;
        var bubbleHover = sampleResult.otu_labels;

        var bubbleTrace = {
            x: bubbleXdata, y: bubbleYdata, text:bubbleHover,
            mode:"markers", marker:{
                size: bubbleYdata,
                color:bubbleXdata
            }
        };
        var bubbleLayout = {
            title: "Volunteer Samples (OTUs)",
            xaxis: {title: "OTUs ID"}
        };

        // build Bubble Chart
        Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout)
        
        //----------------------------------------
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == id);
        var result = resultArray[0];
        var gaugeData = parseInt(result.wfreq);


        var gaugeTrace = {
            type: "indicator",
            mode:"gauge+number",
            value: gaugeData,
            gauge:{
                axis :{range: [null,9] },
                steps: [{range: [0,1], color:"#edfaf1"},
                        {range: [1,2], color:"#d3f5dd"},
                        {range: [2,3], color:"#82bf94"},
                        {range: [3,4], color:"#599e6d"},
                        {range: [4,5], color:"#408754"},
                        {range: [5,6], color:"#2b6e3e"},
                        {range: [6,7], color:"#206132"},
                        {range: [7,8], color:"#144722"},
                        {range: [8,9], color:"#0b2e15"}
                        ]
            }
        };
        var gaugeLayout = {
            title: "Belly Button Washing Frequency<br>Scrubs per Week",
        };


        // build Indicator Chart
        Plotly.newPlot("gauge", [gaugeTrace],gaugeLayout);

        //BAR =d3.select("#bubble").append("h1").text();


    });
}


// html attr to build an event listner-- onchange
function optionChanged(sample) {
    // call two seperate modules
    buildPanel(sample);
    buildCharts(sample);
};

//d3.selectAll("select").on("change", optionChanged(sample));
//function optionChanged() {
    //buildPanel(sample);
    //buildCharts(sample);
//};


init_menu();