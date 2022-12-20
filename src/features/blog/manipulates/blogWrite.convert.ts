export function refineBlogWriteParams(raw: Record<string, string>) {
  return {
    editId: isFinite(Number(raw.edit)) ? Number(raw.edit) : 0,
    isPrivateMode: raw.isPrivate === 'true' ? true : false,
  };
}
