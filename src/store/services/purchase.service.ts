import { Injectable } from '@nestjs/common';
import {
  HangarReceptionDetailsRepository,
  PurchaseDetailsRepository,
  PurchaseRepository,
} from '../repositories';
import {
  CreatePurchaseDto,
  CreateReceptionDto,
  UpdateStatusPurchaseDto,
} from '../types/dto';
import { IPurchaseDetails, IReceptionDetails } from '../types';
import { ReceptionRepository } from '../repositories/reception.repository';
import { ReceptionDetailsRepository } from '../repositories/reception-details.repository';
import { Status } from '../types/enums';
import { GetQueryDto } from '../types/dto/get-query.dto';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly purchaseDetailsRepository: PurchaseDetailsRepository,
    private readonly receptionRepository: ReceptionRepository,
    private readonly receptionDetailsRepository: ReceptionDetailsRepository,
    private readonly hangarReceptionDetailsRepository: HangarReceptionDetailsRepository,
  ) {}

  async createPurchase(createPurchaseDto: CreatePurchaseDto, userId: string) {
    const { provider_name, purchase_details } = createPurchaseDto;

    // Récupérer le dernier achat de la base de données par date de création
    const lastPurchase = await this.purchaseRepository.find({
      order: { createdAt: 'DESC' },
      take: 1, // Récupérer seulement le dernier achat
    });

    let nextNumber = 1;
    let formattedYear = new Date().getFullYear().toString();

    if (lastPurchase && lastPurchase.length > 0) {
      // Extraire le numéro de l'achat précédent
      const lastNumber = parseInt(lastPurchase[0].numero.split('-')[2]);
      // Extraire l'année de l'achat précédent
      const lastYear = lastPurchase[0].numero.split('-')[1];
      if (lastYear === formattedYear) {
        nextNumber = lastNumber + 1;
      }
    }

    // Formater le prochain numéro
    const formattedNumber = `AC-${formattedYear}-${nextNumber
      .toString()
      .padStart(4, '0')}`;

    // Créer l'achat
    const purchase = {
      numero: formattedNumber,
      user: userId,
      provider_name: provider_name,
    };

    const createdPurchase = await this.purchaseRepository.save(
      this.purchaseRepository.create(purchase),
    );

    for (const purchase_detail of purchase_details) {
      const { product, quantity } = purchase_detail;

      const Detail: Partial<IPurchaseDetails> = {
        quantity,
        product,
        purchase: createdPurchase.id,
      };
      const createdPurchaseDetail = await this.purchaseDetailsRepository.save(
        this.purchaseDetailsRepository.create(Detail),
      );
    }
    return createdPurchase;
  }

  async getPurchases(getQuery: GetQueryDto) {
    const { page, pageSize, keyword, orderKey, status } = getQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedPurchase, total] = await this.purchaseRepository.getPurchases(
      {
        take,
        skip,
        orderKey,
        keyword,
        status,
      },
    );
    let nextPage = 0;
    let hasNext = false;
    if (total > page * pageSize) {
      hasNext = true;
      nextPage = page + 1;
    }
    return {
      total,
      hasNext,
      nextPage,
      result: fetchedPurchase,
    };
  }

  async getReceptions() {
    return this.receptionRepository.getReceptions();
  }

  async getPurchaseById(id: string) {
    return this.purchaseRepository.getPurchaseById(id);
  }

  async getReceptionById(id: string) {
    return this.receptionRepository.getReceptionById(id);
  }

  async createReception(
    createReceptionDto: CreateReceptionDto,
    userId: string,
  ) {
    const { purchase, reception_details, driver, Truck_license_plate } =
      createReceptionDto;
    const existingPurchase = await this.purchaseRepository.getPurchaseById(
      purchase,
    );

    if (existingPurchase) {
      existingPurchase.status = Status.PARTIAL_RECEPTION;
      await this.purchaseRepository.save(existingPurchase);
    }

    // Créer la réception
    const lastReception = await this.receptionRepository.find({
      order: { createdAt: 'DESC' },
      take: 1, // Récupérer seulement le dernier achat
    });

    let nextNumber = 1;
    let formattedYear = new Date().getFullYear().toString();

    if (lastReception && lastReception.length > 0) {
      // Extraire le numéro de la réception précédente
      const lastNumber = parseInt(lastReception[0].numero.split('-')[2]);
      // Extraire l'année de la réception précédente
      const lastYear = lastReception[0].numero.split('-')[1];
      if (lastYear === formattedYear) {
        nextNumber = lastNumber + 1;
      }
    }

    // Formater le prochain numéro de réception
    const formattedNumber = `RC-${formattedYear}-${nextNumber
      .toString()
      .padStart(4, '0')}`;

    // Créer la réception
    const reception = {
      numero: formattedNumber,
      user: userId,
      purchase: purchase,
      // hangar: hangar,
      Truck_license_plate: Truck_license_plate,
      driver: driver,
    };

    const createdReception = await this.receptionRepository.save(reception);

    // Enregistrer les détails de la réception
    for (const reception_detail of reception_details) {
      const { product, quantity, youthCenter, hangarReceptionDetails } =
        reception_detail;

      const Detail: Partial<IReceptionDetails> = {
        quantity,
        product,
        reception: createdReception.id,
        youthCenter: youthCenter,
      };

      const savedDetail = await this.receptionDetailsRepository.save(
        this.receptionDetailsRepository.create(Detail),
      );

      const purchaseDetail =
        await this.purchaseDetailsRepository.getDetailsPurshaceByProductAndPurchase(
          purchase,
          product,
        );

      if (purchaseDetail) {
        // Mettre à jour la quantité en incrémentant la nouvelle quantité
        purchaseDetail.quantity_received += quantity;
        await this.purchaseDetailsRepository.save(purchaseDetail);
      }

      // Enregistrer les détails des hangars
      for (const hangarDetail of hangarReceptionDetails) {
        const { hangar: hangar, quantity: quantity } = hangarDetail;

        const savedDetail2 = await this.hangarReceptionDetailsRepository.save(
          this.hangarReceptionDetailsRepository.create({
            hangar: hangar,
            receptionDetails: savedDetail.id,
            quantity: quantity,
          }),
        );
      }
    }

    return createdReception;
  }

  async updateStatusPurchase(
    id: string,
    updateStatusPurchaseDto: UpdateStatusPurchaseDto,
  ) {
    return this.purchaseRepository.updateStatusPurchase(
      id,
      updateStatusPurchaseDto,
    );
  }
}
