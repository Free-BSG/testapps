Ext.define('mapapi.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: 'Get Started',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }
        ]
    }
    initializeMap = function() {
    //this var defines the map starting point, zoom, and type
    window.myLatlng = new google.maps.LatLng(44.2, -120.7);

    var mapProp = {
        center: myLatlng,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Map gives us a map to use
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    // Marker makes a pin
    window.marker = new google.maps.Marker({
        draggable: true,
        click: true,
        position: myLatlng,
        map: map,
        title: "location"
    });

    google.maps.event.addListener(marker, 'dragend', function (marker) {
        document.getElementById("latbox").value = this.getPosition().lat();
        document.getElementById("lngbox").value = this.getPosition().lng();
        service.locate(this.getPosition().lat() + '/' + this.getPosition().lng());
    });
}
});
