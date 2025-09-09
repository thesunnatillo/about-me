import { GeneralEntity } from "src/utils/general.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity({ name: "posts" })
export class PostsEntity extends GeneralEntity {

    @Column("varchar", { name: "title", length: 25 })
    title: string;

    @Column("text", { name: "article" })
    article: string;

    @ManyToOne(() => UsersEntity, entity => entity.posts)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "id"
    })
    user: UsersEntity;

}