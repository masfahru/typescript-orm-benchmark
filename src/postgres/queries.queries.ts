/** Types generated for queries found in "src/postgres/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserById' parameters type */
export interface IFindUserByIdParams {
  id?: number | null | void;
}

/** 'FindUserById' return type */
export interface IFindUserByIdResult {
  created_at: Date;
  deleted_at: Date | null;
  email: string;
  id: number;
  name: string;
  password: string;
  updated_at: Date;
  username: string;
}

/** 'FindUserById' query type */
export interface IFindUserByIdQuery {
  params: IFindUserByIdParams;
  result: IFindUserByIdResult;
}

const findUserByIdIR: any = {
  usedParamSet: { id: true },
  params: [
    {
      name: 'id',
      required: false,
      transform: { type: 'scalar' },
      locs: [{ a: 31, b: 33 }],
    },
  ],
  statement: 'SELECT * FROM users WHERE id = :id',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE id = :id
 * ```
 */
export const findUserById = new PreparedQuery<
  IFindUserByIdParams,
  IFindUserByIdResult
>(findUserByIdIR);
