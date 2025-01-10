export class PagesConfig {
  home = '/';
  room = '/room';

  getRoom = (id: string) => {
    return `${this.room}/${id}`;
  };
}
