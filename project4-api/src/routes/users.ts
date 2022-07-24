import { game } from '@prisma/client';
import { Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import { prismaClient } from '../prisma';

const game = Type.Object({
	
	Moves: Type.Number(),
	totaltime: Type.Number(),
	mistaken : Type.Number(),
});



export default async function (server: FastifyInstance) {
	
	// addAuthorization(server);
 
	 server.route({
		 method:'POST',
		 url: '/play',
		 schema: {
			 summary: 'play',
			 tags: ['play'],
			 body: game,
		 },
		 
		 handler: async (request, reply) => {
			 const want= request.body as game
			 await prismaClient.game.create({
				 data: want,
			 });
 
			 return prismaClient.game.findMany();
		 },
	 });
 
	
	server.route({
		method: 'GET',
		url: '/play',
		schema: {
			summary: 'play',
			tags: ['play'],

			response: {
				'2xx': Type.Array(game),
			},
		},
		handler: async (request, reply) => {
			return await prismaClient.game.findMany();
		},
	});
}
