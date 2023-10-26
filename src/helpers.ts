type GetUser<T> = (id: number) => Promise<T>;

export const getUser = async <T>(fun: GetUser<T>) =>
  await fun(Math.ceil(Math.random() * 5));