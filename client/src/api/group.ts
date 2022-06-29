import { Group } from '../types/common';

export default {
  async findAll(): Promise<Group[]> {
    const item = localStorage.getItem('groupTable') || '[]';
    const groupTable = JSON.parse(item);
    return groupTable;
  },
  async findById(id: string): Promise<Group> {
    const groupTable = await this.findAll();
    return groupTable.filter((groupData: Group) => groupData.id === id)[0];
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
