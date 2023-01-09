console.log('working');
function init() {
    let selector=d3.select('#selDataset')
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data)=>{
    console.log(data)    
    let names=data.names;
    for (let i=0;i<names.length;i++){
        selector.append('option').text(names[i]).property('value',names[i])
    };
    let firstSample=names[0];
    charts(firstSample);
    metaChart(firstSample);
    })
}
function optionChanged(nextSample){
    charts(nextSample);
    metaChart(nextSample);
}
init();

function metaChart(sample){
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data)=>{
    let metadata = data.metadata;
    let metaArray=metadata.filter(obj=>obj.id==sample);
    let metaResult=metaArray[0];
    let PANEL=d3.select('#sample-metadata');
    PANEL.html('');
    Object.entries(metaResult).forEach(([key,value]) => {
        PANEL.append('h5').text(`${key.toUpperCase()}: ${value}`);
    });
    });
}

function charts(sample){
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data)=>{
        let metadata = data.metadata;
        // console.log(metadata)
        let metaArray=metadata.filter(obj=>obj.id==sample);
        // console.log(metaArray)
        let metaResult=metaArray[0];
        // console.log(metaResult);
        let wfreq=metaResult.wfreq;
        // console.log(wfreq);

        var gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Washing Frequency" },
                type: "indicator",
                mode: "gauge+number"
            }
        ];
        
        var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);

        let sampledata = data.samples;
        // console.log(sampledata)
        let sampleArray=sampledata.filter(obj=>obj.id==sample);
        // console.log(sampleArray)
        let sampleResult=sampleArray[0];
        // console.log(sampleResult);
        // let wfreq=metaResult.wfreq;
        // console.log(wfreq);
        let otu_ids=sampleResult.otu_ids
        let otu_labels=sampleResult.otu_labels
        let sample_values=sampleResult.sample_values

        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
            }
          }];
    
          
          var bubbleLayout = {
            title: 'Marker Size',
            margin: {t:30,b:0,l:0,r:0}
            // height: 600,
            // width: 600
          };
          
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    


        var barData = [
            {
              x: ['otu_ids'],
              y: ['sample_values'],
              type: 'bar'
            }
          ];
          
          Plotly.newPlot('bar', barData, barLayout);
    })
}