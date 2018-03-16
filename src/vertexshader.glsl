#define PI 3.14159265358979323844

uniform float time;
uniform float nofParticles;
uniform float particleSize;
uniform float pixelRatio;

varying vec3 particlePosition;

attribute float vertexIndex;
attribute vec4 deviance;

float easeOutCubic(float t) {
  t--;
  return t*t*t + 1.0;
}

float easeInOutCubic(float t) {
  if (t < 0.5) 
    return 4.0*t*t*t;
  else 
    return (t-1.0)*(2.0*t-2.0)*(2.0*t-2.0)+1.0;
}

float easeInOutQuad(float t) {
  return t < 0.5 ? 2.0*t*t : -1.0+(4.0-2.0*t)*t;
}

vec3 targetPosition() {
  float width = 30.0;
  float z = -width/2.0;
  if (deviance.y < 0.03) z -= 50.0;
  if (deviance.y > 0.2) z += 50.0;

  return vec3(-20.0, 60.0 + deviance.w*10.0, z + deviance.z*width);
}

void main() {
  float square = floor(sqrt(nofParticles));

  float x = mod(vertexIndex, square);
  float y = floor(vertexIndex / square);

  vec3 gridPosition = vec3(x - square/2.0, 0, y - square/2.0);

  vec3 startPosition = vec3(gridPosition.x, gridPosition.y + 3.0 * sin(gridPosition.z/10.0 + time*3.0), gridPosition.z);
  
  vec3 targetPosition = targetPosition();

  float speed = 1.0/2.0;
  float relativeTime = (time - deviance.x*10.0)*speed;
  relativeTime = clamp(relativeTime, 0.0, 1.0);

  vec3 newPosition = mix(startPosition, targetPosition, easeInOutQuad(relativeTime));

  particlePosition = newPosition;

  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = particleSize/length(mvPosition.xyz);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}