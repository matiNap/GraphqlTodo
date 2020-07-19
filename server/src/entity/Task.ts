import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: true })
  @Column()
  todoId: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column("boolean", { default: false })
  done: boolean;
}
