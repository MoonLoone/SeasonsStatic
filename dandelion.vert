#version 310 es
precision highp float;
layout(location = 0) in vec2 aPosition;
layout(location = 1) in float aRotation;
layout(location = 2) in float aSize;
layout(location = 3) in float aRnd;
layout(location = 4) in float aAlpha;
uniform vec2 uResolution;
out vec2 vUv; out float vRnd; out float vAlpha;
void main(){
    int vid = gl_VertexID;
    vec2 c = vec2((vid & 1) == 0 ? -1.0 : 1.0, (vid & 2) == 0 ? -1.0 : 1.0);
    vec2 local = c * aSize;
    float ca = cos(aRotation), sa = sin(aRotation);
    vec2 r = vec2(local.x * ca - local.y * sa, local.x * sa + local.y * ca);
    vec2 px = aPosition + vec2(r.x, -r.y);
    vec2 ndc = (px / uResolution) * 2.0 - 1.0; ndc.y = -ndc.y;
    gl_Position = vec4(ndc, 0.0, 1.0);
    vUv = c; vRnd = aRnd; vAlpha = aAlpha;
}
