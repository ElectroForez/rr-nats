import {Column, Entity, PrimaryColumn} from "typeorm";
import * as interfaces from "../storage/interfaces";

@Entity()
export class Test implements interfaces.Test {
    @PrimaryColumn()
    id!: number;

    @Column()
    content!: string;
}
