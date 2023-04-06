```sql
--스크랩에서 꼬였을때
select * from "Group" -- 14	"dangma"
select * from "Link" where id in (select "linkId" from "LinksOnGroups" where "groupId" = 14) -- 14	"dangma"
select "linkId" from "LinksOnGroups" where "groupId" = 14 -- 14	"dangma"
update "Group" set "lastPostCreatedAt" = null where id = 14; -- 14	"dangma"
update "Link" set "lastPostCreatedAt" = null, "scrapAt" = null where id = 41;

select * from "Link" where id in (
	select "linkId" from "LinksOnGroups" where "groupId" in (
		select id from "Group" where title LIKE '%무신사%'));
update "Group" set "lastPostCreatedAt" = null where id = 28;
update "Link" set "lastPostCreatedAt" = null, "scrapAt" = null where id in (75, 74);
```

```sql
--최신 포스트일자 갱신 이슈 찾기 위해
update "Group" set "lastPostCreatedAt" = "calculateAt"
from
(
	select * from (
		select *,
			(select max("createdAt") from "Post" where "linkId" in (select "linkId" from "LinksOnGroups" where "groupId" = "Group".id)) "calculateAt"
		from "Group"
	) t
	where "lastPostCreatedAt" != "calculateAt"
) t2
where t2.id = "Group".id;

```

```sql
--주간게시물 갱신 뿅뿅
update "Group" set "weeklyAvgPost" = t2.round
FROM (
	select
		"Group"."domain",
		(with
			_link as (select "linkId" from "LinksOnGroups" where "groupId" = "Group"."id")
		select coalesce(round(avg(count), 2), 0) round from (
			select to_char("createdAt", 'WW'), count(1)
			from "Post" where "linkId" IN (select "linkId" from _link)
			and "createdAt" > now() - interval '3 month'
			group by to_char("createdAt", 'WW')
		) t)
	from "Group"
	order by round desc
) t2
where "Group"."domain" = t2."domain";
```
