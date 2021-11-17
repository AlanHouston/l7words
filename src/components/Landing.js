import { useState } from "react";
import axios from "axios";
import Chart from "./Chart"

export default function Landing() {
    const [loading, setLoading] = useState(false);
    // calculationLoading?
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(null);
    const [haveData, setHaveData] = useState(false);
    const [preCalculation, setPreCalculation] = useState(true);
    let textAreaInput = '';
    const [lengthDist, setLengthDist] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [useArray, setUseArray] = useState([]);
    // let lengthDist = 
    //     {
    //         '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '20+': 0
    //     }
    

    const fetchStory = () => {
        // e.preventDefault();
        setLoading(true);
        axios.get('https://shortstories-api.herokuapp.com/')
            .then(res => {
                setLoading(false);
                console.log("story: " + res.data.story);
                setText(res.data.story);
            }).catch(err => {
                console.log(err);
            })
    }

    const handleTextAreaChange = (e) => {
        textAreaInput = e.target.value;
    }

    const submitTextAreaValue = () => {
        if (textAreaInput.search(/[^a-zA-Z]/g)){
            setText(textAreaInput);
        } else {
            alert('Please enter some letters');
        }
    }

    // const getTextData = () => {
    //     let textArr = text.split(' ');
    //     setWordCount(textArr.length);
    //     setHaveData(true);
    //     textArr.forEach(e => {
    //         let l = e.replace(/[^a-zA-Z]/g,"").length;
    //         let objPos = l.toString();
    //         if (objPos <= 20 && objPos != 0) {
    //             lengthDist[objPos]++
    //         } else if (objPos > 20) {
    //             lengthDist['20+']++
    //         }
    //         //tackle edge case where dash-separated words get combined into one word
    //     })
    //     // console.log('ending landing');
    //     // console.log(lengthDist);
    // }

    const getTextData = () => {
        let textArr = text.split(' ');
        setWordCount(textArr.length);
        setHaveData(true);
        textArr.forEach(e => {
            let l = e.replace(/[^a-zA-Z]/g,"").length;
            let objPos = l.toString();
            if (objPos <= 20 && objPos != 0) {
                setLengthDist(lengthDist[objPos-1]+=1)
                // lengthDist[objPos]++
            } else if (objPos > 20) {
                setLengthDist(lengthDist[20]+=1)
                // lengthDist['20+']++
            }
            //tackle edge case where dash-separated words get combined into one word
        })
        // console.log('ending landing');
        // console.log(lengthDist);
        setUseArray(lengthDist);
        console.log('ending getTextDataFunc');
        console.log(useArray);
    }

    const showDistribution = () => {
        setPreCalculation(false);
        console.log('showDistribution:');
        console.log(lengthDist);
    }

    const startOver = () => {
        setText('');
        setWordCount(null);
        setHaveData(false);
    }

    return (
        <>
            {text === '' ? (
                    <section >
                        {loading === false ? (
                            <>
                                <button onClick={() => {fetchStory()}}>Give me some text from the API, please</button>
                                <div><textarea id="copiedText" maxLength="2000" onChange={e => {handleTextAreaChange(e)}}></textarea></div>
                                <button onClick={() => {submitTextAreaValue()}}>Use the text I have provided</button>
                            </>
                            ) : (
                                <span>Loading!</span>
                            )}
                    </section>
                ) : (
                    <section>
                        <div>{text}</div>
                        {haveData === false ? (
                            <button onClick={() => {getTextData()}}>Calculate the data, please</button>
                        ) : (
                            <div>
                                {preCalculation === true ? (
                                    <>
                                        <h2>Data Calculated!</h2>
                                        <h3>{wordCount} Words</h3>
                                        <button onClick={() => {showDistribution()}}>Show me the distribution, please</button>
                                    </>
                                    ) : <Chart lengthDist={useArray}/>
                                }
                            </div>
                        )}
                        <div><button onClick={() => {startOver()}}>Enter some new text</button></div>
                    </section>
                )
            }
        </>
    )
    
}