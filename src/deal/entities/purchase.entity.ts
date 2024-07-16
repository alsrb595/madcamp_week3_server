import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Photo } from "src/photo/entities/photo.entity";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Purchase {
    @PrimaryColumn()
    photo_id: number;

    @PrimaryColumn()
    consumer_email: string;

    @ManyToOne(() => Photo)
    @JoinColumn({ name: 'photo_id', referencedColumnName: 'photo_id' })
    photo: Photo;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'consumer_email', referencedColumnName: 'email' })
    consumer: User;

    @Column()
    is_delivered: boolean;
}
