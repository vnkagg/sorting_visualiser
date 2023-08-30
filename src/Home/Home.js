import React from "react";
import Header from "../Header/header";
import * as sortingAlgorithms from '../Algorithms/algorithms';
import './home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import * as Scroll from 'react-scroll';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time : 0,
            speed : 100,
            sort : "",
            pause : false,
            array : [],
            running : false,
            customArray : true,
            arrayBackup : [],
            maxArray : -1,
            hasBeenTerminated : true,
            selection : {
                lastMax : -1,
                currentPointer : -1,
                smallestIndexStored : 32
            },
            merge : {
                division : [-1, -1, -1],
                displayArr : [],
                merges : [],
                dummyArray : []
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
            bubble : {
                current : -1,
                settleStarts : 32
            }
        };
    }
    setPause = async() => {

        await this.setState(prev => {
            return {
                ...prev,
                pause : !prev.pause}
        });
        // console.log("pause state set setState");
        while(this.state.pause){
            // console.log("pause added");
            await this.sleep(1000);
        }
    }
    setSpeed = (value) => {
        this.setState(prev => {
            return {
                ...prev, 
                speed : value
            }}, 
            () => {
                console.log("speed set to : ", 1 * 100/this.state.speed);
            }
        );
    }
    componentDidMount() {
        this.resetArray();
    }
    randIntFromRange(min, max){
        return Math.floor(min + Math.random() * (max - min)); 
    }
    resetArray = () => {
        // if(this.state.running){
        //     return;
        // }
        if(this.state.hasBeenTerminated){
            // this.setState(prev => {return {...prev, sort : "", hasBeenTerminated : false }});
            let array = [];
            for(let i = 0; i < 32; i++){
                array.push(this.randIntFromRange(10, 100));
            }
            let max = Math.max(...array);
            this.setState({sort : "", array : array, speed : 100, arrayBackup : array, maxArray : max, time : 0});
            console.log("THE UNSORTED ARRAY", array);
        } else {
            this.setState(prev => {return {...prev, hasBeenTerminated : true }});
        }
    }
    resetDummyArray = async() => {
        let length = this.state.array.length;
        await this.setState(prev => {return {...prev, merge : {...prev.merge, dummyArray : new Array(length).fill(0)}}});
    }
    handleInputArray = (array) => {
        if(this.state.running){
            return false;
        }
        let max = Math.max(...array);
        this.setState({array : array, arrayBackup : array, speed : 100, maxArray : max});
    }
    restore = () => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {return {...prev, sort : "", array : prev.arrayBackup,speed : 100, time : 0}});
    }
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    mergeSort = async() => {
        if(this.state.running){
            return;
        }
        await Scroll.animateScroll.scrollToBottom();
        let length = this.state.array.length;
        await this.setState(prev => {return {...prev, running : true, hasBeenTerminated : false, sort : "merge", merge : {...prev.merge, dummyArray : new Array(length).fill(0)}}});
        const animations = sortingAlgorithms.mergeSort([...this.state.array]);
        console.log("THE SORTED ARRAY : ", animations.sortedArray);
        let array = [...this.state.array];
        let speed = this.state.speed;
        await this.merge_sort(array, 0, array.length-1, animations, speed);
        if(this.state.hasBeenTerminated){
            this.setState(prev => {
                return {
                    ...prev,
                    running : false,
                    sort : "",
                    hasBeenTerminated : true
                }
            })
            return;
        }
        await this.sleep(500);
        await Scroll.animateScroll.scrollToTop();
        await this.sleep(2000);
        this.setState(prev => {
            return {
                ...prev,
                running : false,
                sort : "",
                hasBeenTerminated : true
            }
        })
      };
    show_div = async(animations) => {
        let speed = this.state.speed;
        let division = animations.divisions.shift();
        await this.setState(prev => 
            {return {
                ...prev, 
                merge : {
                    ...prev.merge, 
                    division : division
                }
            }}
        );
        await this.setState(prev => {return {...prev, time : prev.time+speed*5}});
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.sleep(speed*5);
    }
    merge_sort = async(array, l, r, animations) => {
        while(this.state.pause){
            await this.sleep(1);
        }
        if(this.state.hasBeenTerminated){
            return;
        }
        if (l>=r) { return; }
        const mid = Math.floor((l+r)/2);
        while(this.state.pause){
            await this.sleep(1);
        }
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.show_div(animations);
        while(this.state.pause){
            await this.sleep(1);
        }
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.merge_sort(array, l, mid, animations);
        // await this.sleep(speed*5);
        while(this.state.pause){
            await this.sleep(1);
        }
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.show_div(animations);
        // await this.sleep(speed*10);
        while(this.state.pause){
            await this.sleep(1);
        }
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.merge_sort(array, mid+1, r, animations);
        // await this.sleep(speed*5);
        while(this.state.pause){
            await this.sleep(1);
        }
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.show_div(animations);
        while(this.state.pause){
            await this.sleep(1);
        }
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.setState(prev => {return {...prev, merge: {...prev.merge, displayArr : []}}});

        let current = animations.mergedArrays.shift();
        
        let min = Math.min(...current);
        let max = Math.max(...current);

        for(let i = 0; i < current.length; i++){
            current[i] = this.state.array[current[i]];
        }
        // await console.log("curent : ", current);
        let j = 0;
        let x = [];
        let a = [...this.state.merge.dummyArray];
        array = [...this.state.array];
        for(let i = min; i <= max; i++){
            x.push(animations.merges.shift());
            a[i] = current[j];
            while(this.state.pause){
                await this.sleep(1);
            }
            // if(this.state.hasBeenTerminated){
            //     return;
            // }
            await this.setState(prev => { return { ...prev, merge: { ...prev.merge, merges: x, dummyArray: [...a] } }; });
            // await console.log("this.state.merge.dummyArray", this.state.merge.dummyArray);
            // await console.log("this.state.merge.merges", this.state.merge.merges);
            array[i] = current[j];
            // await console.log("array : ", array);
            // await console.log("a : ", a);
            if(!this.state.hasBeenTerminated){
                // return;
                await this.sleep(this.state.speed*10);
            }
            // await this.sleep(this.state.speed*10);
            j++;
        }
        x = [];
        while(this.state.pause){
            await this.sleep(1);
        }
        // if(this.state.hasBeenTerminated){
        //     return;
        // }
        await this.resetDummyArray();
        // if(this.state.hasBeenTerminated){
        //     return;
        // }
        await this.setState(prev => {return {...prev, array : array, merge : {...prev.merge, merges : x}}});
        // await console.log("muahaha", this.state.merge.dummyArray);
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.sleep(this.state.speed*10);

        // await this.setState(prev => {return {time : prev.time+this.state.speed}});
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.sleep(this.state.speed*10);
        return;
        // setTimeout(() => {
        // }, this.state.time);
    }

    selectionSort = async() => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {
            return {
                ...prev,
                running : true,
                hasBeenTerminated :false,
                sort : "selection"}
        });
        const result = sortingAlgorithms.selectionSort([...this.state.array]);
        let animations = result.animations;
        const l = animations.length;
        console.log("THE SORTED ARRAY", result.sortedArray);

        for(let i = 0; i < l; i++){
            while(this.state.pause){
                await this.sleep(1000);
            }
            let currentData = animations.shift();
            let array = [...this.state.array];
            let maxValue = array[currentData[currentData.length - 1]];
            let last = currentData[currentData.length-1];
            for(let j = 0; j < l - i; j++){
                while(this.state.pause){
                    await this.sleep(1000);
                }
                await this.setState(prev => {
                    return {
                        ...prev,
                        selection : {
                            ...prev.selection,
                            currentPointer : j
                        }
                    }
                });
                if(j === currentData[0]){
                    if(!this.state.hasBeenTerminated){
                        await this.sleep(this.state.speed*9);
                    } else {
                        this.setState(prev => {
                            return {
                                ...prev, 
                                running : false,
                                sort : ""
                            }
                        })
                        return;
                    }
                    let x = currentData.shift();
                    await this.setState(prev => {
                        return {
                            ...prev,
                            selection : {
                                ...prev.selection,
                                lastMax : x,
                                currentPointer : -1
                            }
                        }
                    }); 
                    if(!this.state.hasBeenTerminated){
                        await this.sleep(this.state.speed*6);
                    } else {
                        this.setState(prev => {
                            return {
                                ...prev, 
                                running : false,
                                sort : ""
                            }
                        })
                        return;
                    }
                } else {
                    if(!this.state.hasBeenTerminated){
                        await this.sleep(this.state.speed*4);
                    } else {
                        this.setState(prev => {
                            return {
                                ...prev, 
                                running : false,
                                sort : ""
                            }
                        })
                        return;
                    }
                }
            }
            let temp = array[l - i -1];
            array[l - i -1] = maxValue;
            array[last] = temp;
            await this.setState(prev => {
                return {
                    ...prev,
                    array : array,
                    selection : {
                        ...prev.selection,
                        smallestIndexSorted : l - i - 1
                    }
                }
            });
            if(!this.state.hasBeenTerminated){
                await this.sleep(this.state.speed*5);
            } else {
                this.setState(prev => {
                    return {
                        ...prev, 
                        running : false,
                        sort : ""
                    }
                })
                return;
            }
        }
        this.setState(prev => {
            return {
                ...prev, 
                running : false,
                sort : ""
            }
        })
    }
    insertionSort = async() => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {return {...prev, running : true, hasBeenTerminated : false, sort : "insertion"}});
        const result = sortingAlgorithms.insertionSort([...this.state.array]);
        // this.setState({array : result.sortedArray});
        const animations = result.animations;
        for(let i = 0; i < animations.length; i++){
            while(this.state.pause){
                await this.sleep(1000);
            }
            await this.setState(prev => {
                return {
                    ...prev,
                    insertion : {
                        comparitorElement : animations[i][0],
                        comparitorDestination : animations[i][1]
                    }
                }
            });
            
            if(!this.state.hasBeenTerminated){
                await this.sleep(this.state.speed*10);
            } else {
                this.setState(prev => {
                    return {
                        ...prev, 
                        running : false,
                        sort : ""
                    }
                })
                return;
            }
            let array = this.state.array;
            let comparitor = array[animations[i][0]];
            for(let j = animations[i][0] - 1; j >= animations[i][1]; j--){
                while(this.state.pause){
                    await this.sleep(1);
                }
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
                if(!this.state.hasBeenTerminated){
                    await this.sleep(this.state.speed*3);
                } else {
                    this.setState(prev => {
                        return {
                            ...prev, 
                            running : false,
                            sort : ""
                        }
                    })
                    return;
                }
            }
            if(!this.state.hasBeenTerminated){
                await this.sleep(this.state.speed*10);
            } else {
                this.setState(prev => {
                    return {
                        ...prev, 
                        running : false,
                        sort : ""
                    }
                })
                return;
            }
        }
        await this.setState(prev => {
            return {
                ...prev,
                running : false,
                sort : "",
                insertion : {
                    comparitorElement : -1,
                    comparitorDestination : -1
                }
            }
        })
    }
    bubbleSort = async() => {
        if(this.state.running){
            return;
        }
        this.setState(prev => {return {...prev, running : true, hasBeenTerminated : false, sort : "bubble", bubble : {}}});
        let l = [...this.state.array].length;
        for(let i = 0; i < l; i++){
            while(this.state.pause){
                await this.sleep(1);
            }
            let array = [...this.state.array];
            for(let j = 0; j < l - i - 1; j++){
                while(this.state.pause){
                    await this.sleep(1);
                }
                await this.setState(prev => {
                    return {
                        ...prev,
                        array : array,
                        bubble : {
                            ...prev.bubble,
                            current : j+1
                        },
                    }
                });
                if(array[j] >= array[j+1]){
                    let x = array[j+1];
                    array[j+1] = array[j];
                    array[j] = x;  
                }
                if(this.state.hasBeenTerminated){
                    this.setState(prev => {
                        return {
                            ...prev, 
                            running : false,
                            sort : ""
                        }
                    })
                    return;
                }
                await this.sleep(this.state.speed*2);
            }
            await this.setState(prev => {
                return {
                    ...prev,
                    bubble : {
                        ...prev.bubble,
                        settleStarts : array.length-i-1
                    }
                }
            });
            if(this.state.hasBeenTerminated){
                this.setState(prev => {
                    return {
                        ...prev, 
                        running : false,
                        sort : ""
                    }
                })
                return;
            }
            await this.sleep(this.state.speed*2);
        }
        this.setState(prev => {
            return {
                ...prev, 
                running : false,
                sort : ""
            }
        })
    }
    quickSort = async() => {
        if(this.state.running){
            return;
        }
        await this.setState(prev => {
            return {...prev, running : true, hasBeenTerminated : false, sort : "quick"}
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
                },
                hasBeenTerminated : true,
                running : false,
                sort : ""
            }
        })
    }
    quick_sort = async(l, r, animations) => {
        while(this.state.pause){
            await this.sleep(1);
        }
        if(l >= r){
            return;
        }
        if(this.state.hasBeenTerminated){
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
            while(this.state.pause){
                await this.sleep(1);
            }
            if(smaller[0] === i){
                let x = l + smaller.shift();
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            smaller : [...prev.quick.smaller, x]}}}
                            );
                
            } else if (equals[0] === i){
                let x = l + equals.shift();
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            equals : [...prev.quick.equals, x]}}
                        });
            } else if (larger[0] === i) {
                let x = l + larger.shift();
                await this.setState(prev => {
                    return {
                        ...prev, 
                        quick : {
                            ...prev.quick, 
                            larger : [...prev.quick.larger, x]}}
                        });
            }
            if(!this.state.hasBeenTerminated){
                // return;
                await this.sleep(this.state.speed);
            }
        }
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
        if(!this.state.hasBeenTerminated){
            // return;
            await this.sleep(this.state.speed*10);
        }
        while(this.state.pause){
            await this.sleep(1);
        }
        if(this.state.hasBeenTerminated){
            return;
        }
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
        if(!this.state.hasBeenTerminated){
            // return;
            await this.sleep(this.state.speed * 10);
        }    
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.quick_sort(l, l + i - 1, animations);
        if(!this.state.hasBeenTerminated){
            // return;
            await this.sleep(this.state.speed * 10);
        }    
        if(this.state.hasBeenTerminated){
            return;
        }
        await this.quick_sort(r - j + 1, r, animations);
        return;
    }

    render() {
        const { array, sort, selection, merge, quick, insertion , bubble} = this.state;
        
        return (
          <>
            <Header
              reset={this.resetArray}
              speed={this.setSpeed}
              sort_condition={this.state.sort}
              statePause={this.state.pause}
              running = {this.state.running}
              restore={this.restore}
              pause={this.setPause}
              sortMode={this.state.sort}
              arrayEntered = {this.handleInputArray}
              Sort={{
                mergeSort: this.mergeSort,
                quickSort: this.quickSort,
                selectionSort: this.selectionSort,
                insertionSort: this.insertionSort,
                bubbleSort: this.bubbleSort
              }}
            />
            <div className="container" style={{height : `${sort === 'merge' ? "100vh" : ""}`}}>
              <div className="array">
                {
                    array.map((value, index) => {
                        let backgroundColor = "";
                        
                        if (sort === 'selection') {
                            backgroundColor = 
                            index >= selection.smallestIndexStored
                                ? "#f2cbcb84" 
                                : index === selection.lastMax
                                ? "#b7b7b7"
                                : index === selection.currentPointer 
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
                                ? "#505050"
                                : "#282c34";
                        } else if (sort === 'insertion') {
                            backgroundColor = 
                                index === insertion.comparitorElement
                                    ? "#f2cbcb84"
                                    :  index === insertion.comparitorDestination
                                    ? "#9bb5a1"
                                    : "#282c34";
                        } else if (sort === 'bubble') {
                            backgroundColor = 
                                index === bubble.current
                                    ? "#f2cbcb84"
                                    :  index >= bubble.settleStarts
                                    ? "#f2cbcb84"
                                    : "#282c34";
                        } else {
                            backgroundColor = "#282c34";
                        }
            
                        return (
                            <div className="bar-value-set">
                                <div
                                    className={`array-bar ${index === bubble.current || index === selection.currentPointer ? "" : "normal-bar"}`}
                                    key={index}
                                    style={{ height: `${this.state.merge.merges.includes(index) ? 0 : value / this.state.maxArray * 100}%`, backgroundColor}}
                                />
                                <div className="bar-value">{this.state.merge.merges.includes(index) ? "" : value}</div>
                            </div>
                        );
                    })
                }
              </div>
              {sort === 'merge' &&
                (<div className="merge-array">
                    {
                        merge.dummyArray.map((value, index) => {
                            return (
                                <div className="bar-value-set-merged">
                                    <div
                                    className={`array-bar normal-bar`}
                                    key={index}
                                    style={{ height: `${value / this.state.maxArray * 100}%`, backgroundColor : "#f7f7f7"}}
                                    />
                                    <div className="bar-value">{value ? value : ""}</div>
                                </div>
                                    
                                )
                        })
                    }
                </div>)
              }
            </div>
            {sort === 'merge' &&
                (<div className="floatingActionButton" onClick={this.setPause}>
                    <div className="pauseHome">
                    <div className = "iconHome">
                                    {this.state.pause 
                                    ? (<FontAwesomeIcon icon={faPlay} style={{  color : '#f2cbcb84', 
                                                                                fontSize : 40, 
                                                                                fontWeight : 900}}/>) 
                                    : (<FontAwesomeIcon icon={faPause} style={  {color : '#f2cbcb84', 
                                                                                fontSize : 45, 
                                                                                fontWeight : 900}} />)}
                                </div>
                </div>
                </div>
                )
              }
            <div className="legend" style={{transform : `${sort !== '' ? "translateY(0)" : 0}`}}>
                {sort === 'quick' &&
                    <div className="keys">
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#ffffff"}}>
                                <div className="text">PIVOT ELEMENT</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#9d9db7"}}>
                                <div className="text">ELEMENTS LARGER THAN THE PIVOT</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#9bb5a1"}}>
                                <div className="text">ELEMENTS SMALLER THAN THE PIVOT</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#B99FA1"}}>
                                <div className="text">ELEMENTS FOUND TO BE EQUAL TO THE PIVOT</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#505050"}}>
                                <div className="text" style={{color : "#f2cbcb84"}}>ELEMENTS NOT IN THE CURRENT RECURSION</div>
                            </div>
                        </div>
                    </div>
                }    
                {sort==='insertion' && 
                    <div className="keys">
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#f2cbcb84"}}>
                                <div className="text">THE CURRENTLY ITERATED ELEMENT</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#9bb5a1"}}>
                                <div className="text">CORRECT POSITION OF THE CURRENTLY ITERATED ELEMENT IN THE SORTED ARRAY ON THE LEFT</div>
                            </div>
                        </div>
                    </div>
                }
                {sort==='selection' && 
                    <div className="keys">
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#f2cbcb84"}}>
                                <div className="text">THE CURRENTLY ITERATED ELEMENT</div>
                            </div>
                        </div>
                        <div className="key">
                            <div className="colorBox" style={{backgroundColor : "#b7b7b7"}}>
                                <div className="text">THE MAXIMUM ELEMENT FOUND IN THE ITERATION SO FAR</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
          </>
        );
      }
      
};

