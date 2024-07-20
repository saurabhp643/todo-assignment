import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column()
  title!: string; 

  @Column()
  description!: string; 

  @Column({ default: false })
  status!: boolean; 

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date; 

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date; 
}
