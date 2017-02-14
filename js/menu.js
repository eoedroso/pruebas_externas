var menuState = {

	preload: function () {
		game.stage.backgroundColor = '#ffffff';
		game.load.image('logo', 'assets/logo.png');
		game.load.image('speaker', 'assets/speaker.png');
		game.load.image('speakerMute', 'assets/speaker_mute.png');
		game.load.image('homerFeliz', 'assets/homerFeliz.png');
		game.load.image('homerHambre', 'assets/homerHambre.png');
    	game.load.image('torrezno', 'assets/torreznos-soria.png');
		game.load.image('vino', 'assets/copa-vino.png');
		game.load.image('cubata', 'assets/cubata.png');
		game.load.image('logo8KA', 'assets/logo-8kapps.png');
		game.load.audio('music1', ['assets/Kids_Music_1.ogg', 'assets/Kids_Music_1.mp3']);
		game.load.audio('music2', ['assets/Kids_Music_3.ogg', 'assets/Kids_Music_3.mp3']);
		game.load.audio('burp', ['assets/burp.ogg', 'assets/burp.mp3']);
		game.load.audio('risa', ['assets/wickedmalelaugh1.ogg', 'assets/wickedmalelaugh1.mp3']);
		game.load.audio('ronquido', ['assets/ronquido.ogg', 'assets/ronquido.mp3']);

		//game.global = {escala: 1.0};
    	game.global = {escala: 0.3};
		game.global = {
			music: true,
    		puntuacion: 0,
    		escala: game.global.escala,
    		anchoHommer: 279 * game.global.escala,
    		anchoTorrezno: 240 * game.global.escala,
    		dificultad: 0,
    		velocidadX: 0,
    		velocidadY: 0,
    		marcador: []
    	};
	},

	create: function () {
		// Musica pantalla menu
		music1 = game.add.audio('music1');
		music1.loop = true;
		music1.volume = 0.5;
		music1.stop();
		speakerMute = game.add.image(10, -50, 'speakerMute');
		speaker = game.add.image(10, -50, 'speaker');
		// Iconos musica
		if (game.global.music) {
			speakerMute.y = 10;
			music1.play();
			
		} else {
			speaker.y = 10;
			music1.stop();
		}
		speakerMute.inputEnabled = true;
		speakerMute.events.onInputDown.add(this.onSpeakerMuteTap, this);
		speaker.inputEnabled = true;
		speaker.events.onInputDown.add(this.onSpeakerTap, this);

		// Nombre Juego
		logo = game.add.image(0, 0, 'logo');
		logo.x = (ancho / 2) - (logo.width / 2);
		logo.y = -100;
		var tween1 = game.add.tween(logo);
		tween1.to({y: 80}, 1000);
		logo.inputEnabled = true;
		logo.events.onInputDown.add(this.start, this);

		// Homer feliz
		homerFeliz = game.add.image(0, 0, 'homerFeliz');
		homerFeliz.scale.setTo(0.1, 0.1);
		homerFeliz.x = (ancho / 2) - (563 / 4);
		homerFeliz.y = 200;
		var tween2 = game.add.tween(homerFeliz.scale);
		tween2.to({x:0.5, y:0.5}, 1000);
		homerFeliz.inputEnabled = true;
		homerFeliz.events.onInputDown.add(this.start, this);

		// Logo desarrollo
		emp = game.add.image(0, 0, 'logo8KA');
		emp.scale.setTo(0.2, 0.2);
		emp.x = (ancho / 2) - (emp.width / 2);
		emp.y = (alto - 120);
		emp.inputEnabled = true;
		ronquido = game.add.audio('ronquido');
		emp.events.onInputDown.add(this.onEmpTap, this);


		// Not for sale
		msg1 = game.add.text(0, alto - 50, 'Ejercicio didáctico', {font: '20px Arial', fill: '#B99F0B'});
		msg1.x = (ancho - msg1.width) / 2;
		msg2 = game.add.text(0, alto - 30, '- Not for Sale -', {font: '20px Arial', fill: '#B99F0B'});
		msg2.x = (ancho - msg2.width) / 2;
		
		tween1.start(); // Animación del nombre del juego
		tween2.start(); // Animación de Homer

		//	game.input.onTap.add(this.start, this);
	},

	onEmpTap: function() {
		ronquido.play();
	},

	onSpeakerTap: function() {
		// console.log('Sound');
		game.global.music = true;
		speaker.y = -50;
		speakerMute.y = 10;
		music1.play();
	},

	onSpeakerMuteTap: function() {
		// console.log('Mute');
		game.global.music = false;
		speakerMute.y = -50;
		speaker.y = 10;
		music1.stop();
	},

	start: function () {
		// console.log('start: play');
		ronquido.stop();
		music1.stop();
		game.state.start('play');
	}
};