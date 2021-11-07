import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMedicineTable1630540665482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'medicines',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'estoque',
                    type: 'integer',
                },
                {
                    name: 'type',
                    type: 'boolean',
                },
                {
                    name: 'fornecedor',
                    type: 'varchar',
                },
                {
                    name: 'nota_fiscal',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'valor',
                    type: 'real',
                },
                {
                    name: 'descricao',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                // {
                //     name: 'deleted_at',
                //     type: 'timestamp',
                //     isNullable: true
                // }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pacients');
    }

}
