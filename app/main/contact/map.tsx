'use client'
import React, { useEffect } from 'react';

const Map: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=dwem8fe5y1';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            const mapOptions = {
                center: new window.naver.maps.LatLng(37.67865, 127.0457),
                zoom: 17,
            };

            const map = new window.naver.maps.Map('map', mapOptions);

            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(37.67865, 127.0457),
                title: '우리회사',
                map: map,
            });
        };


        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return <div id="map" style={{ width: '700px', height: '400px' }} />;
};

export default Map;