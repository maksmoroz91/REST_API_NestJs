import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";

@Entity({name: "roles"})
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    value: string;

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[]
}
