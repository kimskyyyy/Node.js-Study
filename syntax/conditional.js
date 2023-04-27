var args = process.argv; // 콘솔로 입력 받는 방법, 콘솔에서 실행 시 명령 뒤에 입력 값을 함께 명시함
console.log(args[2]);
console.log('A');
console.log('B');
if(args[2] === '1') {
    console.log('C1');
} else {
    console.log('C2');
}
console.log('D');