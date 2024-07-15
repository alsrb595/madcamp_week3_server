import { Datetime } from "aws-sdk/clients/costoptimizationhub";
import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class Posts{
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column({default: 'default_value'})
    displayName: string;

    @Column()
    post_by: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column('simple-array')
    urls: string[];

    @OneToMany(() => Comment, comment => comment.post)
    @JoinColumn({name: 'post_id', referencedColumnName: 'post_id'})
    comments: Comment[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'post_by', referencedColumnName: 'email' })
    user: User
}