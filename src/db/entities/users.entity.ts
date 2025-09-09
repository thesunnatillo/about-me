import { RoleType } from "src/utils/enums";
import { GeneralEntity } from "src/utils/general.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { PostsEntity } from "./posts.entity";

@Entity({ name: "users" })
export class UsersEntity extends GeneralEntity {

    @Column("varchar", { name: "fn", length: 55 })
    fn: string;

    @Column("varchar", { name: "ln", length: 55 })
    ln: string;

    @Column("varchar", { name: "login", length: 19 })
    login: string;

    @Column("varchar", { name: "password" })
    password: string;;

    @Column("varchar", { name: "role" })
    role: RoleType;

    @OneToMany(() => PostsEntity, entity => entity.user)
    posts: PostsEntity[];

}