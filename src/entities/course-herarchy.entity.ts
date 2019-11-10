import {
    Entity,
    Tree,
    Column,
    PrimaryGeneratedColumn,
    TreeChildren,
    TreeParent,
    TreeLevelColumn
} from "typeorm";

@Entity()
@Tree("closure-table")
export class CourseHerarchy {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @TreeChildren()
    public children: CourseHerarchy[];

    @TreeParent()
    public parent: CourseHerarchy;
}
