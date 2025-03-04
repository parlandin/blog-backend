export const nanoId = async (size: number) => {
  const { nanoid } = await import("nanoid");
  return nanoid(size);
};
