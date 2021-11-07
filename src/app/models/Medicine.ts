import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import PacientMedicine from './PacientMedicine';

@Entity('medicines')
class Medicine {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    estoque: number;

    @Column()
    type: boolean;

    @Column()
    fornecedor: string;

    @Column()
    nota_fiscal: string;

    @Column()
    valor: number;

    @Column()
    descricao: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => PacientMedicine, pacientMedicine => pacientMedicine.medicines)
    pacientMedicine: PacientMedicine[];
}

export default Medicine;

