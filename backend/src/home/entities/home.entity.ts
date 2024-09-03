import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street_address: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  sqft: number;

  @Column()
  beds: number;

  @Column()
  baths: number;

  @Column()
  list_price: number;

  @ManyToMany(() => User, user => user.homes)
  users: User[];
}