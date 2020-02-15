function init_menu() {
    //var selectElement = d3.select("select");

    // import source data.json
    d3.json("/resource/samples.json").then((data) =>{
            data.names.forEach((indiv) => {
            // append new tag under <select>
            d3.select("#selDataset").append("option")
                                    .text(indiv)
                                    .property("value", indiv);
        });
    })    
};



function buildPanel(id) {
     d3.json("/resource/samples.json").then((data) =>{
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

//function buildCharts(id) {
    //var xData = ;
    //var yData = ;

    
//}


// html attr to build an event listner-- onchange
function optionChanged(sample) {
    // call two seperate modules
    buildPanel(sample);
    //buildCharts(sample);
};

//d3.selectAll("select").on("change", optionChanged(sample));
//function optionChanged() {
    //buildPanel(sample);
    //buildCharts(sample);
//};


init_menu();