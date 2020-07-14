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

  @Mutation(() => Task)
  async updateTask(
    @Arg("id", () => Int) id: number,
    @Arg("update", () => UpdateTaskInput) update: UpdateTaskInput
  ) {
    try {
      await Task.update({ id }, update);
      const updated = await Task.findOne({ id });
      return updated;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Task)
  async deleteTask(@Arg("id", () => Int) id: number) {
    const deleted = await Task.findOne({ id });
    await Task.delete({ id });

    return deleted;
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
