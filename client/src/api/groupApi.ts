import { Group, GroupCount } from '../types/common';
import GroupTagApi from './groupTagApi';
import axiosClient from './base';
import { AxiosError } from 'axios';

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
  async updateCount(id: string, { today, total }: GroupCount) {
    const groups = await this.findAll();
    const idx = groups.findIndex((group) => group.id === id);
    groups[idx] = { ...groups[idx], today, total };
    localStorage.setItem(tableName, JSON.stringify(groups));
  },
  async create(group: Group) {
    const { id: domain, title, description, tags, links } = group;
    try {
      await axiosClient.post('group', { domain, title, description, links, tags });
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
    return;

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
