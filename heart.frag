#version 310 es
precision highp float;
in vec2 vUv; in float vRnd; in float vFade;
uniform sampler2D uAtlas; uniform float uDarkMode;
out vec4 fragColor;
void main(){
    const int COLS = 2, ROWS = 2, N = 4;
    int idx = min(int(vRnd * float(N)), N - 1);
    int cx = idx % COLS, cy = idx / COLS;
    vec2 cuv = vec2(vUv.x * 0.5 + 0.5, 0.5 - vUv.y * 0.5);
    vec2 auv = (vec2(float(cx), float(cy)) + cuv) / vec2(float(COLS), float(ROWS));
    float cover = texture(uAtlas, vec2(auv.x, 1.0 - auv.y)).a;
    if (cover < 0.01) discard;

    // палитра ко Дню всех влюблённых: розовый -> красный -> малиновый
    float hh = vRnd;
    vec3 pink = vec3(1.00, 0.45, 0.62);
    vec3 red  = vec3(0.92, 0.12, 0.24);
    vec3 rose = vec3(0.86, 0.22, 0.52);
    vec3 col = mix(pink, red, smoothstep(0.0, 0.5, hh));
    col = mix(col, rose, smoothstep(0.5, 1.0, hh));
    col *= mix(1.0, 1.05, uDarkMode);

    float a = cover * vFade;
    fragColor = vec4(col * a, a);
}
