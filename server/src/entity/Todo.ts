import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
// import { Task } from "./Task";

@ObjectType()
@InputType("TodoInput")
@Entity()
export class Todo extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { default: "New todo", nullable: true })
  title: string;
}
