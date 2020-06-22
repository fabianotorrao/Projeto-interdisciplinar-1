     initMap = function(){
    let options = {
      zoom:8,
      center:{lat:42.3601,lng:-71.0589}
    }
    
    let map = new google.maps.Map(document.getElementById('map'), options);
    let activities=this.activityController.activityModelVar.getAll()
    activities.forEach(activity => {
        addMarker(activity.local)
    });
  
    renderMarkers(activitiesListParse = []);{
      if (activitiesListParse.length != 0){
        for (const activity of activitiesListParse){
          addMarker(activity.local)
        }
      }
    }

    function addMarker(coords){
      let marker = new google.maps.Marker({
        position:coords,
        map:map,
      });

      if(content){
        var infoWindow = new google.maps.InfoWindow({
          content:content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
    }
  }






