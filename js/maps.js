rastrear.marker = {};

console.info('carregou file maps');


$(document).ready(function(){	
	console.info('carregou ready maps');
});

$(document).on('pageinit', '#maps', function(){        
	console.info('carregou pageinit maps');

});
        





/*		
		div = document.createElement('div')
		div.setAttribute('id','map_div')
		document.querySelector('#maps div[data-role=content]').appendChild(div)
*/


// Adiciona novo marker
rastrear.marker.add = function() {

position = new google.maps.LatLng(-20.2,-40.3);
var marker = 	new google.maps.Marker({ 	position : position,
                                        map : rastrear.map,
                                        title : 'this.title',
                                        // icon : this.icon,      
                                        animation : 2 });
  if (this.info) {
    var infoWindow = new google.maps.InfoWindow({ content: this.info, maxWidth: 400});
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(rastrear.map, marker);
    })
  }

  rastrear.map.setCenter(position);
  return marker;                                            
}


// Atualiza marker
rastrear.marker.update = function() {
  rastrear.marker.setPosition(new google.maps.LatLng(-20.2,-40.2));
  this.info = 'DEUS';
  rastrear.marker.setTitle('this.title');

  if (this.info) {
    var infoWindow = new google.maps.InfoWindow({ content: this.info, maxWidth: 400});
infoWindow.open(rastrear.map, rastrear.marker);
    google.maps.event.addListener(rastrear.marker, 'click', function () {
      infoWindow.open(rastrear.map, rastrear.marker);
    })
  }

  if (this.center) {
    position = new google.maps.LatLng(this.latitude, this.longitude);
    if(this.center){ map.setCenter(position) }
  }
  return null;                                             
}


// Remove marker
rastrear.marker.remove = function(marker) {
  rastrear.marker.setMap(null);
  return null;                                            
} 
