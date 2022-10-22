import { PreparedStatement as PS } from 'pg-promise';
class UserRepository {
  db: any;
  pgp: any;
  table: any;
  constructor(db: any, pgp: any) {
    this.db = db;
    this.pgp = pgp;
    this.table = new pgp.helpers.TableName({ table: 'user', schema: 'ticketing' });
  }

  async findByRegion(region: string) {
    const findUser = new PS({
      name: 'find-user-byRegion',
      text: `${this.pgp.as.format(
        `SELECT id_user username password region rule FROM $1`,
        this.table
      )} WHERE region = $1`,
      values: [region],
    });
    return this.db.oneOrNone(findUser);
  }
}
export default UserRepository;
