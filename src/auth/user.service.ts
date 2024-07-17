import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//TypeOrm과 NestJs 를 통합하기 위해 InjectRepository사용, 특정 엔티티에 대한 레포지토리를 주입하는 데 사용함
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserGetDto } from "./dto/user.dto";
import { UserUpdateDto } from "./dto/userUpdate.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, //User 엔티티에 대한 레포지토리 생성, TypeOrm이 제공
        //Repository도 하나의 클래스이며 데이터베이스 작업을 수행하기 위한 다양한 메소드를 포함하고 있다. 
        /* 주요 메서드
    find: 여러 레코드를 조회합니다.
    findOne: 단일 레코드를 조회합니다.
    save: 엔티티를 저장합니다. 기존 엔티티를 업데이트하거나 새로운 엔티티를 삽입합니다.
    remove: 엔티티를 삭제합니다.
    createQueryBuilder: 쿼리 빌더를 사용하여 복잡한 쿼리를 작성합니다.*/
    ) {}


    // async 함수의 결과로 항상 Promise를 반환하는데 그 때 반환 값이 User 객체거나 undefined를 반환하게 됨
    async findOneByGoogleId(googleId: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { googleId } });
    }
    
    //Partial<User> createDTO 생각하면 되는듯
    //Partial<User>: User 엔티티의 일부 필드를 가진 객체를 매개변수로 받음. User 타임의 필드들을 선택적으로 가질 수도 있음을 의미
    //
    //Promise<User>를 통해 저장된 User객체를 반환한다. 
    async create(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        // user 객체를 기반으로 새로운 User 엔티티 인스턴스를 생성
        return this.userRepository.save(newUser);
    }

    async getUser(email: string): Promise<UserGetDto>{
        const user = await this.userRepository.findOne({where: {email: email}, relations: ["photos", "posts"]})
        return{
            email: user.email,
            googleId: user.googleId,
            displayName: user.displayName,
            photos: user.photos,
            posts: user.posts
        } 
    }

    async updateUser(email: string, updateData: UserUpdateDto): Promise<User> {
        const user = await this.userRepository.findOneBy({email})
        const updateUser = this.userRepository.merge(user, updateData)
        const result = this.userRepository.save(updateUser);
        return result;
    }
}
//this는 UserService 클래스의 현재 인스턴스를 가리킵니다.
