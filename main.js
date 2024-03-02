document.getElementById('download').addEventListener('click', function() {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const content = event.target.result;
            const linesArray = content.trim().split('\n'); 
            const arr = linesArray.map(Number);
            
            setTimeout(function() {
                const { min, max } = findMinMax(arr);
                document.getElementById('max').innerText = max;
                document.getElementById('min').innerText = min;
            }, 0);

            
            // Інші розрахунки (median, average, maxSequence, minSequence)
            setTimeout(function() {
                document.getElementById('average').innerText = findAverage(arr);
                document.getElementById('median').innerText = findMedian(arr);
                const maxSequence = longestIncreased(arr);
                document.getElementById('maxSequence').innerText = maxSequence.join(', ');
                const minSequence = longestDecreased(arr);
                document.getElementById('minSequence').innerText = minSequence.join(', ');
            }, 0);
        };
        reader.readAsText(file);
    
    }

    function findMinMax(arr) {
        if (arr.length === 0) {
            throw new Error('array empty');
        }
        let min = arr[0];
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            } else if (arr[i] > max) {
                max = arr[i];
            }
        }
        return { min, max };
    }

    function findAverage(arr) {
        if (arr.length === 0) {
            throw new Error('array empty');
        }
        let sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / arr.length;
    }

    function findMedian(arr) {
        if (arr.length === 0) {
            throw new Error('array empty');
        }
        let sortedArr = arr.slice().sort((a, b) => a - b);
        let middleIndex = Math.floor(sortedArr.length / 2);
        if (sortedArr.length % 2 === 0) {
            return (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
        } else {
            return sortedArr[middleIndex];
        }
    }

    function longestIncreased(arr) {
        let longestPart = [];
        let currentPart = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > (arr[i - 1] || -Infinity)) {
                currentPart.push(arr[i]);
            } else {
                if (currentPart.length > longestPart.length) {
                    longestPart = currentPart;
                }
                currentPart = [arr[i]];
            }
        }
        if (currentPart.length > longestPart.length) {
            longestPart = currentPart;
        }
        return longestPart;
    }
    
    function longestDecreased(arr) {
        let longestPart = [];
        let currentPart = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < (arr[i - 1] || Infinity)) {
                currentPart.push(arr[i]);
            } else {
                if (currentPart.length > longestPart.length) {
                    longestPart = currentPart;
                }
                currentPart = [arr[i]];
            }
        }
        if (currentPart.length > longestPart.length) {
            longestPart = currentPart;
        }
        return longestPart;
    }
});
