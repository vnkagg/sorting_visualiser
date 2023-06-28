export const mergeSort = (array) => {
    function merge_sort(arr, l, r, animations) {
      if (l >= r) {
        return;
      }
      const mid = Math.floor((l + r) / 2);
      let division = [l, mid, r];
      animations.divisions.push(division);
      merge_sort(arr, l, mid, animations);
      animations.divisions.push(division);
      merge_sort(arr, mid + 1, r, animations);
      animations.divisions.push(division);
      merge(arr, l, mid, r, animations);
      return;
    }
  
    function merge(arr, start, mid, end, animations) {
      let arrL = arr.slice(start, mid + 1);
      let arrR = arr.slice(mid + 1, end + 1);
      let i = 0;
      let j = 0;
      let k = start;
      let mergedArr = [];
      while (i < arrL.length && j < arrR.length) {
        if (arrL[i] < arrR[j]) {
          arr[k] = arrL[i];
          mergedArr.push(start + i);
          i++;
        } else {
          arr[k] = arrR[j];
          mergedArr.push(mid+1 + j);
          j++;
        }
        k++;
      }
      while (i < arrL.length) {
        arr[k] = arrL[i];
        mergedArr.push(start + i);
        i++;
        k++;
      }
      while (j < arrR.length) {
        arr[k] = arrR[j];
        mergedArr.push(mid+1 + j);
        j++;
        k++;
      }
      animations.mergedArrays.push(mergedArr);
    }
  
    let animations = { divisions: [], mergedArrays : [] };
    merge_sort(array, 0, array.length - 1, animations);
    let last = [0, (array.length/2) -1, array.length-1]
    animations.divisions.push(last);
    console.log("sorted array", array);
    console.log("merged arrays algo.js",animations.mergedArrays);
    return animations;
  };
  
export const bubbleSort = array => {
    let animationDetails = [];
    let duplicate = [...array];
    for(let i = 0; i < duplicate.length; i++){
        animationDetails.push([i, []]);
        let max = duplicate[0];
        for( let j = 0; j<duplicate.length - i - 1; j++){
            if(duplicate[j]>duplicate[j+1]){
                animationDetails[i][1].push(j);
                let temp = duplicate[j+1];
                duplicate[j+1] = duplicate[j];
                duplicate[j] = temp;
            }
        }
    }
    return { sorted : duplicate, animation : animationDetails};
}

export const insertionSort = array => {
    for(let i = 1; i < array.length; i++){
        let j = i - 1;
        let temp = array[i];
        while(j > -1 && array[j] > temp){
            array[j+1] = array[j];
            array[j] = temp;
            j--;
        }
    }
    return array;
}
export const selectionSort = array => {
    for(let i = 0 ; i < array.length; i++){
        let max = array[i];
        let k = i;
        for(let j = i + 1 ; j < array.length ; j++){
            if(array[j] > max){
                max = array[j];
                k = j;
            }
        }
        let temp = array[i];
        array[i] = array[k];
        array[k] = temp;
    }
    return array;
}
export const quickSort = array => {
    class template {
      smaller = [];
      larger = [];
      equals = [];
      array = [];
      arrayFinal = [];
      // // i_wrt_previous = -1;
      // // j_wrt_previous = -1;
      // i_left_future = -1;
      // j_left_future = -1;
      // i_right_future = -1;
      // j_right_future = -1;

      // //all the 4 i,js are w.r.t the first element of the previous array
      getLength = () => {
        return (this.smaller.length + this.larger.length + this.equals.length);
      }
    }
    function quick_sort(array, animations) {
      if(array.length < 2){
        return array;
      }
      const appendInAnimations = new template();
      let partition = array[0];
      appendInAnimations.array = array;
      let left = []; let equals = []; let right = [];
      for(let i = 0; i < array.length; i++){
        if (array[i] < partition){
          left.push(array[i]);
          appendInAnimations.smaller.push(i);
        } else if (array[i] === partition) {
          equals.push(array[i]);
          appendInAnimations.equals.push(i);
        } else {
          right.push(array[i]);
          appendInAnimations.larger.push(i);
        }
      }
      appendInAnimations.arrayFinal = [...left, ...equals, ...right];
      animations.push(appendInAnimations);
      // quick_sort(left, animations);
      // quick_sort(right, animations);
      return [...quick_sort(left, animations), ...equals, ...quick_sort(right, animations)];
    }
    let animations = []
    let sortedArray = quick_sort(array, animations);
    let result = {sortedArray : sortedArray, animations : animations};
    return result;
}