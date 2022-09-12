import {Column, Entity, PrimaryColumn} from "typeorm";
import * as interfaces from '../interfaces';

@Entity()
export class Test implements interfaces.Test {
    @PrimaryColumn()
    id!: number;

    @Column()
    content!: string;
}
