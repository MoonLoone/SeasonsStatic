#version 310 es
precision highp float;
layout(location = 0) in vec2 aPosition;
layout(location = 1) in float aRadius;
layout(location = 2) in float aRnd;
layout(location = 3) in float aWobble;
layout(location = 4) in float aLife;
uniform vec2 uResolution;
out vec2 vUv; out float vRnd; out float vLife; out float vSmall;
void main(){
    int vid = gl_VertexID;
    vec2 c = vec2((vid & 1) == 0 ? -1.0 : 1.0, (vid & 2) == 0 ? -1.0 : 1.0);
    float pop = smoothstep(0.88, 1.0, aLife);
    float wob = 0.05;
    vec2 scl = vec2(1.0 + wob * sin(aWobble), 1.0 - wob * sin(aWobble));
    vec2 local = c * aRadius * (1.0 + pop * 1.1) * scl;
    vec2 px = aPosition + vec2(local.x, -local.y);
    vec2 ndc = (px / uResolution) * 2.0 - 1.0; ndc.y = -ndc.y;
    gl_Position = vec4(ndc, 0.0, 1.0);
    vUv = c; vRnd = aRnd; vLife = aLife; vSmall = aRadius < 40.0 ? 1.0 : 0.0;
}
