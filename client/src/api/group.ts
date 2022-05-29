import { Group } from '../types/common';

export default {
  async findAll(): Promise<Group[]> {
    const item = localStorage.getItem('groupTable') || '[]';
    const groupTable = JSON.parse(item);
    return groupTable;
  },
  async create(groupData: Group) {
    const groupTable = await this.findAll();
    const index = groupTable.length;
    localStorage.setItem(
      'groupTable',
      JSON.stringify([
        {
          ...groupData,
          index,
        },
        ...groupTable,
      ]),
    );
    return index;
  },
};
