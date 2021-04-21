const data = [
  {part: '頂葉', action: 'food'},
  {part: '頂葉', action: 'read'},
  {part: '枕葉', action: 'tv'},
  {part: '顳葉', action: 'listen'},
]

let game = false
let time = 0
let timer = 0

const reset = () => {
  $('.card-clear').removeClass('.card-clear')
  $('#card-action').empty()
  $('#card-part').empty()
  time = 0
  $('#text-time').text(Math.round(time * 10) / 10)

  for (let i = 0; i < data.length; i++) {
    $('#card-part').append(`
      <div class="card">
        <div class="card-back"></div>
        <div class="card-front"></div>
      </div>
    `)
    $('#card-action').append(`
      <div class="card">
        <div class="card-back"></div>
        <div class="card-front"></div>
      </div>
    `)
  }

  for (let i = 0; i < data.length; i++) {
    $('#card-part .card').eq(i).find('.card-front').css('background-image', `url(./cards/${data[i].part}.jpg)`)
    $('#card-action .card').eq(i).find('.card-front').css('background-image', `url(./cards/${data[i].action}.jpg)`)
  
    $('#card-part .card').eq(i).attr('data-part', data[i].part)
    $('#card-action .card').eq(i).attr('data-part', data[i].part)
  
    let target = Math.floor(Math.random() * data.length)
    $('#card-part .card').eq(target).insertAfter($('#card-part .card').eq(i))
    target = Math.floor(Math.random() * data.length)
    $('#card-action .card').eq(target).insertAfter($('#card-action .card').eq(i))
  }

  timer = setInterval(() => {
    time += 0.1
    $('#text-time').text(Math.round(time * 10) / 10)
  }, 100);
}


$('#card-part, #card-action').on('click', '.card', function () {
  if (!game) return

  if (!$(this).hasClass('card-open')) {
    if($('.card-open').length === 1 && $(this).parent().attr('id') !== $('.card-open').eq(0).parent().attr('id')) {
      $(this).addClass('card-open')
    } else if ($('.card-open').length === 0) {
      $(this).addClass('card-open')
    }
  }
  if ($('.card-open').length === 2) {
    if ($('.card-open').eq(0).attr('data-part') === $('.card-open').eq(1).attr('data-part')) {
      $('.card-open').fadeTo(1000, 0).addClass('card-clear')
    }
    setTimeout(() => {
      $('.card-open').removeClass('card-open')
    }, 1000);
  }
  if ($('.card-clear').length === data.length * 2) {
    clearInterval(timer)
    Swal.fire({
        title: '恭喜過關'
    })
    $('#start').attr('disabled', false)
  }
})

$('#start').click(function() {
  game = true
  $(this).attr('disabled', true)
  reset()
})