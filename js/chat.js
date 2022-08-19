$(function(){
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()


  //发送按钮
  $('#btn').on('click',function () {
    let text = $('#ipt').val().trim()
    if(text.length <= 0){
      return $('#ipt').val('')
    }

    //追加聊天内容
    $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+ text +'</span></li>')
    $('#ipt').val('')
    resetui()

    //发起请求，获取聊天内容
    getMsg(text)
  })

  //获取机器人的聊天数据
  function getMsg(text) {
    $.ajax({
      type:'GET',
      url :'http://www.liulongbin.top:3006/api/robot',
      data : {
        spoken : text
      },
      success: function(res){
        console.log(res)
        if (res.message === 'success') {
          const msg = res.data.info.text
          $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+ msg +'</span></li>')

          resetui()

          getVoice(msg)
        }
      }
    })
  }

  //转化为语音
  function getVoice(text) {
    $.ajax({
      type:'GET',
      url :'http://www.liulongbin.top:3006/api/synthesize',
      data : {
        text : text
      },
      success: function(res){
        console.log(res)
        if (res.status === 200) {
          $('#voice').attr('src',res.voiceUrl)
        }
      }
    })
  }

  //回车键
  $('#ipt').on('keyup',function(e) {
    if (e.keyCode === 13) {
      $('#btn').click()
    }
  })
})