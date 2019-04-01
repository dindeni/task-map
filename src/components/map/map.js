import React, {useEffect} from 'react';

const map = (props) =>{

    const createMark = (geoObj)=>{
        let mark;
        let markStart;
        let coords = props.coords;
        coords.forEach((coord, index)=>{
            console.log(coord);

            mark = window.initMap.geoObjects.add(
                new window.ymaps.Placemark(coord,{
                    balloonContentBody: '<div>'+ props.formValue[index]+'</div>'
                }, {draggable: true})
            );

            mark.events.add('dragstart', (evt)=>{
                //get start coordinates
                markStart = evt.get('target').geometry.getCoordinates();
            });

            mark.events.add('dragend', (evt)=>{
                //get coordinates end
                const coordEnd = evt.get('target').geometry.getCoordinates();
                //replacement coordinates
                const foundIndex = coords.findIndex((el)=>{
                    return el === markStart
                });
                coords.splice(foundIndex, 1, coordEnd);
                //set changed coordinates
                geoObj.geometry.setCoordinates([...coords]);
            });

        });
    };

    useEffect(()=>{

        if (props.coords.length !== 0){
            console.log(props.coords);
            if (!window.initMap){
                window.ymaps.ready(function () {
                    window.initMap = new window.ymaps.Map('map', {
                        center: props.coords[props.coords.length-1],
                        zoom: 10,
                        controls: ['geolocationControl']
                    });

                    const geo = new window.ymaps.GeoObject({
                        geometry: {
                            type: "LineString",
                            coordinates:
                                [...props.coords]
                        }
                        ,
                        properties: {},

                    },{
                        //options
                        hasBalloon: true,

                    });
                    window.initMap.geoObjects.add(geo);

                    createMark(geo)
            });

        }else {
                window.initMap.setCenter(props.coords[props.coords.length-1]);
                window.initMap.geoObjects.removeAll();


                const geo = new window.ymaps.GeoObject({
                    geometry: {
                        type: "LineString",
                        coordinates:
                            [...props.coords]
                    },
                    properties: {}

                },{
                    //options
                    hasBalloon: true,

                });

                window.initMap.geoObjects.add(geo);

                createMark(geo);
            }
        }
    }, [props.coords]);

    return(
            <div id="map" style={{width: 50+'%',height: 600+'px', margin: 'auto'}}>
        </div>

    )
};

export default map;