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
