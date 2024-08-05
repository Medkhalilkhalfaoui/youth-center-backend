import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { HangarReceptionDetails } from "../entities";

@Injectable()
export class HangarReceptionDetailsRepository extends Repository<HangarReceptionDetails> {
  constructor(private dataSource: DataSource) {
    super(HangarReceptionDetails, dataSource.createEntityManager());
  }
}