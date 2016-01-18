var React = require('react');

var map = null;
var query;
var infobox;

var BingMap = React.createClass({
  searchServiceCallback: function (home_infos) {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {credentials: 'AjVrfYUU-6_5NnEHSjCxZ16XAJHyu0-J42p16WXCld6F52NujvxQ2iRV1X3UQeQs'});
//    dataLayer = new Microsoft.Maps.EntityCollection();
//    map.entities.push(dataLayer);

//    var infoboxLayer = new Microsoft.Maps.EntityCollection();
//    map.entities.push(infoboxLayer);
//
    infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, offset: new Microsoft.Maps.Point(0, 20) });
    map.entities.push(infobox);


    var output = document.getElementById("output");

    if (output) {
      while (output.hasChildNodes()) {
        output.removeChild(output.lastChild);
      }
    }
    var resultsHeader = document.createElement("h5");
    output.appendChild(resultsHeader);

    if(!Array.isArray(home_infos)) {
      home_infos = [home_infos]
    }

    var that = this;
    home_infos.map(function(data){
      var location = new Microsoft.Maps.Location(data.lat, data.long);
      var pushpin = new Microsoft.Maps.Pushpin(location);

      if(that.props.show_details){
        pushpin.Title = data.title;
        pushpin.Description = data.description;
        pushpin.HomeID = data.home_id;
        // Add handler for the pushpin click event.
        Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', that.displayInfo);
        Microsoft.Maps.Events.addHandler(pushpin, 'click', that.showHomeDetail);
      }
      map.entities.push(pushpin);
    })
    var location = new Microsoft.Maps.Location(home_infos[0].lat, home_infos[0].long);
    map.setView({center: location, zoom: 12});

  },

  displayInfo: function(e) {
    if (e.targetType == 'pushpin') {
      infobox.setLocation(e.target.getLocation());
      infobox.setOptions({ visible: true, title: e.target.Title, description: e.target.Description });
    }
  },

  showHomeDetail: function(e) {
     console.log('here');
     console.log(e.target.HomeID);
     window.open(CLIENT_URL + '#/home_detail/' + e.target.HomeID, '_blank');
  },

  componentDidMount: function () {
    //TODO should use this to control location
    this.searchServiceCallback(this.props.home_info);
  },

  render: function () {
    return (
      <div className='map-canvas'>
        <div id='myMap'></div>
        <div id="output"></div>
      </div>
      );
  }
});

module.exports = BingMap
