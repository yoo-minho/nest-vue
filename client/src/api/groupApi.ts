import { Group, GroupTag, Link } from '../types/common';
import axiosClient from './base';
import { AxiosError } from 'axios';

export default {
  async findAll(): Promise<Group[]> {
    try {
      const { data } = await axiosClient.get('group');
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async findByTag(tag: string): Promise<Group[]> {
    try {
      const { data } = await axiosClient.get('group', { params: { tag } });
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async findAllTag(): Promise<GroupTag[]> {
    try {
      const { data } = await axiosClient.get('group/tags');
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async findById(domain: string): Promise<Group> {
    try {
      const { data } = await axiosClient.get(`group/${domain}`);
      return data;
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  // async updateCount(id: string, { today, total }: GroupCount) {
  //   const groups = await this.findAll();
  //   const idx = groups.findIndex((group) => group.id === id);
  //   groups[idx] = { ...groups[idx], today, total };
  //   localStorage.setItem(tableName, JSON.stringify(groups));
  // },
  async create(group: Group, links: Link[]) {
    const { domain, title, description, tags } = group;
    try {
      await axiosClient.post('group', { domain, title, description, links, tags });
    } catch (axiosError) {
      const err = axiosError as AxiosError<{ res: { message: string } }>;
      const message = err.response?.data?.res?.message || err.message;
      throw new Error(message);
    }
  },
};
