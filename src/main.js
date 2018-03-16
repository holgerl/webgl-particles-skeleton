"use strict";

window.HL = window.HL || {};

HL.parameters = {};

HL.parameters.nofParticles = 40000;

HL.initAnimation = function(domNodeId, canvasId, percentageOfWindowHeight) {

	HL.timeStart = new Date().getTime();

	HL.vertexShaderCode = document.getElementById('vertexshader').textContent;

	HL.fragmentShaderCode = document.getElementById('fragmentshader').textContent;

	var renderer = new THREE.WebGLRenderer({antialias: false});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setClearColor(0x1D1D1D);
	renderer.domElement.setAttribute('id', canvasId);
	renderer.setSize(window.innerWidth, window.innerHeight * percentageOfWindowHeight, true); // TODO: Multiply by device pixel ratio
	renderer.setPixelRatio(window.devicePixelRatio || 1);

	HL.renderer = renderer;

	var ratio = renderer.getContext().drawingBufferWidth / renderer.getContext().drawingBufferHeight;
	
	var camera = new THREE.PerspectiveCamera(60, ratio, 0.1, 10000);
	camera.position.set(-150, 50, 0)
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	camera.updateProjectionMatrix();

	document.getElementById(domNodeId).appendChild(renderer.domElement);

	var scene = new THREE.Scene();
	HL.scene = scene;
	HL.camera = camera;

	var geometry = makeGeometry();

	var uniforms = {
		time: {value: 0.0},
		pixelRatio: {value: window.devicePixelRatio},
		nofParticles: {value: HL.parameters.nofParticles},
		particleSize: {value: 1000},
	};
	window.uniforms = uniforms;

	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: HL.vertexShaderCode,
		fragmentShader: HL.fragmentShaderCode,
		transparent: true
	});

	var points = new THREE.Points(geometry, material);
	scene.add(points);
}

function makeGeometry() {
	var positions = new Float32Array(HL.parameters.nofParticles * 3);

	var geometry = new THREE.BufferGeometry();

	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

	var vertexIndecies = new Float32Array(HL.parameters.nofParticles);
	for (var i = 0; i < vertexIndecies.length; i++) {
		vertexIndecies[i] = i;
	}

	geometry.addAttribute('vertexIndex', new THREE.BufferAttribute(vertexIndecies, 1));

	var deviance1 = new Float32Array(HL.parameters.nofParticles);
	for (var i = 0; i < deviance1.length; i++) {
		deviance1[i] = Math.random();
	}

	var deviance = new Float32Array(HL.parameters.nofParticles * 4);
	for (var i = 0; i < deviance.length; i++) {
		deviance[i] = Math.random();
	}

	geometry.addAttribute('deviance', new THREE.BufferAttribute(deviance, 4));

	geometry.computeBoundingSphere();

	return geometry;
}

HL.animate = function() {
	requestAnimationFrame(HL.animate);

	window.uniforms.time.value = (new Date().getTime() - HL.timeStart)/1000;

	HL.renderer.render(HL.scene, HL.camera);
}