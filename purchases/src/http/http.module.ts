import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';

import { DatabaseModule } from '../database/database.module';

import { ProductsService } from '../services/products.service';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesService } from '../services/purchases.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersService } from '../services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    //services
    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule { }
