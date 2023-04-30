console.log(Math.round(1.6)); // 2
console.log(Math.round(1.4)); // 1

// sum1() 결과를 콘솔에 출력하는 코드가 함수에 포함됨
function sum1(first, second) {
    console.log(first + second);
}
sum1(2, 4); // 6

// sum2() 처리 결과를 반환, 반환 받은 값을 콘솔로 출력
function sum2(first, second) {
    return first + second;
}
console.log(sum2(2, 4)); // 6