import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Int,
  FieldResolver,
  Root,
} from "type-graphql";
import { Todo } from "../entity/Todo";
import { Task } from "../entity/Task";
// import { GetTaskInput } from "./TaskResolver";

@Resolver(Todo)
export class TodoResolver {
  @Mutation(() => Todo)
  async createTodo(@Arg("title", () => String) title: string) {
    const todo = await Todo.create({ title }).save();

    return todo;
  }

  @Mutation(() => Boolean)
  async updateTodo(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string
  ) {
    try {
      await Todo.update({ id }, { title });
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg("id", () => Int) id: number) {
    try {
      await Todo.delete({ id });
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async cleanTodos() {
    try {
      await Todo.clear();

      return true;
    } catch (e) {
      return false;
    }
  }

  @FieldResolver(() => [Task])
  tasks(@Root() todo: Todo) {
    console.log(todo);
    return Task.find({ todoId: todo.id });
  }

  @Query(() => [Todo])
  todos() {
    return Todo.find();
  }
}
