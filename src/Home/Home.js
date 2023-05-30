import React from "react";
import Header from "../Header/header";
import * as sortingAlgorithms from '../Algorithms/algorithms';
import './home.css';
export default class Home extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            array : [],
            max : -2
        };
    }
    componentDidMount() {
        this.resetArray();
    }
    resetArray = () => {
        const array = [];
        for(let i = 0; i < 100; i++){
            array.push(this.randIntFromRange(50,1000));
        }
        this.setState({array});
    }
    mergeSort = () => {
        const arr = sortingAlgorithms.mergeSort(this.state.array);
        this.setState({array : arr});
    }
    bubbleSort = () => {
        const result = sortingAlgorithms.bubbleSort(this.state.array);
        this.try(result.animation);
        // this.setState({array : result.sorted});
    }
    insertionSort = () => {
        const arr = sortingAlgorithms.insertionSort(this.state.array);
        this.setState({array : arr});
    }
    selectionSort = () => {
        const arr = sortingAlgorithms.selectionSort(this.state.array);
        this.setState({array : arr});
    }
    quickSort = () => {
        const arr = sortingAlgorithms.quickSort(this.state.array);
        this.setState({array : arr});
    }
    randIntFromRange(min, max){
        return Math.floor(min + Math.random() * (max - min + 1)); 
    }
    try(animation) {
        let array = [...this.state.array];
        console.log("animations array: ", animation);
        let time = 0;
        for (let i = 0; i < animation.length; i++) {
            setTimeout(() => {
                let k = 0;
                for (let j = 0; j < array.length; j++) {
                if (k < animation[i][1].length) {
                    if (j === animation[i][1][k]) {
                        this.setState({ max : j });
                        setTimeout(() => {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                            this.setState({ array: [...array]});
                        }, k * 10);
                        k++;
                    }
                }
                }
            }, time);
            time += animation[i][1].length * 10;
        }
        this.setState({max : -1});
      }
    render() {
    const {array} = this.state;
    return (
        <>
            <Header reset={this.resetArray} Sort={{
                mergeSort: this.mergeSort,
                quickSort: this.quickSort,
                bubbleSort: this.bubbleSort,
                insertionSort: this.insertionSort,
                selectionSort: this.selectionSort
            }} />
            <div className="container">
                <div className="array">
                        {array.map((value, index) => (
                                (index == this.state.max + 1)
                                ? <div className="array-bar" key={index} style={{ height: `${(value) / 2}px`, backgroundColor: "red"  }} />
                                : <div className="array-bar" key={index} style={{ height: `${(value) / 2}px` }} />
                                )
                        )}
                </div>
            </div>
        </>
    )}
}