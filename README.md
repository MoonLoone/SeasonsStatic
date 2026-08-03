# SeasonsStatic

Статические конфиги сезонных эффектов частиц для приложения SeasonsDemo
(Android). Приложение тянет их по «сырым» URL и рендерит без релиза.

Раскладка **плоская** — каждый файл доступен как:

```
https://raw.githubusercontent.com/MoonLoone/SeasonsStatic/main/<file>
```

## Состав

- `effects.json` — индекс доступных эффектов (список манифестов).
- `<effect>.json` — манифест эффекта: пути к шейдерам/атласу, число частиц,
  раскладка вершинных атрибутов, правила посева частиц.
- `<effect>.comp/.vert/.frag` — GLSL ES 3.10: compute (физика) + vertex/fragment
  (инстансный рендер атласа).
- `common_noise.glsl` — общий шум/curl, подключается в compute через `#include`.
- `<atlas>.png` — атласы спрайтов (premultiplied alpha).

## Добавить новый эффект (без релиза приложения)

1. Залей `newfx.comp/.vert/.frag`, `newfxatlas.png` и `newfx.json`.
2. Добавь `"newfx.json"` в `effects.json`.

Приложение подхватит эффект при следующем запуске (с дисковым кэшем и
откатом на встроенные assets при офлайне).
