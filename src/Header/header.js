import React from "react";
import './header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default class Header extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    // constructor(props){
    //     // super(props);
    // }
    constructor(props){
        super(props);
        this.state = {
            slider : `${!this.props.running ? 100 : 0 }`,
            pause : false,
            inputArray : []
        }
        // this.props.running.addEventListener("slider", () => this.setState({slider : 100}));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.running !== this.props.running && !this.props.running) {
          this.setState({ slider: 100 });
          this.props.speed(100);
        }
      }

    handleChange = (event) => {
        this.setState({slider : event.target.value});
        this.props.speed(parseInt(event.target.value));
    }
    handleInputArray = (array) => {
        this.setState({inputArray : array});
        this.props.arrayEntered(this.state.inputArray);
    }
    // callMergeSort = () => {

    // }
    // callQuickSort = () => {

    // }

    render() {
        return (
            <div>
                <div className="Header">
                    {/* <div className="left">
                    </div> */}
                    <div className="center">
                        <h1>SORTING VISUALISER</h1>
                    </div>
                    <div className="list">

                        <div className="controlOptions">
                            <div className="controlOption" onClick={this.props.reset}>Create new Array</div>
                            <div className="controlOption" onClick={this.props.restore}>Initial Array</div>
                        </div>

                        {this.props.running && 
                            <div className="time" style ={{transform : `${this.props.running ? 'scale(100%)' : "scale(0)"}`}}>
                                <div className = "icon" onClick={this.props.pause}>
                                    {this.props.statePause 
                                    ? (<FontAwesomeIcon icon={faPlay} style={{  color : '#f2cbcb84', 
                                                                                fontSize : 30, 
                                                                                fontWeight : 900}}/>) 
                                    : (<FontAwesomeIcon icon={faPause} style={  {color : '#f2cbcb84', 
                                                                                fontSize : 30, 
                                                                                fontWeight : 900}} />)}
                                </div>
                                <div>
                                    <div style={{paddingTop : 5}}>
                                        <input  type="range" min="25" max="200" step="25"
                                            value={this.state.slider} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                        }
                        {!this.props.running && 
                        <div className="arrayInput" style={{transform : `${!this.props.running ? 'scale(100%)' : 'scale(0)'}`}}>
                            <InputArrayComponent arrayHandling={this.handleInputArray}/>
                        </div>}

                        <div className="sorts">
                            <div className="listItem" style ={{color : `${ this.props.sortMode === 'merge' ? '#f2cbcb' : ""}` }} onClick={this.props.Sort.mergeSort}>Merge</div>
                            <div className="listItem" style ={{color : `${ this.props.sortMode === 'quick' ? '#f2cbcb' : ""}` }}  onClick={this.props.Sort.quickSort}>Quick</div>
                            <div className="listItem" style ={{color : `${ this.props.sortMode === 'bubble' ? '#f2cbcb' : ""}` }}  onClick={this.props.Sort.bubbleSort}>Bubble</div>
                            <div className="listItem" style ={{color : `${ this.props.sortMode === 'insertion' ? '#f2cbcb' : ""}` }}  onClick={this.props.Sort.insertionSort}>Insertion</div>
                            <div className="listItem" style ={{color : `${ this.props.sortMode === 'selection' ? '#f2cbcb' : ""}` }}  onClick={this.props.Sort.selectionSort}>Selection</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function InputArrayComponent({arrayHandling}){
    const [isValid, setisValid] = useState(true);
    const [inputArray, setinputArray] = useState([]);

    const handleChange = (event) => {
        let array = event.target.value;
        // setinputArray(array);
        array = array.trim().split(' ');
        let temp = inputArray;
        setisValid(true);
        for(let i = 0; i < array.length; i++){
            if(array[i].match(/\D+/) !== null){
                setisValid(false);
                break;
            } else {
                array[i] = parseInt(array[i]);
                temp = array.slice(0, i+1);
            }
        }
        console.log("array", array);
        if(isValid){
            setinputArray(temp);
        } 
        arrayHandling(temp);
    }
    return (
        <>
            <input 
                type='text' 
                placeholder="Input Custom Array" 
                onChange={handleChange}
                style={{border: `${!isValid && inputArray !== ''? '2px solid #ff9494' : ''}`, placeholder : `${!isValid ? 'Please Enter Valid Integers (,/ )' : ''}` }}
            />
        </>
    )

}
