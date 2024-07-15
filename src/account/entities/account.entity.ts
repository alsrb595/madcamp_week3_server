import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity()
export class UserAccount{
    @PrimaryColumn()
    email: string;

    @OneToOne(() => User)
    @JoinColumn({name: 'email', referencedColumnName: 'email'})
    user: User;
    
    @Column()
    username: string;

    @Column()
    bank: string;

    @Column()
    account: string;
}