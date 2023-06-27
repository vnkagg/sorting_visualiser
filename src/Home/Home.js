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
            speed : 100,
            merge : {
                divisions : {
                    left : [0],
                    right : [0]
                },
                displayArr : [0]
            },
            sort : ""
        };
    }
    // isPause(){
    //     const pause = !this.state.pause;
    //     this.setState({pause : pause});
    // }
    setSpeed = (value) => {
        this.setState(prev => {return {...prev, speed : value}}, () => {console.log(this.state.speed);});
    }
    componentDidMount() {
        this.resetArray();
    }
    resetArray = () => {
        const array = [];
        for(let i = 0; i < 32; i++){
            array.push(this.randIntFromRange(50,1000));
        }
        this.setState(prev => {return {...prev, array : array}});
        // console.log(this.state);
    }
    mergeSort = () => {
        // this.setState((prev) => {
        //     return { ...prev, sort: "merge", merge: { ...prev.merge, divisions: { left: [], right: [] } } };
        //   });
        this.setState(prev => {return {...prev, sort : "merge"}});
        const animations = sortingAlgorithms.mergeSort([...this.state.array]);
        let array = [...this.state.array];
        let speed = this.state.speed;
        this.merge_sort(array, 0, array.length-1, animations, speed);
        this.time = 0;
      };

    time = 0;
    merge_sort(array, l, r, animations, speed){
        if(l>=r){
            return;
        }
        const mid = Math.floor((l+r)/2);
        const division = animations.divisions.shift();
        this.setState(prev => 
            {return {
                ...prev, 
                merge : {
                    ...prev.merge, 
                    divisions : {
                        ...prev.merge.divisions, 
                        left : [division[0], division[1]], 
                        right : [division[1] + 1, division[2]]
                    }
                }
            }
            // }, () => {console.log("left, right", this.state.merge.divisions.left);}
        }
        );
        console.log("divisions : ", division);
        this.merge_sort(array, l, mid, animations, speed);
        this.merge_sort(array, mid+1, r, animations, speed);
        let current = animations.mergedArrays.shift();
        this.setState(prev => {return {...prev, merge : {displayArr : []}}});
        console.log("displayArr", this.state.merge.displayArr);
        for(let i = 0; i < current.length; i++){
            setTimeout(() => {
                let x = this.state.merge.displayArr;
                x.push(current[i]);
                this.setState(prev => {return {...prev, merge : {displayArr : x}}});
            }, this.time)
            this.time += speed;
        }
        this.time += speed;
        setTimeout(() => {
            console.log("displayArr after some updation : ", this.state.merge.displayArr);
            let min = Math.min(...current);
            let max = Math.max(...current);
            for(let i = 0; i < current.length; i++){
                current[i] = array[current[i]];
            }
            let j = 0;
            for(let i = min; i <= max; i++){
                array[i] = current[j];
                j++;
            }
            this.setState(prev => {return {...prev, array : array}});
            console.log("array state : ", this.state.array);
            this.time += speed;
            return;
        }, this.time);
    }
    bubbleSort = () => {
        this.setState({sort : "bubble"});
        let array = [...this.state.array];
        const result = sortingAlgorithms.bubbleSort(array);
        const animation = result.animation;
        // console.log("animations array: ", animation);
        let time = 0;
        let speed = this.state.speed;
        for (let i = 0; i < animation.length; i++) {
            // while(this.state.pause){
            //     console.log(this.state.pause);
            // }
            // setTimeout(() => {
            // }, time);
            let settleog = [];
            setTimeout(() => {
                let k = 0;
                for (let j = 0; j < array.length; j++) {
                    if (k < animation[i][1].length) {
                        if (j === animation[i][1][k]) {
                            setTimeout(() => {
                                settleog.push(array.length - i);
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                                this.setState({ array : [...array], bubble : {max : j+1, settle : settleog} });
                                // this.setState({ array: [...array]});
                            }, k * speed);
                            k++;
                        }
                    }
                }
                this.setState({ bubble : { max : -2, settle : settleog }});
            }, time);
            time += animation[i][1].length * speed;
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
    render() {
    const {array} = this.state;
    return (
        <>
            <Header reset={this.resetArray} speed={this.setSpeed} 
                Sort={{
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
                                    style={{ height: `${(value) / 2}px`, backgroundColor: `${index === this.state.bubble.max ? "#f2cbcb84" : index >= this.state.bubble.settle[this.state.bubble.settle.length-1] ? "#f2cbcb84" :  "#282c34"}` }} 
                                />
                                : (this.state.sort === 'merge')
                                ? <div 
                                    className="array-bar" key={index}
                                    style={{
                                            height: `${(value) / 2}px`, 
                                            backgroundColor: "#282c34"
                                                // `${index >= this.state.merge.divisions.left[0] && index <= this.state.merge.divisions.left[1]
                                                //      ? "#ffffff" 
                                                //      : index >= this.state.merge.divisions.right[0] && index <= this.state.merge.divisions.right[1]
                                                //      ? "#808080"
                                                //      : "#282c34"}`
                                            }} 
                                />
                                : <div 
                                    className="array-bar normal-bar" key={index} 
                                    style={{ height: `${(value) / 2}px` }} 
                                />
                            )
                        )}
                </div>
            </div>
        </>
        )
    };
};

