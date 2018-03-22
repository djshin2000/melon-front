// -> function initUserInfo() {}
// 0. UserDetail과 /api/members/info/를 연결시키는 부분을 백엔드로 구현, Postman으로 테스트
// 1. 클라이언트에 'token'이라는 Cookie가 있는지 확인
// 2. 만약 있다면 해당 값을 가져온 후
// 3. getUserInfo ()를 실행
//      -> UserDetail에 get요청, pk없음
//          URL: api/members/info
//            HTTP Header 'Authorization'에 'Token <value>'값을 담아서 요청
//          request.user를 기준으로 serialize한 User를 리턴
//4. 유저정보를 가져온 후 getAuthToken의 .then() 아래 유저정보 표시 로직을 실행
function initUserInfo () {
  console.log(getCookie('token'));
  var token = getCookie('token');
  if (token) {
    axios({
      url: 'http://localhost:8000/api/members/info/',
      method: 'get',
      headers: {
        Authorization: "Token " + token
      }
    }).then(function (response) {
      console.log(response.data);
      setUserInfo(response.data.user);
    }).catch(function (error) {
      console.log(error.response);
    })
  }
}
initUserInfo();

function setUserInfo (user) {
  // username = user.username;
  $('.login-form').addClass('none');
  $('.login-status').removeClass('none');
  $('.login-status > h3').text(user.username + '으로 로그인중');
}
