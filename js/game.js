

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', function() {
		alto  = document.documentElement.clientHeight;
    	ancho = document.documentElement.clientWidth;
    	// var estados = { preload: preload, create: create, update: update, render: render };
    	// var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'gameDiv', estados);
    	game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'gameDiv');
    	
    	// Add all the states
    	game.state.add('menu', menuState);
    	game.state.add('play', playState);

    	game.state.start('menu');
    	//game.state.start('play');
    }, false);
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();