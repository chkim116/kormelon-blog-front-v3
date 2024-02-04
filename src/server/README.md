_Last update 23.10.14_

## Introduce

- `server` 모듈의 주요 목적은 `Repository` 모듈을 이용해 프론트엔드와 백엔드 사이를 잇는 것입니다. (또는 DB)
- Next의 특성을 이용하여 클라이언트가 하기 어려운 서버 작업(쿠키 제어 등)을 수행하기도 합니다.

## Folder Structure

```
// server modules

├── cookies
├── entities
├── repositories
```

| 폴더명       | 목적                                               | use-server |
| ------------ | -------------------------------------------------- | ---------- |
| cookies      | 서버 쿠키 제어                                     | ✅         |
| entities     | 서버로의 요청 및 응답 타입 선언                    | ❌         |
| repositories | 서버 요청 수행 및 서버에서 이뤄지는 부수 작업 수행 | ❌         |

<br />

> `server` 모듈는 오직 '서버'에서만 import 하지 않습니다. `Entity`, `Repository` 의 경우 클라이언트에서 참조 가능 합니다. 이것은 필요에 따른 몇몇 파일만 `use-server` 키워드가 포함된 이유입니다.
