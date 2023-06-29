import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'requests'})
export class RequestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({default: "Active"})
    status: string;

    @Column({ nullable: false })
    message: string;

    @Column({ nullable: true })
    comment: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date();
    }
}
