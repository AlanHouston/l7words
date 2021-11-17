import { useEffect, useState } from "react";
// const Chart = require('chart.js');
import { Bar, Line } from 'react-chartjs-2';

export default function Chart(props) {
    const [selectedType, setSelectedType] = useState('Line');

    useEffect(() => {
        // let lengthDistArr = Object.values(props.lengthDist);
        console.log('in chart:')
        console.log(props.lengthDist);
    }, [])
    const chartDataDist = {
        labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','20+'],
        datasets: [
            {
                label: 'English Language',
                // data:[2,93,754,3027,6110,10083,14424,16624,16551,14888,12008,8873,6113,3820,2323,1235,707,413,245,135,189],
                // initial data taken from source https://arxiv.org/pdf/1207.2334.pdf, page 20, data in use sclaed down by 150
                data: [
                    0.013333333333333334,               0.62,
                       5.026666666666666,              20.18,
                      40.733333333333334,              67.22,
                                   96.16, 110.82666666666667,
                                  110.34,  99.25333333333333,
                       80.05333333333333, 59.153333333333336,
                       40.75333333333333, 25.466666666666665,
                      15.486666666666666,  8.233333333333333,
                       4.713333333333333, 2.7533333333333334,
                      1.6333333333333333,                0.9,
                                    1.26
                  ],
                backgroundColor: ['red']
            },
            {
                label: 'Sample Text',
                data: props.lengthDist,
                backgroundColor: ['blue']
            }
        ]
    }

    const title = <h2>Distribution of Words by Length</h2>

    const selectChartType = (
        <div>
            <button id="barChartBtn" name="Bar" className="chartSelectedBtn chartBtn">Show Bar Chart</button>
            <button id="lineChartBtn" name="Line" className="chartNotSelectedBtn chartBtn">Show Line Chart</button>
        </div>
    )

    switch(selectedType) {
        case 'Bar':
            return (
                <>
                    {title}
                    <Bar
                        data={chartDataDist}
                        width={100}
                        height={50}
                        options={{}}
                    />
                    {selectChartType}
                </>    
            );
        case 'Line': 
            return (
                <>
                    {title}
                    <Line
                        data={chartDataDist}
                        width={100}
                        height={50}
                        options={{
                            scales: {
                                y: {
                                    title: { 
                                        display: true,
                                        text: 'Frequency'
                                    }
                                },
                                x: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Number of letters in word'
                                    }
                                }
                            }
                        }}
                    />
                    {selectChartType}
                </>
            );
        default:
            return (
                <div>Nothing to show</div>
            );
    }
}