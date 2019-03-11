$(document).ready(function () {
  console.log('ready')
  $('#wait').html('Please Wait While We Contact Our Sources')
})
$(function () {
  var params = {
    // Request parameters
  }

  $.ajax({
    url: 'https://api.fantasydata.net/mlb/v2/json/games/2017' + $.param(params),
    beforeSend: function (xhrObj) {
      // Request headers
      xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', '86fa2ac782a74e4fb71a00dbb128fe19')
    },
    type: 'GET',
    // Request body
    data: '{body}'
  })
    .catch(function (error) {
      alert('error')
    })
    .then(function (data) {
      alert('THANKS FOR WAITING!')
      $('#wait').html('Click Above To Find Out')

      // Data is logging here
      // console.log(data);
      return data
    }).then(function (home) {
      var homeList = []
      var awayList = []
      // creating the loop to sort home games and away games for the rockies
      for (var i = 0; i < home.length; i++) {
        if (home[i].StadiumID === 44) {
          homeList.push(home[i])
        } else if (home[i].AwayTeamID === 23) {
          awayList.push(home[i])
        }
        // was considering putting else statement here that filled another array with the rest of the data
      }
      // holy shit the rockies play 81 home and 81 away games
      // console.log(homeList);
      // console.log(awayList);
      return [homeList, awayList]
    }).then(function (schedule) {
      // FUNCTION TO CHECK SEE IF TODAYS DATE MATCHES ANY ROCKIES GAME
      $('#nextGame').click(function () {
        var homeTime = schedule[0]
        var awayTime = schedule[1]
        var game = checkSchedule(homeTime)
        var away = checkSchedule(awayTime)
        // console.log(homeTime);
        // console.log(away);
        // console.log(game);
        // !game === true ? console.log('hello') : console.log('no');
        if (game) {
          var date = game.Day.substring(0, 10)
          var time = game.DateTime
          var opponent = game.AwayTeam
          var formattedTime = time.substring(time.length - 8)
          var stringTime = formattedTime.slice(0, 5)
          // var anyString = 'Mozilla';
          // var anyString4 = anyString.substring(anyString.length - 4);
          // console.log(time);
          // console.log(opponent);
          // $('#date').val(date)
          // $('#time').val(formattedTime)
          // $('#opponent').val(opponent)
          $('#background').attr('src', 'https://res-5.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_645,q_50,w_1024/v1/clients/denver/93e01c10_690b_4984_8b74_54cda70b345a_afb9810e-f022-45e8-8a12-2c96327a7e35.jpg')
          $('#answer').html('The Rockies Are Home')
          $('#message').html('Times are in displayed Eastern Standard Time')
          $('#gone').html('COL vs' + ' ' + opponent + ' ' + 'at' + ' ' + stringTime)
          // return info
        } else if (away) {
          // console.log(away);
          // console.log(checkSchedule(awayTime))
          var date = away.Day.substring(0, 10)
          var time = away.DateTime
          var opponent = away.HomeTeam
          var formattedTime = time.substring(time.length - 8)
          var stringTime = formattedTime.slice(0, 5)
          console.log(stringTime)
          // checkSchedule(awayTime);
          // console.log(time);
          // console.log(date);
          // console.log(formattedTime);

          // console.log(opponent);
          // $('#date').val(date)
          // $('#time').val(formattedTime)
          // $('#opponent').val(opponent)
          $('#background').attr('src', 'http://hd.wallpaperswide.com/thumbs/on_the_road_2-t2.jpg')
          $('#answer').html('The Rockies Are Away')
          $('#message').html('Times are in displayed Eastern Standard Time')
          $('#gone').html('COL vs' + ' ' + opponent + ' ' + 'at' + ' ' + stringTime)
          // console.log(info);
          // return info
        }
        if (!game === true && !away === true) {
          // $('#gone').val('They are all sleeping probably')
          $('#answer').html("They are off, there isn't a game scheduled for today")
          $('#gone').html('Click on the button fo more options')

          // console.log("no game today")
        }
        // console.log(homeTime);
      })
    })
})

function checkSchedule (array) {
  var tzoffset = (new Date()).getTimezoneOffset() * 60000
  var today = new Date()
  console.log(tzoffset)
  // var todayHome ="2017-04-07T16:10:00"
  // var todayAway = "2017-04-03T00:00:00"
  // var convertDate = today.toISOString()
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
  // console.log(convertDate);
  // console.log(localISOTime);
  var dateString = localISOTime.substring(0, 10)
  console.log(dateString)
  for (var i = 0; i < array.length; i++) {
    var matchDate = array[i].Day.substring(0, 10)
    // array[i].Day = array[i].Day.substring(0,10)
    // console.log(array[i].Day);
    // console.log(matchDate);
    if (matchDate === dateString) {
      // (console.log(array[i].DateTime, array[i].AwayTeam))
      // console.log(matchDate);
      return array[i]
    }
  }
}
// $('#nextGame').click(function(){
//     var today = new Date()
//     console.log(today);
//     var dateString = today.toISOString()
//     console.log(dateString);
//     var justDate = dateString.substring(0,10)
//     $('#time').val(justDate);
// })
