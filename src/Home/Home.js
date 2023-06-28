import React from "react";
import Header from "../Header/header";
import * as sortingAlgorithms from '../Algorithms/algorithms';
import './home.css';

export default class Home extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            time : 0,
            speed : 100,
            sort : "",
            array : [],
            bubble : {
                max : -1,
                settle : -1,
            },
            merge : {
                division : [-1, -1, -1],
                displayArr : []
            },
            quick : {
                smaller : [],
                equals : [],
                larger : [],
                activeArray : [],
                static : false,
                partition : 0
            }
        };
    }
    // isPause(){
    //     const pause = !this.state.pause;
    //     this.setState({pause : pause});
    // }
    setSpeed = (value) => {
        this.setState(prev => {
            return {
                ...prev, 
                speed : value
            }}, 
            () => {
                console.log("speed set to : ",this.state.speed);
            }
        );
    }
    componentDidMount() {
        this.resetArray();
    }
    resetArray = () => {
        const array = [];
        for(let i = 0; i < 32; i++){
            array.push(this.randIntFromRange(50,1000));
        }
        this.setState(prev => {return {...prev, sort : "", array : array, time : 0}});
        console.log("THE UNSORTED ARRAY", array);
    }
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    mergeSort = async() => {
        this.setState(prev => {return {...prev, sort : "merge"}});
        const animations = sortingAlgorithms.mergeSort([...this.state.array]);
        let array = [...this.state.array];
        let speed = this.state.speed;
        console.log("speed from the mergeSort", speed);
        await this.merge_sort(array, 0, array.length-1, animations, speed);
        console.log("time at the end", this.state.time);
      };
    show_div = async(animations, speed) => {
        let division = animations.divisions.shift();
        console.log("divisions : ", division);
        await this.setState(prev => 
            {return {
                ...prev, 
                merge : {
                    ...prev.merge, 
                    division : division
                }
            }}, 
            () => {console.log("state divisions status : ", this.state.merge.division);}
        );
        this.setState(prev => {return {...prev, time : prev.time+speed*5}});
        await this.sleep(speed*5);
    }
    merge_sort = async(array, l, r, animations, speed) => {
        if (l>=r) { return; }
        const mid = Math.floor((l+r)/2);

        await this.show_div(animations, speed);
        await this.merge_sort(array, l, mid, animations, speed);
        await this.sleep(speed*5);
        await this.show_div(animations, speed);
        await this.sleep(speed*10);
        await this.merge_sort(array, mid+1, r, animations, speed);
        await this.sleep(speed*5);
        await this.show_div(animations);
        await this.sleep(speed*10);

        let current = animations.mergedArrays.shift();
        await this.setState(prev => {return {...prev, merge: {...prev.merge, displayArr : []}}});
        for(let i = 0; i < current.length; i++){
            setTimeout(() => {
                let x = this.state.merge.displayArr;
                x.push(current[i]);
                this.setState(prev => {return {...prev, merge : {...prev.merge, displayArr : x}}});
            }, this.state.time)
            this.setState(prev => {return {time : prev.time+speed}});
        }
        // this.setState(prev => {return {time : prev.time+speed}});
        console.log("display arr : ", this.state.merge.displayArr);

        setTimeout(() => {
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
            this.setState(prev => {return {time : prev.time+speed}});
            return;
        }, this.state.time);
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
    quickSort = async() => {
        this.setState(prev => {
            return {...prev, sort : "quick"}
        });
        let array = [...this.state.array];
        let result = sortingAlgorithms.quickSort(array);
        this.quick_sort(0, array.length - 1, result.animations);
        
    }
    quick_sort = async(l, r, animations) => {
        await this.setState(prev => {
            return {
                ...prev,
                quick : {
                    ...prev.quick,
                    activeArray : [l, r]
                }
            }}
        );
        let current = animations.shift();
        let arrayState = [...this.state.array];
        let activeArray = current.array;
        
        let smaller = current.smaller;
        let equals  = current.equals;
        let larger  = current.larger;
        let i = smaller.length;
        let j = larger.length;

        for(let i = 0; i < activeArray.length; i++){
            if(smaller[0] === i){
                let x = smaller.shift();
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            smaller : x}}});
            } else if (equals[0] === i){
                let x = equals.shift();
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            equals : x}}});
            } else if (larger[0] === i) {
                let x = larger.shift();
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            larger : x}}});
            }
        }

        let updateStateArray = [...arrayState.slice(0, l), ...current.arrayFinal, arrayState.slice(32- r, 32)];
        await this.setState(prev => {return {...prev, array : updateStateArray}});
        await this.quick_sort(l, l + i - 1, animations);
        await this.quick_sort(r - j + 1, r, animations);
        return;
    }
    randIntFromRange(min, max){
        return Math.floor(min + Math.random() * (max - min + 1)); 
    }
    render() {
    const {array} = this.state;
    return (
        <>
            <Header reset={this.resetArray} speed={this.setSpeed} Sort={{   mergeSort: this.mergeSort,
                                                                            quickSort: this.quickSort,
                                                                            bubbleSort: this.bubbleSort,
                                                                            insertionSort: this.insertionSort,
                                                                            selectionSort: this.selectionSort   }} />
            <div className="container">
                <div className="array">
                        {array.map((value, index) => (
                                (this.state.sort === 'bubble')
                                ? <div 
                                    className={`array-bar ${index!==this.state.bubble.max ? "normal-bar" : ""}`} key={index} 
                                    style={{ height: `${(value) / 2}px`, backgroundColor: `${index === this.state.bubble.max ? "#f2cbcb84" : index >= this.state.bubble.settle[this.state.bubble.settle.length-1] ? "#f2cbcb84" :  "#282c34"}` }} 
                                />
                                : (this.state.sort === 'merge')
                                ?<div>
                                    <div 
                                        className="array-bar" key={index}
                                        style={{
                                                height: `${(value) / 2}px`, 
                                                backgroundColor: 
                                                    `${index >= this.state.merge.division[0] && index <= this.state.merge.division[1] 
                                                        ? "#9bb5a1" 
                                                        : index <= this.state.merge.division[2] && index > this.state.merge.division[1]
                                                        ? "#9d9db7" 
                                                        : "#282c34"}` // "#282c34" 
                                                }} 
                                    />
                                </div> 
                                : (this.state.sort === 'quick')
                                ? <>
                                {/* pivot - white
                                    smaller -  #9bb5a1
                                    larger - #9d9db7
                                    equal - #B99FA1 */}
                                    <div 
                                        className="array-bar" key={index}
                                        style={{
                                                height: `${(value) / 2}px`, 
                                                backgroundColor: 
                                                    `${ Array.isArray(this.state.quick.smaller) && this.state.quick.smaller.includes(index) 
                                                        ? "#9bb5a1" 
                                                        : Array.isArray(this.state.quick.larger) && this.state.quick.larger.includes(index) 
                                                        ? "#9d9db7" 
                                                        ? Array.isArray(this.state.quick.equals) && this.state.quick.equals.includes(index) 
                                                        : "#B99FA1"
                                                        ? index === 0 
                                                        : "#ffffff"
                                                        ? index < this.state.quick.activeArray[0] || index > this.state.quick.activeArray[1] 
                                                        : "#282c34"
                                                        : "#282c34"}` // "#282c34" 
                                                }} 
                                    />
                                </>
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



// this.setState(prev => {return {...prev, sort : "quick"}});
//         const array = [...this.state.array];
//         const result = sortingAlgorithms.quickSort(array);
//         const iterations = result.animations.iterativeOrders;
//         let smallerState = []; let equalState = []; let largerState = []; 
//         let speed = this.state.speed;
//         for(let j = 0; j < iterations.length; j++){
//             this.setState(prev => {return {...prev, quick : {...prev.quick, static : false}}});
//             smallerState = []; equalState = []; largerState = [];
//             this.setState(prev => {return {...prev, quick : { smaller : [], equals : [], larger : []}}});
//             for(let i = 0; i < iterations[j].getLength(); i++){
//                 // eslint-disable-next-line no-loop-func
//                 setTimeout(() => {
//                     if(iterations[j].smaller[0] === i){
//                         let x = iterations[j].smaller.shift();
//                         smallerState.push(x);
//                         this.setState(prev => {return {...prev, quick : {...prev.quick, smaller : smallerState}}});
//                     } else if (iterations[j].equals[0] === i){
//                         let x = iterations[j].equals.shift();
//                         equalState.push(x);
//                         this.setState(prev => {return {...prev, quick : {...prev.quick, equals : equalState}}});
//                     } else if (iterations[j].larger[0] === i){
//                         let x = iterations[j].largers.shift();
//                         largerState.push(x);
//                         this.setState(prev => {return {...prev, quick : {...prev.quick, larger : largerState}}});
//                     }
//                 }, this.state.time)
//                 let time = this.state.time + speed;
//                 this.setState(prev => {return {...prev, time : time}});
//                 console.log("smaller : ", this.state.quick.smaller);
//                 console.log("equals : ", this.state.quick.equals);
//                 console.log("larger : ", this.state.quick.larger);
//             }
//             let tempArray = [];
//             for(let i = 0; i < smallerState.length; i++){
//                 tempArray.push(this.state.array[smallerState[i]]);
//             }
//             for(let i = 0; i < equalState.length; i++){
//                 tempArray.push(this.state.array[equalState[i]]);
//             }
//             for(let i = 0; i < largerState.length; i++){
//                 tempArray.push(this.state.array[largerState[i]]);
//             }
//             let i = smallerState.length;
//             let j = equalState.length;
//             await this.setState(prev => {
//                 return {
//                     ...prev, 
//                     array : tempArray, 
//                     quick : {
//                         ...prev.quick, 
//                         static : true, 
//                         r1 : i, 
//                         r2 : j
//                     }}});
//             await this.sleep(speed * 3);
//         }










// for(let i = 0; i < animations.length; i++){
//     let currentData = animations[i];
//     let beginningArray = currentData.getArrayInitialState;
//     await this.setState(prev => {
//         return {...prev, quick : {
//             ...prev.quick,
//             activeArray : beginningArray,
//             partition : 0 // for now. REVISIT THIS
//         }};
//     });
//     let smaller = currentData.smaller;
//     let equals = currentData.equals;
//     let larger = currentData.larger; 
//     for(let j = 0; j < beginningArray.length; j++){
//         if (smaller[0] === j) {
//             let x = this.state.quick.smaller;
//             x.push(smaller.shift());
//             await this.setState(prev => {
//                 return {...prev, quick : {
//                     ...prev.quick,
//                     smaller : x
//                 }};
//             });
//         } else if (equals[0] === j) {
//             let x = this.state.quick.equals;
//             x.push(equals.shift());
//             await this.setState(prev => {
//                 return {...prev, quick : {
//                     ...prev.quick,
//                     equals : x
//                 }};
//             });
//         } else if (larger[0] === j) {
//             let x = this.state.quick.larger;
//             x.push(larger.shift());
//             await this.setState(prev => {
//                 return {...prev, quick : {
//                     ...prev.quick,
//                     larger : x
//                 }};
//             });
//         }
//     }
//     await this.setState(prev => {
//         return {...prev, quick : {
//             ...prev.quick,
//             activeArray : currentData.getArrayFinalState
//         }};
//     });
// }