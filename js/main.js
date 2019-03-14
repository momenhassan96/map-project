    var cities=["Damascus","Mogadishu","Ibiza","Cairo","Tahrir ","Nairobi","Kathmandu","Madrid","Athens","Istanbul"]
    var coord=
    [
        [33.5138, 36.2765],
        [2.0469, 45.3182],
        [39.0200, 1.4821],
        [26.8206, 30.8025],
        [30.0444, 31.2357],
        [1.2921, 36.8219],
        [27.7172, 85.3240],
        [40.4168, 3.7038],
        [37.9838, 23.7275],
        [41.0082, 28.9784]
    ]

        var markers=[];
        var markersColors=[];

        var myApp=angular.module('myModule',[]);
        var myController =function($scope,$http){
        init();
        $http.get("basic.json")
        .then(function(response){

        for(var i=0;i<response.data.feed.entry.length;i++)
        {
            var text=response.data.feed.entry[i].content.$t;
            var firstSplit= text.split(":")[2];
            var lastComa=firstSplit.lastIndexOf(",");
            var messages=firstSplit.substring(0,lastComa);
            var index = -1;

            for(var y=0 ; y<cities.length ; y++)
            {
            var city=cities[y];
                index = messages.indexOf(city)
                if(index!=-1){
                    index=y;
                    break;
                }
                
            }

            if(index!=-1){
            coordinate = coord[index]
                
            if(text.indexOf("Negative")!=-1)
            {
                icon=negativeIcon;
            }
            else if(text.indexOf("Positive")!=-1)
            {
                icon=positiveIcon;
            }
            else
            {
                icon=neutralIcon;
            }
            mrk=L.marker(coordinate, {icon: icon}).addTo(mymap).bindPopup(messages)
            
            markers.push(mrk);
            }
        }
    })
    
    };

    init=function()
    {
        mymap = L.map('mapid').setView([30.03, 31.26], 4);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        
        greenIcon = L.icon({
            iconUrl: 'images/leaf-green.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64], 
            iconAnchor:   [22, 94], 
            shadowAnchor: [4, 62],  
            popupAnchor:  [-3, -76] 
        });

        LeafIcon = L.Icon.extend({
            options: {
                iconSize:     [38, 95],
                shadowSize:   [50, 64],
                iconAnchor:   [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor:  [-3, -76]
            }
        });

        positiveIcon = new LeafIcon({iconUrl: 'images/message-happy.png'}),
        negativeIcon = new LeafIcon({iconUrl: 'images/message-angry.png'}),
        neutralIcon = new LeafIcon({iconUrl: 'images/message-neutral.png'});

        L.icon = function (options) {
            return new L.Icon(options);
        };
        
        document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';
    } 

        myApp.controller('myController',myController);
