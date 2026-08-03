#version 310 es
precision highp float;
in vec2 vUv; in float vRnd; in float vLife; in float vSmall;
uniform sampler2D uAtlas; uniform float uDarkMode;
out vec4 fragColor;
void main(){
    vec2 uv = vUv;
    const int COLS = 4, ROWS = 3;
    int idx = (vSmall > 0.5) ? int(vRnd * 4.0) : 4 + int(vRnd * 8.0);
    idx = min(idx, COLS * ROWS - 1);
    int cx = idx % COLS, cy = idx / COLS;
    vec2 cuv = vec2(uv.x * 0.5 + 0.5, 0.5 - uv.y * 0.5);
    vec2 auv = (vec2(float(cx), float(cy)) + cuv) / vec2(float(COLS), float(ROWS));
    vec4 tex = texture(uAtlas, vec2(auv.x, 1.0 - auv.y));

    float fade = mix(0.80, 0.68, uDarkMode)
               * (1.0 - smoothstep(0.88, 0.96, vLife))
               * smoothstep(0.0, 0.05, vLife);
    vec3 texCol = tex.rgb * fade;
    float bubbleA = tex.a * fade;

    float pop = smoothstep(0.88, 1.0, vLife);
    float ang = atan(uv.y, uv.x);
    const float N = 14.0;
    float seg = 6.2831853 / N;
    float k = floor(ang / seg + 0.5);
    float jit = fract(sin(k * 12.9 + vRnd * 7.0) * 43758.5);
    float da = k * seg + (jit - 0.5) * seg * 0.7;
    float spd = 0.55 + 0.55 * jit;
    float rd = pop * spd * 0.80;
    vec2 dc = rd * vec2(cos(da), sin(da));
    float dropR = mix(0.12, 0.015, pop) * (0.6 + 0.7 * jit);
    float drop = smoothstep(dropR, 0.0, length(uv - dc));
    float dropA = drop * pop * (1.0 - smoothstep(0.55, 1.0, pop));
    vec3 dropCol = vec3(0.95);

    vec3 outCol = texCol + dropCol * dropA;
    float outA = min(bubbleA + dropA, 1.0);
    if (outA < 0.004) discard;
    fragColor = vec4(outCol, outA);
}
