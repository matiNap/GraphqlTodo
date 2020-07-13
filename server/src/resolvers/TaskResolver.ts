import {
  Mutation,
  Arg,
  Query,
  Resolver,
  InputType,
  Field,
  Int,
} from "type-graphql";
import { Task } from "../entity/Task";

@InputType()
export class GetTaskInput {
  @Field(() => Int)
  todoId: number;
}

@InputType()
class UpdateTaskInput {
  @Field(() => String)
  content: string;

  @Field(() => Boolean)
  done: boolean;
}

@Resolver(Task)
export class TaskResolver {
  @Mutation(() => Task)
  async createTask(
    @Arg("todoId", () => Int) todoId: number,
    @Arg("content", () => String) content: string,
    @Arg("done", () => Boolean) done: boolean
  ) {
    const task = await Task.create({ todoId, content, done }).save();

    return task;
  }

  @Mutation(() => Boolean)
  async updateTask(
    @Arg("id", () => Int) id: number,
    @Arg("update", () => UpdateTaskInput) update: UpdateTaskInput
  ) {
    try {
      await Task.update({ id }, update);

      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteTask(@Arg("id", () => Int) id: number) {
    try {
      await Task.delete({ id });

      return true;
    } catch (e) {
      return false;
    }
  }

  @Query(() => [Task])
  async fetchTasks(@Arg("todoId", () => Int) todoId: number) {
    const tasks = await Task.find({ todoId });

    return tasks;
  }

  @Query(() => [Task])
  tasks() {
    return Task.find();
  }
}
