import { play } from '@prisma/client';
import { Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import { prismaClient } from '../prisma';

const play = Type.Object({
	
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
			 body: play,
		 },
		 
		 handler: async (request, reply) => {
			 const want= request.body as play
			 await prismaClient.play.create({
				 data: want,
			 });
 
			 return prismaClient.play.findMany();
		 },
	 });
 
	
	server.route({
		method: 'GET',
		url: '/play',
		schema: {
			summary: 'play',
			tags: ['play'],

			response: {
				'2xx': Type.Array(play),
			},
		},
		handler: async (request, reply) => {
			return await prismaClient.play.findMany();
		},
	});
}

