import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePacientMedicineTable1630542517015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'pacientsMedicine',
            columns: [
                {
                    name: 'id_pacient',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'id_medicine',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'qtd_medicine',
                    type: 'integer',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },

            ],
            foreignKeys: [
                {
                    name: 'FKPacient',
                    referencedTableName: 'pacients',
                    referencedColumnNames: ['id'],
                    columnNames: ['id_pacient'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                {
                    name: 'FKMedicine',
                    referencedTableName: 'medicines',
                    referencedColumnNames: ['id'],
                    columnNames: ['id_medicine'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pacientsMedicine');
    }

}
