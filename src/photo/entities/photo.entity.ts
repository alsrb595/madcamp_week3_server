import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo{
    @PrimaryGeneratedColumn()
    photo_id: number;
    
    @Column()
    filename: string;
    
    @Column()
    pictured_by: string;
    
    
    @Column()
    url: string;
    
    @Column()
    mimetype: string;
    
    @Column()
    price: number;
    
    @Column()
    description: string;
    
    @Column('simple-array')
    tags: string[];
    
    @Column()
    location: string;
    
    @ManyToOne(() => User, user => user.photos)
    @JoinColumn({name: 'pictured_by', referencedColumnName: 'email'})
    user: User;
}