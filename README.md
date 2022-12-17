# 세마고등학교 물품관리 사이트 개발

## 프로젝트 명

세마고등학교 물품관리 사이트 개발 

## 기획 및 개발

문진혁 (개인개발)

## 제작 기간

2022.03.05 ~ 2022.03.19 

## 사용 기술

- **Front-End**: Ejs , Css , Bootstrap
- **Back-End**: Node-Js, Express, MongoDB

## 배포

[세마고 과학실 물품과학시스템](https://port-0-semascience-fyyf25lbmid9vi.gksl2.cloudtype.app/)

CloudTYPE 에서 배포하였음.

## 프로젝트 기획 배경

 2020년 고등학교 소속 동아리(SEDA) 에서 과학실 물품관리 프로젝트라는 이름으로, 과학실의 물품들을 데이터로 저장 한 후에 이를 관리하는 프로젝트를 진행한 적이 있음.

- 2019년 - 물품에 대한 RFID카드를 제작, node-mcu 를 이용하여 리더기에 물품 카드를 대면 사용할 수 있는 방식으로 제작
- 2020년 - HTML을 이용하여 물품에 대한 페이지를 계속 작성, QR코드와 매치를 시킨 후 해당 QR을 찍으면 물품에 대한 정보를 보여주는 웹페이지 제작.

 **해당 프로젝트에서의 문제**

- 추가로 물품에 대한 페이지 생산 불가 (직접 Html 파일을 제작해야 함)
- 물품에 대한 수정 사항이 생길 경우, 직접 Html을 수정해야 함
- QR코드로만 접근이 가능하여, 과학실이 외에서 해당 정보가 필요한 경우에는 사용이 불가능
- 물품에 대한 RFID카드를 사용해야 사용 중으로 바꿀 수 있음
- 계속해서 물품이  늘어날 때마다 RFID카드를 만들어야 함
- 기본적인  HTML만을 사용하여 매우 보기 불편한 웹 페이지

이에 대한 문제들을 해결 하기 위해서 개인 프로젝트로 선정함.

## 구현 기능

### 데이터베이스 설계

![세마고등학교 물품관리프로젝트 (1).png](./image/%25EC%2584%25B8%25EB%25A7%2588%25EA%25B3%25A0%25EB%2593%25B1%25ED%2595%2599%25EA%25B5%2590_%25EB%25AC%25BC%25ED%2592%2588%25EA%25B4%2580%25EB%25A6%25AC%25ED%2594%2584%25EB%25A1%259C%25EC%25A0%259D%25ED%258A%25B8_(1).png)

### API 명세서

- **물품 공지사항 전체 조회**
    - GET /

### 물품

- **교실별 물품 조회**
    - 뉴턴실 - GET /newton
    - 퀴리실 - GET /curie
    - 다윈실 - GET /dawrin
    - 케풀러실 - GET/kepler
    - 리소스실 - GET/resource
- 물품 검색 조회
    - GET /search
- **물품 상세 조회**
    - GET /data/{id}
- **물품 추가 요청**
    - GET /post
    - POST /post
- **물품 수정 요청**
    - GET /edit/{id}
    - POST /edit
- **물품 삭제**
    - DELETE /data

### 사용자

- **사용자 조회**
    - GET /member
- **사용자 추가 요청**
    - POST /user
- **사용자 삭제 요청**
    - DELETE /user

### 공지사항 추가

- **공지사항 추가 요청**
    - GET /postadmin
    - POST /postadmin
- **공지사항 수정 요청**
    - GET /edit/{id}
    - POST /editadmin
- **공지사항 삭제 요청**
    - DELETE /dataamin

### 기능 설명

- **메인페이지**
    
    ![Untitled](./image/Untitled.png)
    
    물품 리스트를 서버에서 받아와 메인페이지에 출력
    
- **물품 추가**
    
    ![Untitled](./image/Untitled%201.png)
    
- **물품 상세 페이지**
    - 사용하는 사람이 없을 경우
        
        ![Untitled](./image/Untitled%202.png)
        
    - 사용하는 사람이 있는 경우 - 주황색 창으로 테두리 변경
        
        ![Untitled](./image/Untitled%203.png)
        
    - 물품을 모두 사용한 경우 - 빨간색 창으로 테두리 변경
        
        ![Untitled](./image/Untitled%204.png)
        
        - 물품 사용 금지에 대한 알림창 생성
        
- **물품 사용자 명단 페이지**
    
    ![Untitled](./image/Untitled%205.png)
    
    - 교실별로 각 물품마다 아이콘으로 나타냄
    - 빠른 사용완료 버튼 추가
    - 현재 사용하는 전체인원 조회
    
- **교실별 물품 페이지**
    
    
    - 뉴턴실
    
    ![Untitled](./image/Untitled%206.png)
    
    다윈실
    
    ![Untitled](./image/Untitled%207.png)
    
    케플러실
    
    ![Untitled](./image/Untitled%208.png)
    
- **추가 기능**
    - QR코드 생성을 눌렀을 경우 (기능)
        
        ![Untitled](./image/Untitled%209.png)
        
    - 검색 기능
        
        ![Untitled](./image/Untitled%2010.png)
