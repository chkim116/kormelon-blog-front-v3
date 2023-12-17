'use server';
import 'server-only';

import { revalidatePath, revalidateTag } from 'next/cache';
import { toArray } from 'safers';

export const actSharedRevalidatePath = async (path: string) => {
  revalidatePath(path);

  return Promise.resolve();
};

export const actSharedRevalidateTags = async (tags: string | string[]) => {
  const arr = toArray(tags);

  return new Promise((resolve) => {
    arr.forEach((tag) => {
      revalidateTag(tag);
    });

    resolve(true);
  });
};
