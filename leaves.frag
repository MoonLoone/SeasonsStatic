#version 310 es
precision highp float;
in vec2 vUv; in float vRnd; in float vFade;
uniform sampler2D uAtlas; uniform float uDarkMode;
out vec4 fragColor;
void main(){
    const int COLS = 5, ROWS = 5, N = 24;
    int idx = min(int(vRnd * float(N)), N - 1);
    int cx = idx % COLS, cy = idx / COLS;
    vec2 cuv = vec2(vUv.x * 0.5 + 0.5, 0.5 - vUv.y * 0.5);
    vec2 auv = (vec2(float(cx), float(cy)) + cuv) / vec2(float(COLS), float(ROWS));
    float cover = texture(uAtlas, vec2(auv.x, 1.0 - auv.y)).a;
    if (cover < 0.01) discard;
    float h = vRnd;
    vec3 coral = vec3(0.97, 0.58, 0.44);
    vec3 peach = vec3(0.99, 0.72, 0.42);
    vec3 gold  = vec3(0.99, 0.84, 0.55);
    vec3 col = mix(coral, peach, smoothstep(0.0, 0.5, h));
    col = mix(col, gold, smoothstep(0.5, 1.0, h));
    col *= mix(1.0, 1.06, uDarkMode);
    float a = cover * vFade;
    fragColor = vec4(col * a, a);
}
