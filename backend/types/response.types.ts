import { Response } from 'express';

interface Json {
	success: boolean;
	data: {
		[key: string]: any;
	} | null;
	error:
		| {
				[key: string]: any;
		  }[]
		| {
				[key: string]: any;
		  }
		| string[]
		| string
		| null;
}

type Send<T = Response> = (body?: Json) => T;

export interface CustomResponse extends Response {
	json: Send<this>;
}
