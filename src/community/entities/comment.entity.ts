import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./post.entity";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column()
    post_id: number;

    @ManyToOne(() => Posts, post => post.comments)
    @JoinColumn({name: "post_id", referencedColumnName: "post_id"})
    post: Posts;

    @Column()
    displayName: string;
    
    @Column()
    email: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "email", referencedColumnName: "email"})
    user: User

    @Column()
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}