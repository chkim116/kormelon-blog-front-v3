'use server';
import 'server-only';

import { revalidatePath, revalidateTag } from 'next/cache';
import { toArray } from 'safers';

export const actSharedRevalidatePath = async (path: string) => {
  revalidatePath(path);
};

export const actSharedRevalidateTags = async (tags: string | string[]) => {
  const arr = toArray(tags);

  arr.forEach((tag) => {
    revalidateTag(tag);
  });
};
