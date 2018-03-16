uniform float time;

varying vec3 particlePosition;

vec4 circle(vec3 color, vec2 pointCoord) {
  float alpha;

  float gradient = 1.0 - length(pointCoord - vec2(0.5, 0.5));
  
  if (gradient > 0.5) // TODO: Use ternary
    alpha = 1.0; 
  else 
    alpha = 0.0;
  
  float gradientWidth = 0.1;
  if (gradient < 0.5 + gradientWidth && gradient > 0.5) 
    alpha = 1.0 - (0.5 + gradientWidth - gradient) / gradientWidth;

  return vec4(color.x, color.y, color.z, alpha);
}

void main() {
  vec3 white = vec3(1.0);
  gl_FragColor = circle(white, gl_PointCoord);
}