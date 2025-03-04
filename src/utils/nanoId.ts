export const nanoId = async (size: number) => {
  const { nanoid } = await import("nanoid");
  return nanoid(size);
};

export const simpleId = async (size: number) => {
  const { customAlphabet } = await import("nanoid");
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
  return customAlphabet(alphabet, size)();
};
