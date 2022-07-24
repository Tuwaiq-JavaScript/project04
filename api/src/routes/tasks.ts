import { Task } from '@prisma/client';
import { Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import { prismaClient } from '../prisma';

const Task = Type.Object({
	play_id: Type.String(),
	name: Type.String(),
	startingTime: Type.String(),
  time : Type.String(),
  chances : Type.String(),
});

export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/tasks',
		schema: {
			summary: 'Upsert task',
			tags: ['Tasks'],
			body: Task,
		},
		handler: async (request, reply) => {
			const task = request.body as Task;
			return await prismaClient.task.create({
				data: {
					...task,
				},
			});
		},
	});


	/// Get all contacts or search by name
	server.route({
		method: 'GET',
		url: '/tasks',
		schema: {
			summary: 'Gets all tasks',
			tags: ['Tasks'],

			response: {
				'2xx': Type.Array(Task),
			},
		},
		handler: async (request, reply) => {
			return await prismaClient.task.findMany();
		},
	});
}
