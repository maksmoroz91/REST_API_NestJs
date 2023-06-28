import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";

@Entity({name: 'roles'})
export class RolesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    value: string;

    @ManyToMany(() => UserEntity, { cascade: true })
    @JoinTable()
    users: UserEntity[];
}
