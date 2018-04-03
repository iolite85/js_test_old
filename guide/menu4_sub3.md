## 디자인 공유

  1. 00_Lib 클릭
  2. 0200_ec-markup-DevelopBranch-BuildAndDeploy 에서 빌드(빨간색 네모)
  3. BUILD_TARGET 'all'로 설정하여 빌드
  4. 15_DEV_ec-markup 클릭
  5. '1512_ec-markup-server-dev-deploy 빌드
  6. 1513_ec-markup-server-dev-restart 빌드
  7. 먼저 진행한 빌드가 끝난 후 순차로 빌드 진행

  ![ec-markup dev/qa 젠킨스배포](../img/doc/build3.jpg "")
  ![ec-markup dev/qa 젠킨스배포](../img/doc/build6.jpg "")


## DEV/QA환경에 자원(css/img) 배포

  1. 00_Lib 클릭
  2. 0200_ec-markup-DevelopBranch-BuildAndDeploy 에서 빌드(빨간색 네모)
  3. BUILD_TARGET 'all'로 설정하여 빌드
  4. 빌드 완료 시 dev/qa 환경에 바로 반영

  ![ec-markup dev/qa 젠킨스배포](../img/doc/build3.jpg "")
  ![ec-markup dev/qa 젠킨스배포](../img/doc/build4.jpg "")


## STG/운영에 자원(css/img) 배포

  1. 빌드 전 슬랙에 공지하고 진행
  2. 00_Lib 클릭
  3. 0201_ec-markup-MasterBranch-BuildAndDeploy 에서 빌드(파란색 네모)
  4. BUILD_TARGET 'all'로 설정하여 빌드


  ![ec-markup dev/qa 젠킨스배포](../img/doc/build3.jpg "")
  ![ec-markup dev/qa 젠킨스배포](../img/doc/build5.jpg "")
