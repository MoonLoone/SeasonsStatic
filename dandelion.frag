#version 310 es
precision highp float;
in vec2 vUv; in float vRnd; in float vAlpha;
uniform sampler2D uAtlas; uniform float uDarkMode;
out vec4 fragColor;
void main(){
    const int COLS = 2, ROWS = 2, N = 3;
    int idx = min(int(vRnd * float(N)), N - 1);
    int cx = idx % COLS, cy = idx / COLS;
    vec2 cuv = vec2(vUv.x * 0.5 + 0.5, 0.5 - vUv.y * 0.5);
    vec2 auv = (vec2(float(cx), float(cy)) + cuv) / vec2(float(COLS), float(ROWS));
    float cover = texture(uAtlas, vec2(auv.x, 1.0 - auv.y)).a;
    if (cover < 0.01) discard;
    vec3 lightCol = vec3(0.85, 0.86, 0.90);
    vec3 col = mix(lightCol, vec3(1.0), uDarkMode);
    float a = cover * vAlpha;
    fragColor = vec4(col * a, a);
}
