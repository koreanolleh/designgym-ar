# designgym-ar

디자인짐 '내 방에 놓아보기'(카메라 AR) 파일. jsDelivr CDN으로 배포.

jsDelivr는 브랜치(패키지)당 50MB 제한이 있어서 모델마다 브랜치를 따로 둔다:
- `m-ios` — v1/pk_fp16.part0-3 (아이폰 GPU, int8 팩 → 폰에서 fp16 복원)
- `m-and` — v1/pk_lrt.part0-3 (안드로이드 GPU, TFLite int8 팩)
- `m-cpus` — v1/depth_s_int8.part0-4 (안드로이드 CPU 예비, 266×364)
- `m-cpu` — v1/depth_int8.part0-4 (CPU 예비, 378×518)
- `main` — page/ (카페24에 올리는 페이지 원본·백업)

주소 예: https://cdn.jsdelivr.net/gh/koreanolleh/designgym-ar@m-ios/v1/pk_fp16.part0
모델: Depth Anything V2 Metric Indoor Small (Apache-2.0).
