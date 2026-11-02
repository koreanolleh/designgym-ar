# designgym-ar

디자인짐 '내 방에 놓아보기'(카메라 AR)에서 폰 높이를 재는 AI 모델 파일입니다. jsDelivr CDN으로 배포됩니다.

- `v1/pk_fp16.part0-3` — 아이폰용 (ONNX fp16, int8 block64 팩, 폰에서 fp16으로 복원)
- `v1/pk_lrt.part0-3` — 안드로이드용 (TFLite fp16, int8 block64 팩)
- `v1/depth_s_int8.part0-4` — 안드로이드 CPU 예비 (ONNX int8, 266×364)
- `v1/depth_int8.part0-4` — 아이폰/안드로이드 CPU 예비 (ONNX int8, 378×518)

모델: Depth Anything V2 Metric Indoor Small (Apache-2.0). 파일을 바꿀 때는 `v2/` 처럼 새 폴더로 올리고 페이지의 버전만 바꿉니다 (CDN 캐시 때문).
