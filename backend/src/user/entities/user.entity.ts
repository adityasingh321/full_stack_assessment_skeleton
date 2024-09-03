import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Home } from '../../home/entities/home.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @ManyToMany(() => Home, home => home.users)
  @JoinTable({
    name: 'user_home_map',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'home_id', referencedColumnName: 'id' },
  })
  homes: Home[];
}