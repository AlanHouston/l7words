import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from "./Chart";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Landing() {
    const [loading, setLoading] = useState(false);
    // loading for fetching text from API
    const [text, setText] = useState('');
    // set text to be calculated
    const [wordCount, setWordCount] = useState(0);
    const [haveData, setHaveData] = useState(false);
    const [preCalculation, setPreCalculation] = useState(true);
    // haveData &  preCalculation for conditional rendering
    let textAreaInput = '';
    const [lengthDist, setLengthDist] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    // 21 placeholders, 1-20 & 20+
    const [useArray, setUseArray] = useState([]);
    // to nail doen array to send as props

    const fetchStory = () => {
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
            // validate inputted text, set text state
        } else {
            alert('Please enter some letters');
        }
    }

    const getTextData = () => {
        let textArr = text.trim().split(' ');
        setWordCount(textArr.length);
        setHaveData(true);
        // again, for conditional rendering
        textArr.forEach(e => {
            let l = e.replace(/[^a-zA-Z]/g,"").length;
            // remove any punctuation/non-letters
            let objPos = l.toString();
            if (objPos <= 20 && objPos != 0) {
                setLengthDist(lengthDist[objPos-1]+=1);
            } else if (objPos > 20) {
                setLengthDist(lengthDist[20]+=1);
            }
            setUseArray(lengthDist);
            //lengthDist was converting type when passed as props, so useArray was my solution so capturing the necessary data
        })
    }

    const showDistribution = () => {
        setPreCalculation(false);
        // previously used for debugging purposes, current use is update conditional rendering
    }

    const startOver = () => {
        // reset state, start from beginning
        setText('');
        setWordCount(0);
        setHaveData(false);
        setPreCalculation(true);
        setLengthDist([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
        setUseArray([]);
    }

    return (
        <>
            {text === '' ? (
                    <section id="chooseText">
                        {loading === false ? (
                            <>
                                <Container>
                                    <Row>
                                        <Col md={{span: 8, offset: 2}}>
                                            <p>This application begins by calculating the distribution of the length of every word in a sample of text. That distribution will then be compared the distribution of word length for all words in the English language.</p>
                                            <h3>Please choose a method for importing sample text:</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={{span: 1, offset: 3}}>
                                            <h4>1.</h4>
                                        </Col>
                                        <Col md='4'>
                                            <button onClick={() => {fetchStory()}}>Fetch text from API</button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={{span: 1, offset: 3}}>
                                            <h4>2.</h4>
                                        </Col>
                                        <Col md='5'>
                                            <h5>Type or paste text here:</h5>
                                            <div><textarea id="copiedText" maxLength="2000" onChange={e => {handleTextAreaChange(e)}}></textarea></div>
                                            <button onClick={() => {submitTextAreaValue()}}>Use provided text</button>
                                        </Col>
                                    </Row>
                                </Container>
                            </>
                            ) : (
                                <div className="loader"></div>
                            )}
                    </section>
                ) : (
                    <section>
                        <div id="textSampleLabel">Text Sample:</div>
                        <div id="selectedText">{text}</div>
                        {haveData === false ? (
                            <button onClick={() => {getTextData()}}>Use this text</button>
                        ) : (
                            <div>
                                {preCalculation === true ? (
                                    <>
                                        <h2>Data Calculated!</h2>
                                        <h6>{wordCount} words in the sample</h6>
                                        <button onClick={() => {showDistribution()}}>Show distribution</button>
                                    </>
                                    ) : (
                                        <>
                                            <h6>{wordCount} words in the sample</h6>
                                            <Chart lengthDist={useArray}/>
                                        </>
                                    )
                                }
                            </div>
                        )}
                        <div><button onClick={() => {startOver()}}>Enter different text</button></div>
                    </section>
                )
            }
        </>
    )
    
}