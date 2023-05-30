import React from "react";
import './header.css';
export default class Header extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    // constructor(props){
    //     // super(props);
    // }
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
                                <div className="controlOption">Animation Speed</div>
                                <div className="controlOption" onClick={this.props.reset}>Create new Array</div>
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