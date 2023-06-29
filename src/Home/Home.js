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
            running : false,
            arrayBackup : [],
            bubble : {
                immediateMax : -1,
                currentPointer : -1,
                smallestIndexStored : 32
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
            },
            insertion : {
                comparitorElement : -1,
                comparitorDestination : -1
            },
            selection : {
                nextMax : -1,
                destination : -1,
                starting : -1,
                current : -1
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
        if(this.state.running){
            return;
        }
        const array = [];
        for(let i = 0; i < 32; i++){
            array.push(this.randIntFromRange(50,1000));
        }
        this.setState(prev => {return {...prev, sort : "", array : array, arrayBackup : array, time : 0}});
        console.log("THE UNSORTED ARRAY", array);
    }
    restore = () => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {return {...prev, sort : "", array : prev.arrayBackup, time : 0}});
    }
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    mergeSort = async() => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {return {...prev, running : true, sort : "merge"}});
        const animations = sortingAlgorithms.mergeSort([...this.state.array]);
        let array = [...this.state.array];
        let speed = this.state.speed;
        console.log("speed from the mergeSort", speed);
        await this.merge_sort(array, 0, array.length-1, animations, speed);
        this.setState(prev => {
            return {
                ...prev,
                sort : ""
            }
        })
      };
    show_div = async(animations) => {
        let speed = this.state.speed;
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
        await this.setState(prev => {return {...prev, time : prev.time+speed*5}});
        await this.sleep(speed*5);
    }
    merge_sort = async(array, l, r, animations) => {
        if (l>=r) { return; }
        const mid = Math.floor((l+r)/2);

        await this.show_div(animations);
        await this.merge_sort(array, l, mid, animations);
        // await this.sleep(speed*5);
        await this.show_div(animations);
        // await this.sleep(speed*10);
        await this.merge_sort(array, mid+1, r, animations);
        // await this.sleep(speed*5);
        await this.show_div(animations);
        

        let current = animations.mergedArrays.shift();
        await this.setState(prev => {return {...prev, merge: {...prev.merge, displayArr : []}}});
        // for(let i = 0; i < current.length; i++){
        //     setTimeout(() => {
        //         let x = this.state.merge.displayArr;
        //         x.push(current[i]);
        //         this.setState(prev => {return {...prev, merge : {...prev.merge, displayArr : x}}});
        //     }, this.state.time)
        //     this.setState(prev => {return {time : prev.time+speed}});
        // }
        // this.setState(prev => {return {time : prev.time+speed}});
        // console.log("display arr : ", this.state.merge.displayArr);

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
        await this.setState(prev => {return {...prev, array : array}});
        console.log("array state : ", this.state.array);
        // await this.setState(prev => {return {time : prev.time+this.state.speed}});
        await this.sleep(this.state.speed*10);
        return;
        // setTimeout(() => {
        // }, this.state.time);
    }
    bubbleSort = async() => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {
            return {
                ...prev,
                running : true,
                sort : "bubble"}
        });
        const result = sortingAlgorithms.bubbleSort([...this.state.array]);
        let animations = result.animations;
        const l = animations.length;

        for(let i = 0; i < l; i++){
            let currentData = animations.shift();
            let j = 0;
            let array = [...this.state.array];
            let maxValue = array[currentData[currentData.length - 1]];
            while(currentData.length){
                let immediateMax = currentData.shift();
                await this.setState(prev => {
                    return {
                        ...prev,
                        bubble : {
                            ...prev.bubble,
                            immediateMax : immediateMax
                        }
                    }
                });
                await this.sleep(this.state.speed);
                while(j < immediateMax){
                    let x = j;
                    await this.setState(prev => {
                        return {
                            ...prev,
                            bubble : {
                                ...prev.bubble,
                                currentPointer : x
                            }
                        }
                    });
                    await this.sleep(this.state.speed);
                    j++;
                }
            }
            while(j < l - i){
                let x = j;
                await this.setState(prev => {
                    return {
                        ...prev,
                        bubble : {
                            ...prev.bubble,
                            currentPointer : x
                        }
                    }
                });
                await this.sleep(this.state.speed);
                j++;
            }
            let temp = array[j];
            array[j] = maxValue;
            array[j-1] = temp;
            await this.setState(prev => {
                return {
                    ...prev,
                    array : array,
                    bubble : {
                        ...prev.bubble,
                        smallestIndexSorted : l - i - 1
                    }
                }
            });
            await this.sleep(this.state.speed);
        }
    }
    insertionSort = async() => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {return {...prev, running : true, sort : "insertion"}});
        const result = sortingAlgorithms.insertionSort([...this.state.array]);
        // this.setState({array : result.sortedArray});
        const animations = result.animations;
        for(let i = 0; i < animations.length; i++){
            await this.setState(prev => {
                return {
                    ...prev,
                    insertion : {
                        comparitorElement : animations[i][0],
                        comparitorDestination : animations[i][1]
                    }
                }
            });
            await this.sleep(this.state.speed*10);
            let array = this.state.array;
            let comparitor = array[animations[i][0]];
            for(let j = animations[i][0] - 1; j >= animations[i][1]; j--){
                array[j+1] = array[j];
                array[j] = comparitor;
                if(j === animations[i][1]){
                    await this.setState(prev => {
                        return {
                            ...prev, 
                            array : array,
                            comparitorDestination : -1,
                            comparitorElement : j,
                        }
                    });
                } else {
                    await this.setState(prev => {
                        return {
                            ...prev, 
                            array : array,
                            comparitorElement : j,
                        }
                    });
                }
                await this.sleep(this.state.speed*3);
            }
            await this.sleep(this.state.speed*10);
        }
        this.setState(prev => {
            return {
                ...prev,
                sort : "",
                insertion : {
                    comparitorElement : -1,
                    comparitorDestination : -1
                }
            }
        })
    }
    selectionSort = async() => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {return {...prev, running : true, sort : "selection"}});
        const result = sortingAlgorithms.selectionSort([...this.state.array]);
        let animations = result.animations;
        let length = animations.length;
        for(let i = 0; i < length; i++){
            let current = animations.shift();
            let destination = current[current.length - 1];
            let starting = current.shift();
            this.setState(prev => {
                return {
                    ...prev,
                    selection : {
                        ...prev.selection, 
                        destination : destination,
                        starting : starting
                    }
                }
            });
            for(let i = starting; i < destination; i++){
                if(i === current[0]){
                    let x = current.shift();
                    await this.setState(prev => {
                        return {...prev, 
                        selection : {
                            ...prev.selection,
                            nextMax : x,
                            current : i
                        }}
                    });
                    continue;
                }
                await this.setState(prev => {
                    return {...prev, 
                    selection : {
                        ...prev.selection,
                        current : i
                    }}
                });
            }
        }
    }
    quickSort = async() => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {
            return {...prev, running : true, sort : "quick"}
        });
        let array = [...this.state.array];
        let result = sortingAlgorithms.quickSort(array);
        console.log("THE SORTED ARRAY", result.sortedArray);
        await this.quick_sort(0, array.length - 1, result.animations);
        this.setState(prev => {
            return {
                ...prev,
                quick : {
                    smaller : [],
                    equals : [],
                    larger : [],
                    partition : -1,
                    activeArray : [0, 31]
                }

            }
        })
        this.setState(prev => {
            return {
                ...prev, 
                sort : ""
            }
        })
    }
    quick_sort = async(l, r, animations) => {
        if(l >= r){
            return;
        }
        await this.setState(prev => {
            return {
                ...prev,
                quick : {
                    ...prev.quick,
                    activeArray : [l, r],
                    partition : l,
                    smaller : [],
                    equals : [],
                    larger : []
                }
            }}
        );
        let current = animations.shift();
        let arrayState = [...this.state.array];
        let activeArray = current.array;
        let smaller = current.smaller;
        let equals  = current.equals;
        let larger  = current.larger;
        const i = smaller.length;
        const j = larger.length;

        for(let i = 0; i < activeArray.length; i++){
            if(smaller[0] === i){
                let x = l + smaller.shift();
                console.log("x : ", x);
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            smaller : [...prev.quick.smaller, x]}}},
                            () => {
                                console.log("smaller spotted : ", this.state.quick.smaller);
                            });
                
            } else if (equals[0] === i){
                let x = l + equals.shift();
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            equals : [...prev.quick.equals, x]}}}, 
                            () => {
                                console.log("equal spotted : ", this.state.quick.equals);
                            });
            } else if (larger[0] === i) {
                let x = l + larger.shift();
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            larger : [...prev.quick.larger, x]}}},
                            () => {
                                console.log("larger spotted : ", this.state.quick.larger);
                            });
            }
            await this.sleep(this.state.speed);
        }
        await console.log("END OF ITERATION");
        // console.log("smaller : ", smaller);
        // console.log("equals : ", equals);
        // console.log("larger : ", larger);
        let updateStateArray = [...arrayState.slice(0, l), ...current.arrayFinal, ...arrayState.slice(r+1)];

        let smaller_final = [];
        let alpha = this.state.quick.smaller.length;
        for(let i = 0; i < alpha; i++){
            smaller_final.push(l + i);
        }

        let equals_final = [];
        let beta = this.state.quick.equals.length;
        for(let i = 0; i < beta; i++){
            equals_final.push(l + alpha + i);
        }

        let larger_final = [];
        let gamma = this.state.quick.larger.length;
        for(let i = 0; i < gamma ; i++){
            larger_final.push(l + alpha + beta + i);
        }
        // console.log("smaller_final", smaller_final);
        // console.log("equals_final", equals_final);
        // console.log("larger_final", larger_final);
        await this.setState(prev => {
            return {
                ...prev, 
                array : updateStateArray,
                quick : {
                    ...prev.quick,
                    smaller : smaller_final,
                    equals : equals_final,
                    larger : larger_final,
                    partition : equals_final[0]
                }
            }});
        await this.sleep(this.state.speed * 10);
        await this.quick_sort(l, l + i - 1, animations);
        await this.sleep(this.state.speed);
        await this.quick_sort(r - j + 1, r, animations);
        return;
    }
    randIntFromRange(min, max){
        return Math.floor(min + Math.random() * (max - min + 1)); 
    }
    render() {
        const { array, sort, bubble, merge, quick, insertion } = this.state;
        
        return (
          <>
            <Header
              reset={this.resetArray}
              speed={this.setSpeed}
              restore={this.restore}
              Sort={{
                mergeSort: this.mergeSort,
                quickSort: this.quickSort,
                bubbleSort: this.bubbleSort,
                insertionSort: this.insertionSort,
                selectionSort: this.selectionSort
              }}
            />
            <div className="container">
              <div className="array">
                {
                    array.map((value, index) => {
                        let backgroundColor = "";
                        
                        if (sort === 'bubble') {
                            backgroundColor = 
                            index >= bubble.smallestIndexStored
                                ? "#f2cbcb84" 
                                : index === bubble.immediateMax
                                ? "#9d9db7"
                                : index === bubble.currentPointer 
                                ? "#f2cbcb84"
                                : "#282c34";
                        } else if (sort === 'merge') {
                            backgroundColor =
                            index >= merge.division[0] && index <= merge.division[1]
                                ? "#9bb5a1"
                                : index <= merge.division[2] && index > merge.division[1]
                                ? "#9d9db7"
                                : "#282c34";
                        } else if (sort === 'quick') {
                            backgroundColor =
                            index === quick.partition
                                ? "#ffffff"
                                : quick.larger.includes(index)
                                ? "#9d9db7"
                                : quick.equals.includes(index)
                                ? "#B99FA1"
                                : quick.smaller.includes(index)
                                ? "#9bb5a1"
                                : index < quick.activeArray[0] || index > quick.activeArray[1]
                                ? "#000000"
                                : "#282c34";
                        } else if (sort === 'insertion') {
                            backgroundColor = 
                                index === insertion.comparitorElement
                                    ? "#f2cbcb84"
                                    :  index === insertion.comparitorDestination
                                    ? "#9bb5a1"
                                    : "#282c34";
                        } else {
                            backgroundColor = "#282c34";
                        }
            
                        return (
                            <div
                            className={`array-bar ${index !== bubble.max ? "normal-bar" : ""}`}
                            key={index}
                            style={{ height: `${value / 2}px`, backgroundColor}}
                            />
                        );
                    })
                }
              </div>
            </div>
            <div className="legend" style={{transform : `${sort === 'quick' ? "translateY(0)" : 0}`}}>
                {sort === 'quick' &&
                    <div className="keys">
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#ffffff"}}>
                                <div className="text" style={{color : "#282c34"}}>The Pivot element</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#9d9db7"}}>
                                <div className="text" style={{color : "#282c34"}}>Elements larger than the Pivot element</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#9bb5a1"}}>
                                <div className="text" style={{color : "#282c34"}}>Elements smaller than the Pivot element</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#B99FA1"}}>
                                <div className="text" style={{color : "#282c34"}}>Elements equal to the Pivot element</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#505050"}}>
                                <div className="text" style={{color : "#f2cbcb84"}}>The Elements not in current recursion</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
          </>
        );
      }
      
};

