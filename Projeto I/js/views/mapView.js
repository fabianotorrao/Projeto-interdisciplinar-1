    initMap = function(){
    let options = {
      zoom:8,
      center:{lat:42.3601,lng:-71.0589}
    }
    
    let map = new google.maps.Map(document.getElementById('map'), options);
    
  
    renderMarkers(activitiesListParse = []);{
      if (activitiesListParse.length != 0){
        for (const activity of activitiesListParse){
          addMarker(activity.local)
        }
      }
    }

    function addMarker(props){
      let marker = new google.maps.Marker({
        position:props.coords,
        map:map,
      });

      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
    }
  }






