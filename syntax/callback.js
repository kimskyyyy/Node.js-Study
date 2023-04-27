// 기본 함수
function a() {
    console.log('A');
}
a();

// 익명 함수: 기본 함수와 기능이 똑같으나 이름이 없음
function() {
    console.log('A');
}

// 익명 함수를 호출하기 위해 익명 함수를 변수에 할당하기
var a = function() {
    console.log('A');
}
a();


// 처리 시간이 오래 걸린다고 가정한 함수 정의
var a 