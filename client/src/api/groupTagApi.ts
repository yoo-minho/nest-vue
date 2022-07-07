import { GroupTag } from '../types/common';

const tableName = 'groupTag';

export default {
  async findAll(): Promise<GroupTag[]> {
    const item = localStorage.getItem(tableName) || '[]';
    console.log({ item });
    return JSON.parse(item);
  },
  async create(groupTag: GroupTag) {
    const groupTags = await this.findAll();
    const index = groupTags.length;
    localStorage.setItem(
      tableName,
      JSON.stringify([
        {
          ...groupTag,
          index,
        },
        ...groupTags,
      ]),
    );
    return index;
  },
};
