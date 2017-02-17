var playState = {

  create: function() {
    // Musica de fondo
    music2 = game.add.audio('music2');
    music2.loop = true;
    music2.volume = 0.5;
    music2.stop();
    if (game.global.music) {
      music2.play();
    }

    // Carga del sonido de fin de partida
    risa = game.add.audio('risa');

    // Carga de los sonidos del juego
    burpSound = game.add.audio('burp');

    this.vigilaSensores();
    
    // Codigo para ver un marcador numerico
    // scoreText = game.add.text(200, 5, game.global.puntuacion, { fontSize: '60px', fill: '#757676' });

    // Carga y configura cel comportamiento de los gráficos del juego
    objetivo = game.add.sprite(this.randomInicioX(), 0, 'torrezno');
    homer = game.add.sprite(this.inicioX(), this.inicioY(), 'homerHambre');

    game.physics.arcade.enable(homer);
    game.physics.arcade.enable(objetivo);

    homer.body.collideWorldBounds = true;
    homer.scale.setTo(game.global.escala, game.global.escala);
    
    objetivo.body.collideWorldBounds = true;
    objetivo.body.gravity.y = 200;
    objetivo.scale.setTo(game.global.escala, game.global.escala);

    objetivo.body.onWorldBounds = new Phaser.Signal();
    objetivo.body.onWorldBounds.add(this.decrementaPuntuacion, this);

    // Configura el mensaje de fin de partida y su comportamiento
    msg = game.add.text(0, -100, '   No eres un\nMacho Machote', {font: '45px Arial', fill: '#B99F0B'});
    msg.x = (ancho - msg.width) / 2;
    tweenFin = game.add.tween(msg);
    tweenFin.to({y: alto}, 3600); // La risa dura 3,6sg

    // Al final del mensaje se reinicia
    tweenFin.onComplete.add(this.recomienza, this);
  },

  update: function(){
    var factorDificultad = (-200 + (game.global.dificultad * 10));
    homer.body.velocity.x = (game.global.velocidadX * factorDificultad);
    game.physics.arcade.overlap(homer, objetivo, this.incrementaPuntuacion, null, this);
  },

  decrementaPuntuacion: function(){
    game.global.puntuacion = game.global.puntuacion - 1;
    
    if (game.global.puntuacion >= 0) {
      //objetivo.body.gravity.y = objetivo.body.gravity.y - 50;
	  
     // game.global.dificultad = game.global.dificultad - 1;

      this.borraMarcador();
      this.pintaMarcador();
    } 
    if (game.global.puntuacion < 0) {
       // Perdiste
       objetivo.body.gravity.y = 0;
       music2.stop();
       risa.play();
       tweenFin.start();
    }
    // scoreText.text = game.global.puntuacion;
    objetivo.reset(this.randomInicioX(), 0);
  },

  incrementaPuntuacion: function(){
	if (game.global.music) {
       burpSound.play();
    } 
    game.global.puntuacion = game.global.puntuacion + 1;
       
    if (game.global.puntuacion >= 0){
     // objetivo.body.gravity.y = objetivo.body.gravity.y + 50;
     // game.global.dificultad = game.global.dificultad + 1;
      this.borraMarcador();
      this.pintaMarcador();
    } 
    objetivo.reset(this.randomInicioX(), 0);
  },

  pintaMarcador: function() {
    var i;
    var j;
    var nVinos = game.global.puntuacion % 5;
    var nCubatas = Math.floor(game.global.puntuacion / 5);
    
    for (i = 0; i < nCubatas; i++) {
      game.global.marcador.push(game.add.image(25 * i, 5, 'cubata'));
    }

    for (j = 0; j < nVinos; j++) {
      game.global.marcador.push(game.add.image((nCubatas * 25) + (26 * j), 5, 'vino'));
    }
  },

  borraMarcador: function(){
    for(var i in game.global.marcador) {
      game.global.marcador[i].destroy();
    }
  },

  inicioX: function(){
    return (ancho - game.global.anchoHommer) / 2;
  },

  inicioY: function(){
    return alto;
  },

  randomInicioX: function(){
	    return (ancho - game.global.anchoTorrezno ) / 2;
    //return this.numeroAleatorioHasta(ancho - game.global.anchoTorrezno );
  },

  numeroAleatorioHasta: function(limite){
    return Math.floor(Math.random() * limite);
  },

  vigilaSensores: function(){
    function onError() {
        console.log('vigilaSensores: onError!');
    }

    function onSuccess(datosAceleracion){
      playState.detectaAgitacion(datosAceleracion);
      playState.registraDireccion(datosAceleracion);
    }
  //  navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 10 });
  },

  detectaAgitacion: function(datosAceleracion){
    var agitacionX = datosAceleracion.x > 10;
    var agitacionY = datosAceleracion.y > 10;
    if (agitacionX || agitacionY){
      setTimeout(this.recomienza, 1000);
    }
  },

  recomienza: function(){
    risa.stop();
    game.state.start('menu');
    //document.location.reload(true);
  },

  registraDireccion: function(datosAceleracion){
    game.global.velocidadX = datosAceleracion.x ;
    game.global.velocidadY = datosAceleracion.y ;
  }
};
