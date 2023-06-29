import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "../../roles/entities/role.entity";

@Entity({name: "users"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: "roles_entity_id" })
    role: RoleEntity;
}
