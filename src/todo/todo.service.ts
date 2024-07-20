import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo-entity';
import { CreateTodoDto } from './dto/create-dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { UpdateTodoDto } from './dto/update-dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) { }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async findAll(query: QueryTodoDto): Promise<{ data: Todo[], total: number }> {
    const { title, status, page = 0, limit = 10, sortBy = 'createdAt', order = 'ASC' } = query;

    // Ensure that sortBy property is valid and exists in Todo entity
    const validSortBy = ['createdAt', 'updatedAt', 'title', 'status'].includes(sortBy) ? sortBy : 'createdAt';

    const [data, total] = await this.todoRepository.findAndCount({
      where: {
        ...(title && { title }),
        ...(status !== undefined && { status }),
      },
      take: limit,
      skip: page * limit,
      order: {
        [validSortBy]: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      },
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.preload({
      id,
      ...updateTodoDto,
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<string> {
    try {
      const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
    return "Succefully Deleted";
    } catch (error) {
      throw new BadRequestException("error while deleting!!")
    }
  }


}
