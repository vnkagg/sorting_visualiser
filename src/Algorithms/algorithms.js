export const mergeSort = array => {
    if(array.length < 2){
        return array;
    }
    return merge_sort(array);
    function merge_sort(arr) {
        if(arr.length < 2){
            return arr;
        }
        const mid = Math.floor(arr.length / 2);
        return merge(merge_sort(arr.slice(0, mid)), merge_sort(arr.slice(mid)));
    }
    function merge(arrL, arrR){
        let temp = [];
        while(arrL.length && arrR.length){
            if(arrL[0] < arrR[0]){
                temp.push(arrL.shift());
            } else {
                temp.push(arrR.shift())
            }
        }
        return [...temp, ...arrL, ...arrR];
    }
}

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