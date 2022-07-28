interface IClient<T> {
  execute(): Promise<T>;
}

export default IClient;
