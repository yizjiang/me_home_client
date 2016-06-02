var React = require('react'),
  Button = require('react-bootstrap').Button,
  ServerActions = require('../../actions/server_action'),
  UserStore = require('../../stores/user_store');

var HomeQrCode = React.createClass({

  handleSubmit: function() {
    var agentId = UserStore.getCurrentUser().id;
    var sourceType = $('#sourceType').val();
    var sourceId = $('#sourceId').val();
    $('#qrcode').attr('src', CLIENT_URL + '/img/loading.gif');

    $("#saveSuccess").hide();
    $("#saveFail").hide();

    ServerActions.generateHomeQrCode(agentId, sourceType, sourceId).then((data) => {
    $('#qrcode').attr('src', SERVER_URL + data.qrImage);
    $("#saveSuccess").show();
    }, () => {
        $('#qrcode').attr('src', SERVER_URL + "/default.jpeg");
        $("#saveFail").show();
      }
)},

  render: function() {
    return (
      <div>
        <label className='agentlabel'>房源档案类型</label>
        <select id='sourceType'>
          <option value='mls'>MLSListings</option>
          <option value='public_record'>Public Records</option>
          <option value='metro_list'>MetroList</option>
          <option value='new_home'>NewHomeSource.com</option>
        </select>
        <label className='agentlabel'>房源档案号</label>
        <input id='sourceId' className='answer-inputbox' type="text"/>
        <img id='qrcode' src={SERVER_URL + "/default.jpeg"}  height="160" width="160"/>
        <Button  style={{display: 'block'}} bsStyle='success' id='generate' type="button" onClick={this.handleSubmit} >生成二维码</Button>
        <p id='saveSuccess' style={{display: 'none', width: '80px'}} > 二维码已生成, 请保存</p>
        <p id='saveFail' style={{display: 'none', width: '80px'}} > 出错了, 该房源没找到</p>
      </div>
      );
  }
});

module.exports = HomeQrCode;