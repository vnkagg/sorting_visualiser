import React from "react";
import Header from "../Header/header";
import * as sortingAlgorithms from '../Algorithms/algorithms';
import './home.css';
export default class Home extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            array : [],
            bubble : {
                max : -2,
                settle : -2,
                pause : false
            },
            merge : {
                Divisions : {
                    left : [],
                    right : []
                },
                Comparisons : {
                    
                }
            },
            sort : ""
        };
    }
    isPause(){
        const pause = !this.state.pause;
        this.setState({pause : pause});
    }
    componentDidMount() {
        this.resetArray();
    }
    resetArray = () => {
        const array = [];
        for(let i = 0; i < 25; i++){
            array.push(this.randIntFromRange(50,1000));
        }
        this.setState({array});
        // console.log(this.state);
    }
    mergeSort = () => {
        this.setState({sort : "merge"});
        const {divisions, comparisons} = sortingAlgorithms.mergeSort(this.state.array);
        console.log("divisions : ", divisions);
        console.log("comparisons : ", comparisons);
        // this.setState({array});
        // animations -> divided, comparisons.
        let array = [...this.state.array];
        let time = 0;
        // for(let i = 0; i < divisions.length - 1 ; i++){
        //     setTimeout(() => {
        //         this.setState(
        //             { merge : { 
        //                     Divisions : { 
        //                         left : [...divisions[i][0]], 
        //                         right : [...divisions[i][1]] 
        //                     }
        //                 } 
        //             }
        //         )
        //     }, i*100);
        // }
        // time+=divisions.length*100;
        // setTimeout(() => {
        //     let arrayog = this.state.array;
        //     for(let i = comparisons.length - 1; i>=0; i--){
        //         setTimeout(() => {
        //             const [smaller, larger] = comparisons[i];
        //             let a = arrayog[smaller];
        //             arrayog[smaller] = arrayog[larger];
        //             arrayog[larger] = a;
        //             this.setState({ array : arrayog });
        //         }, i*10)
        //     }
        // }, time)
      };
    bubbleSort = () => {
        this.setState({sort : "bubble"});
        let array = [...this.state.array];
        const result = sortingAlgorithms.bubbleSort(array);
        const animation = result.animation;
        // console.log("animations array: ", animation);
        let time = 0;
        for (let i = 0; i < animation.length; i++) {
            // while(this.state.pause){
            //     console.log(this.state.pause);
            // }
            // setTimeout(() => {
            // }, time);
            setTimeout(() => {
                let k = 0;
                for (let j = 0; j < array.length; j++) {
                    if (k < animation[i][1].length) {
                        if (j === animation[i][1][k]) {
                            setTimeout(() => {
                                this.setState({ bubble : {max : j+1, settle : array.length - i - 1} });
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                                this.setState({ array: [...array]});
                            }, k * 200);
                            k++;
                        }
                    }
                }
                this.setState({ bubble : { max : -2 }});
            }, time);
            time += animation[i][1].length * 200;
        }
          
    }
    insertionSort = () => {
        const arr = sortingAlgorithms.insertionSort(this.state.array);
        this.setState({sort : "insertion"});
        this.setState({array : arr});
    }
    selectionSort = () => {
        const arr = sortingAlgorithms.selectionSort(this.state.array);
        this.setState({sort : "selection"});
        this.setState({array : arr});
    }
    quickSort = () => {
        const arr = sortingAlgorithms.quickSort(this.state.array);
        this.setState({array : arr});
    }
    randIntFromRange(min, max){
        return Math.floor(min + Math.random() * (max - min + 1)); 
    }
    // animateSort(animation) {
    //     let array = [...this.state.array];
    //     let time = 0;
    //     for (let i = 0; i < animation.length; i++) {
    //       while (this.state.pause) {
    //         console.log(this.state.pause);
    //       }
    //       setTimeout(() => {
    //         const [comparisons, mergedArray] = animation[i];
    //         for (let j = 0; j < comparisons.length; j++) {
    //           const [index, value] = comparisons[j];
    //           array[index] = value;
    //         }
    //         this.setState({ array: [...array] });
    //       }, time);
    //       time += 200;
    //     }
    //   }
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
                                (this.state.sort === 'bubble')
                                ? <div 
                                    className={`array-bar ${index!==this.state.bubble.max ? "normal-bar" : ""}`} key={index} 
                                    style={{ height: `${(value) / 2}px`, backgroundColor: `${index === this.state.bubble.max ? "#f2cbcb84" : index ===this.state.bubble.settle ? "white" :  "#282c34"}` }} 
                                />
                                : (this.state.sort === 'merge')
                                ? <div 
                                    className="array-bar" key={index} 
                                    style={{
                                            height: `${(value) / 2}px`, 
                                            backgroundColor: 
                                                `${this.state.merge.Divisions.left.includes(index)
                                                     ? "#ffffff" 
                                                     : this.state.merge.Divisions.left.includes(index)
                                                     ? "#808080"
                                                     : "#282c34"}`
                                            }} 
                                />
                                : <div 
                                    className="array-bar" key={index} 
                                    style={{ height: `${(value) / 2}px` }} 
                                />
                            )
                        )}
                </div>
            </div>
        </>
            )
    }
}



// (index == this.state.max + 1) ? 
//                                 <div className="array-bar" key={index} style={{ height: `${(value) / 2}px`, backgroundColor: "#f2cbcb84"  }} /> :
//                                 <div className="array-bar" key={index} style={{ height: `${(value) / 2}px`, backgroundColor: `${index === this.state.select ? "black" : "#282c34"}` }} />