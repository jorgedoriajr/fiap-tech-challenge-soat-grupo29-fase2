import { Model } from 'mongoose';
import { IGenericRepository } from '../../../abstracts/generic-repository.abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  getByFilter(filter: Record<string, any>): Promise<T[]> {
    return this._repository.find(filter, {}).populate(this._populateOnFind).exec()
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  createMany(item: T[]): any {
    return this._repository.insertMany(item);
  }
  
  deleteById(id: number): Promise<T> {
      return this._repository.findByIdAndDelete(id).exec();
  }

}