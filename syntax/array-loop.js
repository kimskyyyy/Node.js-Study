var number1 = [1, 400, 12, 34, 5]; // 배열 생성
var i = 0; // 변수 i를 0으로 초기화 
while(i < 5) { // 0, 1, 2, 3, 4 총 5번 반복
    console.log(number1[i]); // 배열의 0번 ~ 4번 인덱스 차례대로 조회
    i = i + 1;  // i를 1씩 증가시킴
}

var number2 = [1, 400, 12, 34, 5, 10000]; // 배열 생성
var i = 0; // 변수 i를 0으로 초기화 
while(i < number2.length) { // number2 배열의 길이만큼 반복
    console.log(number2[i]); // 배열의 인덱스 차례대로 조회
    i = i + 1;  // i를 1씩 증가시킴
}