interface ICommand<TState> {
  execute(state: TState): Promise<TState>;
}

export default ICommand;
