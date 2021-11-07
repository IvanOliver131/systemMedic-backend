import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PacientMedicine from './PacientMedicine';

@Entity('pacients')
class Pacient {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    bairro: string;

    @Column()
    cpf: string;

    @Column()
    cartaoSUS_RG: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => PacientMedicine, pacientMedicine => pacientMedicine.pacients, { eager: true })
    pacientMedicine: PacientMedicine[];
}

export default Pacient;