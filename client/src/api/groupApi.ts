import { Group } from '../types/common';
import GroupTagApi from './groupTagApi';

const tableName = 'group';

export default {
  async findAll(): Promise<Group[]> {
    const item = localStorage.getItem(tableName) || '[]';
    return JSON.parse(item);
  },
  async findByTag(tag: string): Promise<Group[]> {
    const groups = await this.findAll();
    return groups.filter((group) => group.tags.includes(tag));
  },
  async findById(id: string): Promise<Group> {
    const groups = await this.findAll();
    return groups.filter((groupData: Group) => groupData.id === id)[0];
  },
  async create(group: Group) {
    const groups = await this.findAll();
    const index = groups.length;
    localStorage.setItem(
      tableName,
      JSON.stringify([
        {
          ...group,
          index,
        },
        ...groups,
      ]),
    );
    group.tags?.forEach((tag) => {
      GroupTagApi.create({
        index: -1,
        groupId: group.id,
        name: tag,
      });
    });
    return index;
  },
};
