import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/graphql/http.module';

@Module({
  imports: [DatabaseModule, HttpModule],

  controllers: [],

  providers: [],
})
export class AppModule { }
