#version 310 es
precision highp float;
layout(location = 0) in vec2 aPosition;
layout(location = 1) in float aRotation;
layout(location = 2) in float aSize;
layout(location = 3) in float aRnd;
layout(location = 4) in float aPhase;
uniform vec2 uResolution;
uniform float uVisibleCount;
out vec2 vUv; out float vRnd; out float vFade;
void main(){
    float fade = clamp((uVisibleCount - float(gl_InstanceID)) / 24.0, 0.0, 1.0);
    if (fade <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); vFade = 0.0; return; }

    int vid = gl_VertexID;
    vec2 c = vec2((vid & 1) == 0 ? -1.0 : 1.0, (vid & 2) == 0 ? -1.0 : 1.0);
    float pulse = 1.0 + 0.08 * sin(aPhase); // сердечко «бьётся»
    vec2 local = c * aSize * pulse;
    float ca = cos(aRotation), sa = sin(aRotation);
    vec2 r = vec2(local.x * ca - local.y * sa, local.x * sa + local.y * ca);
    vec2 px = aPosition + vec2(r.x, -r.y);
    vec2 ndc = (px / uResolution) * 2.0 - 1.0; ndc.y = -ndc.y;
    gl_Position = vec4(ndc, 0.0, 1.0);
    vUv = c; vRnd = aRnd; vFade = fade;
}
