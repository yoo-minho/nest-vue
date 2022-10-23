import { Group, Link } from '../types/common';
import axiosClient, { useAxiosGet } from './base';
import { AxiosError } from 'axios';

export default {
  async findAll() {
    try {
      return await useAxiosGet('group');
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async count() {
    try {
      return await useAxiosGet('group/counts');
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async findByTag(tag: string) {
    try {
      return await useAxiosGet('group', { params: { tag } });
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async findAllTag() {
    try {
      return await useAxiosGet('group/tags');
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async findById(domain: string) {
    try {
      return await useAxiosGet(`group/${domain}`);
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
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
  async updateLastPostCreateAt(groupId?: number): Promise<{ lastPostCreatedAt: Date }> {
    if (!groupId) throw new Error('No Group Id');
    try {
      const { data } = await axiosClient.patch(`group/last-post-create-at`, { groupId });
      return data;
    } catch (axiosError) {
      const err = axiosError as AxiosError<{ res: { message: string } }>;
      const message = err.response?.data?.res?.message || err.message;
      throw new Error(message);
    }
  },
};
