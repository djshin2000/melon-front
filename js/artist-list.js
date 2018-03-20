//1. axios를 사용해서 ArtistList를 요청하기
//2. 돌아온 응답 데이터의 'results' 값을 순회하며 jQuery를 사용해 .artist-item을
//    .artist-list의 내부에 추가
var pageNumber = 1;
getArtists (pageNumber);

$('#btnMoreArtists').click(function () {
  clickMoreArtistsButton();
})

function clickMoreArtistsButton () {
  pageNumber += 1;
  getArtists (pageNumber);
}

function getArtists (pageNum) {
  axios({
    url: 'http://localhost:8000/api/artist/',
    method: 'get',
    params: {
      page: pageNum
    }
  }).then(function (response) {
    console.log(response)
    var artists = response.data.results;
    // console.log(artists)
    for (var i = 0; i < artists.length; i++) {
      var currentArtist = artists[i];
      // console.log(currentArtist)
      var curArtistElement = $('#artist-item-template').clone();
      curArtistElement.find('.artist-name').text(currentArtist.name);
      curArtistElement.find('.artist-img-profile').attr('src', currentArtist.img_profile);
      $('.artist-list').append(curArtistElement);
    }
    var nextpage = response.data.next;
    if (nextpage == null) {
      $('#btnMoreArtists').hide();
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
