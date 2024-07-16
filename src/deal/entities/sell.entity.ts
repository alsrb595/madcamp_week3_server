// import { Photo } from "src/photo/entities/photo.entity";
// import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

// @Entity()
// export class Sell{
//     @PrimaryColumn()
//     email: string;

//     @ManyToMany(() => Photo)
//     @JoinTable({
//         name: 'sell_photos', // 조인 테이블 이름 설정
//         joinColumn: { name: 'sellEmail', referencedColumnName: 'email' },
//         inverseJoinColumn: { name: 'photoId', referencedColumnName: 'photo_id' }
//     })
//     sellPhotos: Photo[];


//     @Column('simple-array')
//     price: number[];

//     @Column('simple-array')
//     is_delivered: boolean[];
// }