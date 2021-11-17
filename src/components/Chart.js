import { useEffect } from "react";
// const Chart = require('chart.js');
import { Bar } from 'react-chartjs-2';

export default function Chart(props) {
    useEffect(() => {
        // let lengthDistArr = Object.values(props.lengthDist);
        console.log('in chart:')
        console.log(props.lengthDist);
    }, [])
    const regularDistChartData = {
        labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','20+'],
        datasets: [
            {
                label: 'Number of letters',
                data:[2,93,754,3027,6110,10083,14424,16624,16551,14888,12008,8873,6113,3820,2323,1235,707,413,245,135,189],
                backgroundColor: ['red']
            },
            {
                label: 'Story',
                data: props.lengthDist,
                backgroundColor: ['blue']
            }
        ]
    }
    // const data = canvas => {
    //     const ctx = canvas.getContext('2d');
    // }

    return (
        <>
            <Bar
                data={regularDistChartData}
                width={100}
                height={50}
                options={{
                    title: {
                        display: true,
                        text: 'Distribution of words by length',
                        maintainAspectRatio: true
                    }
                }}
            />
        </>
    )
}