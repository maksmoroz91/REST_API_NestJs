import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesEntity } from "../../roles/entities/roles.entity";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @ManyToMany(() => RolesEntity, { cascade: true })
    @JoinTable()
    roles: RolesEntity[];
}
