import { Posts } from "src/community/entities/post.entity";
import { Photo } from "src/photo/entities/photo.entity";
import { Cart } from "src/wishlist/entities/wishlist.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryColumn()
    email: string;

    @Column()
    googleId: string;

    @Column()
    displayName: string

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];

    // @OneToOne(() => cart => cart.user) // () => Cart: 이 부분은 관계의 반대편에 있는 엔티티를 참조합니다. 이 경우, User 엔티티와 Cart 엔티티 간의 일대일 관계를 정의합니다. 즉, User 엔티티가 Cart 엔티티와 연결됨을 나타냅니다.
    // // // cart => cart.user: 이 부분은 관계를 설정할 때 참조할 속성을 지정합니다. 즉, Cart 엔티티 내에서 user 속성을 통해 User 엔티티와의 관계를 설정함을 나타냅니다. 이는 양방향 관계를 설정하기 위해 사용됩니다.
    // cart: Cart;

    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];
}