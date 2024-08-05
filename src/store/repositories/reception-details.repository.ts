import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ReceptionDetails } from "../entities";

@Injectable()
export class ReceptionDetailsRepository extends Repository<ReceptionDetails> {
  constructor(private dataSource: DataSource) {
    super(ReceptionDetails, dataSource.createEntityManager());
  }
}