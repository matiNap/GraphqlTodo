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

  @Mutation(() => Todo)
  async updateTodo(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string
  ) {
    await Todo.update({ id }, { title });
    const updated = await Todo.findOne({ id });
    return updated;
  }

  @Mutation(() => Todo)
  async deleteTodo(@Arg("id", () => Int) id: number) {
    const deleted = await Todo.findOne({ id });
    await Todo.delete({ id });
    return deleted;
  }

  @Mutation(() => Boolean)
  async cleanTodos() {
    try {
      await Todo.clear();
      await Task.clear();

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
