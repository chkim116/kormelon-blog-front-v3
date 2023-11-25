'use server';
import 'server-only';

import { revalidatePath, revalidateTag } from 'next/cache';

export const actSharedRevalidatePath = async (path: string) => {
  revalidatePath(path);
};

export const actSharedRevalidateTags = async (tags: string) => {
  revalidateTag(tags);
};
