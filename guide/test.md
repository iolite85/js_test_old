## 목차
- [add](#add)
- [branch](#branch)
- [checkout](#checkout)
- [cherry-pick](#cherry-pick)
- [clone](#clone)
- [commit](#commit)
- [config](#config)
- [diff](#diff)
- [merge](#merge)
- [pull](#pull)
- [push](#push)
- [rebase](#rebase)
- [reflog](#reflog)
- [reset](#reset)
- [stash](#stash)
- [status](#status)


## add
**파일 추가**
``` bash
$ git add .
$ git add *.jsp
$ git add README.TXT
```

## branch
**브랜치 생성**
``` bash
$ git branch <branch name>  # 현재 브랜치 기반의 신규 브랜치를 생성한다.
```

**브랜치 확인**
``` bash
$ git branch # 로컬 브랜치 목록 보기
$ git branch -r   # 리모트 브랜치 목록 보기
```

**브랜치 삭제**
``` bash
$ git branch -d <branch name>
$ git branch -D <branch name>  # 브랜치 강제삭제(작업 후 merge 안 한 브랜치를 삭제할 때 사용한다.)
```

**브랜치명 변경**
``` bash
$ git branch -m <branch name> <new branch name>
```

## checkout
**브랜치 이동**
``` bash
$ git checkout <branch name>  # 만약 브랜치가 로컬에 존재하지 않고 리모트에만 존재하면 리모트 브랜치를 체크아웃한다.
```

**브랜치 생성하면서 체크아웃**
``` bash
$ git checkout -b <branch name>
```

**브랜치 추적**<br>
추적 중인 브랜치를 업스트림 브랜치라고 하는데, 업스트림 브랜치가 설정되어 있으면 pull이나 push 사용 시 리모트의 저장소명과 브랜치명을 생략할 수 있다. <br>
``` bash
$ git checkout -t origin/<branch name>  # git 1.6.2 버전 이상
$ git checkout -b <branch name> origin/<branch name>  # 리모트 브랜치와 다른 이름으로 브랜치를 만들 때 사용한다.
```
- 해당 브랜치 이동 후 git pull / git push 실행

> ex)
> git pull origin feature/MOCKUP => git pull

**브랜치 되돌리기**<br>
신규 생성 파일을 제외한 현재 경로의 모든 파일의 되돌린다.(commit하지 않은 작업중인 파일 대상)
``` bash
$ git checkout -- .
$ git checkout HEAD .  
```

**파일복사**
- 다른 브랜치에 있는 파일을 가져온다.
- 반드시 작업하긴 전에 실행. 이 기능은 **머지가 아니기 때문에** 현재 브랜치의 수정 내역과는 관계 없이 **해당 파일의 내용으로 변경**된다.

``` bash
$ git checkout <branch name> <file path>
```

## cherry-pick
다른 브랜치에 있는 commit 하나만 리베이스
```bash
$ git cherry-pick <commit id>  # commit id를 반영하고 commit까지 실행
$ git cherry-pick -n <commit id>  # commit id를 반영하고 add까지만 실행, commit은 안함. 여러개의 커밋을 하나로 합쳐 반영할 때 사용한다.
```
> ex)
>
> $ git cherry-pick -n aaa123<br>
> $ git cherry-pick -n bbb123<br>
> $ git cherry-pick -n ccc123<br>
> $ git commit -m "cherry commit"

## clone
**저장소복제**<br>
현재 경로에 로컬 저장소가 될 디렉토리를 만들고 리모트 저장소의 데이터를 모두 받아온다.
```bash
$ git clone <repository url>  # 디렉토리명을 따로 명시하지 않으면 리모트 저장소의 이름과 동일하게 생성된다.
$ git clone <repository url> <directory name>
```

## commit
```bash
$ git commit -m "test commit"
```

**자동 스테이징**
```bash
$ git commit -a -m "test commit"  # add 없이 커밋할 수 있다. 신규파일X
```

**마지막 커밋 수정**
```bash
$ git commit --amend  # staged 상태인 파일이 있으면 마지막 커밋의 파일 변경 이력에 추가, 없으면 커밋 메시지만 수정(에디터 호출)
$ git commit -C HEAD --amend  # 마지막 커밋을 수정, 커밋 메시지는 재사용
$ git commit --amend -m "test commit"  # 마지막 커밋의 커밋 메시지만 수정
```

## config
**작업자의 이름/이메일 설정**
```bash
$ git config --global user.name "이름"
$ git config --global user.email "이메일"
```

**repository 인증정보 저장**
```bash
$ git config --global credential.helper store  # pull / push 실행 후 id, 비밀번호 입력
```

**기본 에디터 설정**
```bash
$ git config --global core.editor 에디터
```
> ex) 에디터 notepad++ 변경하기
>
> $ git config --global core.editor "'C:\Program Files\Notepad++\notepad++.exe' -m"

**설정확인**
```bash
$ git config --list
$ git config -l
```

## diff
**파일 변경내역 비교**
```bash
$ git diff <commit id> <commit id>  # 두 커밋을 비교하여 변경사항 출력
$ git diff <branch name> <commit id> -- *.jsp *.jsp > total.diff  # 브랜치와 커밋을 비교하여 변경된 모든 jsp파일의 내용을 total.diff 파일로 생성
```
> ex) develop 브랜치와 fa0a0c6을 비교하여 ..../jsp/account/join 폴더의 변경된 모든 jsp파일 내용을 total.diff 파일로 생성
>
> $ git diff develop fa0a0c6 -- ec-markup-common/src/main/resources/META-INF/resources/jsp/account/join/\*.jsp ec-markup-common/src/main/resources/META-INF/resources/jsp/account/join/\*.jsp > total.diff

[smaple diff](http://gitlab.hivelab.co.kr/kyungminyoo/ykm/blob/master/sample/total.diff)


## merge
**브랜치 병합**
```bash
$ git merge <branch name>  # 현재 브랜치에 지정한 브랜치를 머지
$ git merge --no-ff <branch name>  # 현재 브랜치에 fast-forward가 가능해도 무조건 머지 커밋을 생성하여 지정한 브랜치를 머지
```

## pull
**fetch 후 자동 머지**
```bash
$ git pull  # 리모트 브랜치에서 현재 브랜치로 pull. 리모트의 저장소명과 브랜치명 생략은 업스트림 브랜치가 설정되어 있을 경우에만 가능.
$ git pull origin <branch name>   
```

## push
**리모트 저장소에 업로드**
```bash
$ git push  # 리모트 브랜치에 현재 브랜치를 업로드
$ git push origin <branch name>  # origin에 지정한 브랜치 업로드. 리모트에 해당 브랜치가 없으면 새로 생성
```

**리모트 브랜치 삭제**
```bash
$ git push origin --delete <branch name>  # origin 저장소의 지정한 브랜치 삭제
$ git push origin :<branch name>  # --delete는 :으로 대체 가능
```

## rebase
**브랜치 머지**
```bash
$ git rebase <branch name>  # 현재 브랜치를 지정한 브랜치로 리베이스
```
- 브랜치의 변경사항을 순서대로 다른 브랜치에 적용하며 머지한다.
- 저장소의 커밋 로그와 이력을 한 줄로 정리한다.

**대화형 리베이스**
```bash
$ git rebase -i HEAD~3  # 헤드부터 HEAD~3까지의 커밋을 대화형으로 수정
```
- git 히스토리 단장 시 사용한다
  - 커밋 메시지를 여러 개 수정
  - 커밋 순서 바꾸기
  - 커밋 합치기
  - 커밋 분리하기 등
- 반드시 push하지 않은 커밋을 수정할때만 사용한다.

[히스토리 단장하기](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EB%8B%A8%EC%9E%A5%ED%95%98%EA%B8%B0#_changing_multiple)


## reflog
헤드 이동 이력을 출력
```bash
$ git reflog -5  # 마지막 다섯 번의 헤드 이동 이력을 역순으로 출력

  c93f291 (HEAD -> feature/MOCKUP, origin/feature/MOCKUP) HEAD@{0}: commit (merge): Merge branch '37888_module' into fe
  ture/MOCKUP
  fc4bb0e HEAD@{1}: pull: Fast-forward
  db2f3d3 HEAD@{2}: checkout: moving from 37888_module to feature/MOCKUP
  2ef62f1 (37888_module) HEAD@{3}: commit: [유경민][#37888][1차] M-web 25/27 모듈 마크업 디자인 QA
  530ef3d HEAD@{4}: checkout: moving from feature/MOCKUP to 37888_module
```

## reset
**Unstaging - staged 되돌리기(스테이징 취소)**
```bash
$ git reset HEAD <file name>  # add로 등록한 파일을 unstaged 상태로 바꾼다.
$ git reset HEAD  # 파일을 따로 명시하지 않으면 모든 스테이징을 취소한다.
```
**커밋 되돌리기**
```bash
$ git reset HEAD~2  # 헤드를 2회 이전 커밋으로 돌린다.
$ git reset --soft HEAD^^  # 헤드만 2회 이전 커밋으로 돌린다. ~숫자는 ^개수로 대체 가능
$ git reset --hard <commit id>  # 헤드를 커밋 id로 이동하고 모든 변경 사항을 버림
```
> **option**
> * --mixed : 명시하지 않을때의 기본값. 작업 상태는 그대로 두지만 인덱스는 리셋
> * --soft : 모든 로컬 변경사항을 유지
> * --hard : 모든 작업 상태 내 변경 사항을 버림

## stash
커밋이나 스테이지가 아닌 별도의 공간에 변경사항을 임시 저장, 저장한 내용을 다시 불러오는 명령어.

**스태시 생성**
```bash
$ git stash  # 스태시 생성. stash save와 같음
$ git stash save <stash name>  # 지정한 이름으로 스태시 생성
$ git stash -k  # --keep-index: staged 상태의 파일은 무시한다.
$ git stash -u  # --include-untracked: 신규 파일도 스태시로 저장
```

**스태시 확인**
```bash
$ git stash list  # 스태시 목록 확인
```

**스태시 적용**
```bash
$ git stash apply  # 마지막 스태시를 현재 브랜치에 적용
$ git stash apply stash@{1}  # 두번째 스태시를 브랜치에 적용
$ git stash apply --index  # staged 상태였던 파일을 다시 staged 상태로 적용
$ git stash pop  # 마지막 스태시를 적용하고 목록에서 삭제
```
- pop, apply 같은 방법으로 사용

**스태시 삭제**
```bash
$ git stash drop  # 마지막 스태시 삭제
$ git stash drop stash@{3}  # 네 번째 스태시 삭제
$ git stash clear  # 모든 스태시 삭제
```

**스태시를 적용한 새 브랜치 만들기**
```bash
$ git stash branch <branch name>  # 마지막 스태시를 적용한 새 브랜치 생성
$ git stash branch <branch name> stash@{1}  # 두 번째 스태시를 적용한 새 브랜치 생성
```

## status
**저장소 상태 확인**
```bash
$ git status
```

**[맨위로&uarr;&uarr;](#2)**
