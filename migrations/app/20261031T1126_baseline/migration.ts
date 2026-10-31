#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/700ecaf90652771aa75b9c02d6cf767aaf6b95fbdfe3c8b848c468ef0b5d3198/contract';
import endContract from '../../snapshots/700ecaf90652771aa75b9c02d6cf767aaf6b95fbdfe3c8b848c468ef0b5d3198/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'board',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('imageFullUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('imageId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('imageLinkHtml', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('imageThumbUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('imageUserName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('orgId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'card',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('listId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('order', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'list',
        columns: [
          col('boardId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('order', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'card',
        index: 'card_listId_idx_0033d367',
        columns: ['listId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'list',
        index: 'list_boardId_idx_74a7b59d',
        columns: ['boardId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'card',
        foreignKey: {
          name: 'card_listId_fkey',
          columns: ['listId'],
          references: { schema: 'public', table: 'list', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'list',
        foreignKey: {
          name: 'list_boardId_fkey',
          columns: ['boardId'],
          references: { schema: 'public', table: 'board', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
