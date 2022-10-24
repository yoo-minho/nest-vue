Nest.js 모듈 만들기

```shell
nest g res group
```

초기 데이터 만들기

```sql
insert into "User" values ('dellose', 'dellose@naver.com', '유민호');
```

```shell
lt --port 5000 --subdomain onebylog
```

PWA 만들기

- https://docs.google.com/presentation/d/1h2Ht8YB3yqXxLAdRFzmecOwbBAvYZH8mJljo-tNEv7w/edit?usp=sharing
- https://www.remove.bg/ko/upload
- https://realfavicongenerator.net/

지우기 개어려움

delete from "Group" where domain like 'velopert%';
delete from "Link" where url like '%velopert%' or url like '%gttEItaP3MGrYKr2uBVYg%';
delete from "LinksOnGroups" where "groupId" in (18,16,19,17);
delete from "Post" where "linkId" in (27, 28, 29);
delete from "Views" where "groupDomain" like 'velopert%';
delete from "TagsOnGroups" where "groupId" in (18,16,19,17);
