1. arr.sort() 는 원본 파일이 변해서 vue 반응형이 제대로 동작하지 않으니 [..arr] 복사해서 쓸 것!

2. Deprecation Warning: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.

- "sass": "~1.55.0" => "sass": "~1.32.12"

3. https://velog.io/@hyunsdb/Nest.js-Error-Nest-cant-resolve-dependencies-of-the-BlockService-.-Please-make-sure-that-the-argument-TBlockModel-at-index-0-is-available-in-the-AppModule-context
   imports에 모듈을 쓴 경우 providers에 안 쓰고 싶다면 모듈에서 익스포트 해줘야한다!
   뭔가 순환참조가 발생하는지
   secretOrPrivateKey must have a value 이슈 발생하더라
