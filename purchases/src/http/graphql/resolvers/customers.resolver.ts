import { UseGuards } from '@nestjs/common';

import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';

import { Customer } from '../models/customer';
import { AuthUser, CurrentUser } from '../../../http/auth/current-user';
import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) { }

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  async purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }
}
