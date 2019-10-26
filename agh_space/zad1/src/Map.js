import React, {
  Component
} from 'react';
var loadjs = require('loadjs');

class Map extends Component {

  state = {
    map: "",
    infoWindow: "",
    apiLoaded: false,
    markers: [],
  }
//tworzy marker
  createMarker(data) {
    var marker = new window.google.maps.Marker({
      map: this.state.map,
      position: {
        lat: data.lat,
        lng: data.lng
      },
      title: 'lat: '+data.lat+' lng: '+data.lng,
      animation: window.google.maps.Animation.DROP,
      id: data.id,
    });

  this.setState({markers:[...this.state.markers, marker]});
  this.activateWindow(marker,this.state.infoWindow);
  }
//obsługa click na mapie
  mapClickHandler(e){
  var  data = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      id: e.latLng.lat(),
    }
    this.createMarker(data);
  }
//pokazuje info window przy danym markerze
  activateWindow(marker, iWindow) {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(marker.setAnimation(null), 2000)
      if(iWindow.marker!==marker){
        iWindow.marker = marker;
        iWindow.setContent('<h3>'+ marker.title +'</h3>')
        iWindow.open(window.map,marker);
        iWindow.addListener('closeclick', function() {
        iWindow.marker = null;
        });
      }

  }
//usuwa marker
deleteMarker(marker){
  marker.setMap(null);
  var index= this.state.markers.findIndex((x)=>marker.id==x.id);
  var arr =[...this.state.markers];
  arr.splice(index,1);
  this.setState({markers:arr});
    marker.setMap(null);

}
//incializuje mapę i przygotowywuje info window
  initMap() {
    this.state.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 50.0647,
        lng: 19.9450
      },
      zoom: 13,
    });
    this.state.map.addListener('click', (e) => this.mapClickHandler(e));
    this.state.infoWindow = new window.google.maps.InfoWindow();
    this.setState({
      apiLoaded: true
    });
  }

//przy pierwszym renderze wywoułuje funkcje inicjalizującą mapę i ładuje API
  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    loadjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyA6KQkA-DUZQ0Pz4B7x-pSVwdv1DZpRKNA&v=3&callback=initMap');
  }


  render() {

var activateWindow = this.activateWindow;
      var infoWindow = this.state.infoWindow;
      this.state.markers.map(marker => marker.addListener('click', function(){activateWindow(this,infoWindow)}))
    return(
    <div>
      <div id="map"></div>
      <nav>
          <ul>
              {this.state.markers.map((marker) =>(
                <li key={marker.position.lat()} onClick={()=>activateWindow(marker,infoWindow)}>{'lat: '+marker.position.lat()+" lng: "+ marker.position.lng()}<button onClick={()=>{this.deleteMarker(marker)}}>X</button></li>
              ))}
          </ul>
      </nav>
    </div>

   );
 }


}

export default Map
