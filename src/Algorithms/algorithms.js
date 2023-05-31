// export const mergeSort = array => {
//     if(array.length < 2){
//         return array;
//     }
//     return merge_sort(array);
//     function merge_sort(arr) {
//         if(arr.length < 2){
//             return arr;
//         }
//         const mid = Math.floor(arr.length / 2);
//         return merge(merge_sort(arr.slice(0, mid)), merge_sort(arr.slice(mid)));
//     }
//     function merge(arrL, arrR){
//         let temp = [];
//         while(arrL.length && arrR.length){
//             if(arrL[0] < arrR[0]){
//                 temp.push(arrL.shift());
//             } else {
//                 temp.push(arrR.shift())
//             }
//         }
//         return [...temp, ...arrL, ...arrR];
//     }
// }







// export const mergeSort = array => {
//     console.log("mergeSort is called in algorithms.js");
//     if(array.length < 2){
//         console.log("The mergeSort (uppermost in algo.js) was terminated here because array < 2")
//         return array;
//     }
//     function merge_sort(arr, l, r, animations) {
//         if( l>=r ){
//             console.log("l was >= r. the merge_sort was returned here");
//             return;
//         }
//         //animations will have :
//             // the array (merge function) merging is happening on
//             // indexes being swapped
//         // const mid = Math.floor(arr.length / 2);
//         const mid = Math.floor((r - l)/2);
//         const no_oftimes = arr.length/mid+1;
//         console.log("mid : {mid}");
//         console.log("animations.divisions.push worked");
//         console.log("calling merge_sort recursively for the first time now...");
//         animations.divisions.push(
//             ([l, mid],
//              [mid+1, r])
//             );
//             console.log("animations : ", animations);
//         merge_sort(arr, l, mid, animations);
//         console.log("the right merge_sort is being called for the first time right now...");
//         merge_sort(arr, mid + 1, r, animations);
//         console.log(`Merge sort is being called for the $(no_oftimes)`);
//         merge(arr, l, mid, r, animations);
//         // return;
//         // return merge(merge_sort(arr.slice(0, mid)), merge_sort(arr.slice(mid)));
//     }
//     function merge(arr, start, mid, end, animations){
//         let i = start;
//         let j = mid+1;
//         while(i<=mid && j<=end){
//             if(arr[i]< arr[j]){
//                 animations.comparisons.push([i, j]);
//                 i++;
//                 continue;
//             }
//             if(arr[j]<arr[i]){
//                 animations.comparisons.push([j, i]);
//                 let temp = arr[i];
//                 arr[i]=arr[j];
//                 arr[j]=temp;
//                 j++;
//                 continue;
//             }
//             i++; j++;
//         }
//     }
//     let animations = {divisions : [], comparisons : []};
//     merge_sort(array, 0, array.length-1, animations);
//     return animations;
// }


export const mergeSort = array => {
    if (array.length < 2) {
      return array;
    }
  
    function merge_sort(arr, l, r, animations) {
      if (l >= r) {
        return;
      }
  
      const mid = Math.floor((l + r) / 2);
  
      merge_sort(arr, l, mid, animations);
      merge_sort(arr, mid + 1, r, animations);
      merge(arr, l, mid, r, animations);
    }
  
    function merge(arr, start, mid, end, animations) {
      let i = start;
      let j = mid + 1;
  
      while (i <= mid && j <= end) {
        if (arr[i] < arr[j]) {
          animations.comparisons.push([j, i]);
          i++;
        } else {
          animations.comparisons.push([j, i]);
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          j++;
        }
      }
    }
  
    let animations = { divisions: [], comparisons: [] };
    merge_sort(array, 0, array.length - 1, animations);
    console.log(animations.comparisons);
    return animations;
  };
  







        // let temp = [];
        // let i = 0;
        // while(  (start+i)<=(mid) && (mid+i)<(end) ){
        //     if(arr[i] < arr[mid+1]){
        //         animations.comparisons.push((i, mid+i));
        //         temp.push(arr[i]);
        //     } else{
        //         animations.comparisons.push((mid+i, i));
        //         temp.push(arr[mid+i]);
        //     }
        //     i++;
        // }
        // while (start + i <= mid) {
        //     temp.push(arr[start + i]);
        //     i++;
        // }
        // while (mid + i + 1 <= end) {
        //     temp.push(arr[mid + i + 1]);
        //     i++;
        // }
        // // Update the original array with the sorted elements
        // for (let j = 0; j < temp.length; j++) {
        //     arr[start + j] = temp[j];
        // }
        // jahan se bhi chota mila, wahan ka pointer aage badao +
        // agar right se chota mila toh swap bhi karna hai
        // left se chota mila thha to swap nahi karna hai
        // if(mid-start + 1 > end-mid){
        //     arr = [...arr.slice(0, start), ...temp, ...arr.slice(end-mid +1, mid-start+2), ...arr.slice(end+1, arr.length-1)]
        // } else{
        //     arr = [...arr.slice(0, start), ...temp, ...arr.slice(end+1, arr.length-1)]
        // }
        // Copy remaining elements from the subarrays if any
        // while(arrL.length && arrR.length){
        //     if(arrL[0] < arrR[0]){

        //         temp.push(arrL.shift());
        //     } else {
        //         temp.push(arrR.shift())
        //     }
        // }
        // return [...temp, ...arrL, ...arrR];

// Merge Sort Algorithm
// export const mergeSort = array => {
//     if (array.length < 2) {
//       return array;
//     }
//     return mergeSortHelper(array, []);
//   };
  
//   function mergeSortHelper(arr, animation) {
//     if (arr.length < 2) {
//       return [arr, []];
//     }
//     const mid = Math.floor(arr.length / 2);
//     const left = arr.slice(0, mid);
//     const right = arr.slice(mid);
  
//     const [animationL, arrL] = mergeSortHelper(left, animation);
//     const [animationR, arrR] = mergeSortHelper(right, animation);
    
//     const [animation_, arr_] = merge(left, right, [...arrL, ...arrR], [...animationL, ...animationR]);
  
//     return [animation, arr];
//   }
  
//   function merge(left, right, arr, animation) {
//     let i = 0;
//     let j = 0;
//     let k = 0;
  
//     while (i < left.length && j < right.length) {
//       if (left[i] < right[j]) {
//         arr[k] = left[i];
//         i++;
//       } else {
//         arr[k] = right[j];
//         j++;
//       }
//       k++;
//     }
  
//     while (i < left.length) {
//       arr[k] = left[i];
//       i++;
//       k++;
//     }
  
//     while (j < right.length) {
//       arr[k] = right[j];
//       j++;
//       k++;
//     }
  
//     // Store the comparisons for animation
//     const comparisons = [];
//     for (let m = 0; m < arr.length; m++) {
//       comparisons.push([m, arr[m]]);
//     }
//     animation.push(comparisons);
//     return([arr, animation]);
//   }
  

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
    if(array.length < 2){
        return array;
    }
    let partition = array[0];
    let left = array.filter((element) => element < partition);
    let right = array.filter((element) => element > partition);
    let equal = array.filter((element) => element == partition);
    return [...quickSort(left), ...equal, ...quickSort(right)];
}