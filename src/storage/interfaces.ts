import {Test} from "../interfaces";

export interface GetTestById {
    id: number;
}

export interface PostTest extends Test{}

export interface PutTest extends Test{}

export interface DeleteTestById {
    id: number;
}

export interface Response {
    test?: Test;
    error?: string;
}