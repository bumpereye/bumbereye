import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from './owners.shema';
import { Model } from 'mongoose';
import { CreateOwnerRequestDto } from './dto/create-owner-request.dto';

@Injectable()
export class OwnersService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}

  getById(ownerId: string): Promise<Owner> {
    return this.ownerModel.findOne({ id: ownerId }).exec();
  }

  create(payload: CreateOwnerRequestDto): Promise<Owner> {
    return this.ownerModel.create(payload);
  }

  update(ownerId: string, firstName: string, lastName: string): Promise<Owner> {
    return this.ownerModel
      .findOneAndUpdate({ id: ownerId }, { firstName, lastName }, { new: true })
      .exec();
  }

  deactivate(ownerId: string): Promise<Owner> {
    return this.ownerModel
      .findOneAndUpdate({ id: ownerId }, { active: false }, { new: true })
      .exec();
  }

  findOneByEmail(email: string): Promise<Owner> {
    return this.ownerModel.findOne({ email }).exec();
  }
}
