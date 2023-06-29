import React from "react";
import './header.css';
export default class Header extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    // constructor(props){
    //     // super(props);
    // }
    constructor(props){
        super(props);
        this.state = {
            slider : 100
        }
    }
    handleChange = (event) => {
        this.setState({slider : event.target.value});
        this.props.speed(parseInt(event.target.value));
    }
    render() {
        return (
            <>
                <div className="Header">
                    {/* <div className="left">
                    </div> */}
                    <div className="center">
                        <h1>SORTING VISUALISER</h1>
                        <div className="list">
                            <div className="controlOptions">
                                <div className="controlOption" onClick={this.props.reset}>Create new Array</div>
                                <div className="controlOption" onClick={this.props.restore}>Restore</div>
                                <div><input type="range" min="25" max="200" step="25" value={this.state.slider} onChange={this.handleChange} /></div>
                                {/* <div className="controlOption">0.25x</div>
                                <div className="controlOption">0.5x</div>
                                <div className="controlOption">0.75x</div>
                                <div className="controlOption">1x</div>
                                <div className="controlOption">1.25x</div>
                                <div className="controlOption">1.5x</div>
                                <div className="controlOption">1.75x</div>
                                <div className="controlOption">2x</div> */}
                            </div>
                            <div className="sorts">
                                <div className="listItem" onClick={this.props.Sort.mergeSort}>Merge</div>
                                <div className="listItem" onClick={this.props.Sort.quickSort}>Quick</div>
                                <div className="listItem" onClick={this.props.Sort.bubbleSort}>Bubble</div>
                                <div className="listItem" onClick={this.props.Sort.insertionSort}>Insertion</div>
                                <div className="listItem" onClick={this.props.Sort.selectionSort}>Selection</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}